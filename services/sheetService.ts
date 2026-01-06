import { SheetRow } from '../types';
import { GOOGLE_SHEET_CSV_URL } from '../constants';

/**
 * Parses a single CSV line handling quotes properly
 */
const parseCSVLine = (text: string): string[] => {
  const result: string[] = [];
  let cur = '';
  let inQuote = false;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    if (inQuote) {
      if (char === '"') {
        if (i + 1 < text.length && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuote = false;
        }
      } else {
        cur += char;
      }
    } else {
      if (char === '"') {
        inQuote = true;
      } else if (char === ',') {
        result.push(cur.trim());
        cur = '';
      } else {
        cur += char;
      }
    }
  }
  result.push(cur.trim());
  return result;
};

export const fetchActiveLinks = async (): Promise<SheetRow[]> => {
  try {
    const response = await fetch(GOOGLE_SHEET_CSV_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error('Failed to fetch data');
    
    const text = await response.text();
    
    // Safety check: sometimes Google returns HTML (login page) if permission is denied
    if (text.trim().startsWith('<')) {
      console.warn("Fetched data appears to be HTML. Check sheet permissions.");
      return [];
    }

    // Split by regex to handle \r\n (Windows/HTTP standard) and \n (Unix)
    const lines = text.split(/\r?\n/);
    
    if (lines.length < 2) {
      console.warn("CSV data is empty or missing headers");
      return [];
    }
    
    // 1. Parse Headers to find columns dynamically
    const headerRow = parseCSVLine(lines[0]);
    const headers = headerRow.map(h => h.toLowerCase().replace(/^"|"$/g, '').trim());
    
    console.log("[SheetService] Detected Headers:", headers);

    // 2. Identify Column Indices based on Keywords
    let urlIdx = -1;
    let titleIdx = -1;
    let typeIdx = -1;
    let statusIdx = -1;

    // Find URL Column (Priority: specific 'canva pro team link', then generic 'link'/'url')
    urlIdx = headers.findIndex(h => h === 'canva pro team link' || h === 'team link');
    if (urlIdx === -1) {
      urlIdx = headers.findIndex(h => h.includes('link') || h.includes('url') || h.includes('website'));
    }

    // Find Other Columns
    titleIdx = headers.findIndex(h => h.includes('title') || h.includes('name') || h.includes('label'));
    typeIdx = headers.findIndex(h => h.includes('type') || h.includes('category') || h.includes('plan'));
    statusIdx = headers.findIndex(h => h.includes('status') || h.includes('active') || h.includes('state'));

    // Fallbacks to default indices if headers are obscure or missing
    if (urlIdx === -1) urlIdx = 2; // Default to column C
    if (titleIdx === -1) titleIdx = 0; // Default to column A
    if (typeIdx === -1) typeIdx = 1; // Default to column B
    // statusIdx remains -1 if not found (we will assume Active)

    console.log(`[SheetService] Column Mapping - URL:${urlIdx} Title:${titleIdx} Type:${typeIdx} Status:${statusIdx}`);

    // 3. Parse Data Rows
    const dataRows = lines.slice(1);
    const validStatuses = ['active', 'true', 'yes', 'on', '1', 'enable', 'enabled'];

    const links: SheetRow[] = dataRows
      .map(line => {
        if (!line.trim()) return null;
        
        const columns = parseCSVLine(line);
        
        // Check if we have data at the URL index
        if (columns.length <= urlIdx) return null;
        
        // Extract URL
        let url = (columns[urlIdx] || '').replace(/^"|"$/g, '').trim();
        if (!url) return null;
        if (!url.startsWith('http')) {
          url = 'https://' + url;
        }

        // Extract Status (Default to 'active' if column not found or empty)
        let status = 'active';
        if (statusIdx !== -1 && columns[statusIdx]) {
           status = columns[statusIdx].replace(/^"|"$/g, '').trim().toLowerCase();
        }

        // Extract Title and Type
        let title = (titleIdx !== -1 && columns[titleIdx]) ? columns[titleIdx].replace(/^"|"$/g, '').trim() : 'Canva Team';
        if (!title) title = 'Canva Team';

        let type = (typeIdx !== -1 && columns[typeIdx]) ? columns[typeIdx].replace(/^"|"$/g, '').trim() : 'Pro';

        return {
          title, 
          type,
          url,
          status
        };
      })
      .filter((item): item is SheetRow => {
         if (!item) return false;
         // Check validity
         const hasUrl = item.url.includes('.') && item.url.length > 8;
         const isActive = validStatuses.includes(item.status);
         return hasUrl && isActive;
      });

    console.log(`[SheetService] Parsed ${lines.length} lines. Found ${links.length} active links.`);
    return links;
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    return [];
  }
};