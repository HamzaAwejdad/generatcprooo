import React, { useEffect, useRef } from 'react';

const AdBanner: React.FC = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = adRef.current;
    if (!container) return;

    // Create an iframe to safely execute the document.write script from the ad provider
    const iframe = document.createElement('iframe');
    iframe.style.width = '728px'; // Fixed width based on the ad config
    iframe.style.height = '90px'; // Fixed height based on the ad config
    iframe.style.border = '0';
    iframe.scrolling = 'no';
    iframe.title = "Advertisement";
    
    // Clear container to prevent duplicates
    container.innerHTML = '';
    container.appendChild(iframe);

    const doc = iframe.contentWindow?.document;
    if (doc) {
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>body { margin: 0; padding: 0; background: transparent; display: flex; justify-content: center; align-items: center; height: 90px; overflow: hidden; }</style>
        </head>
        <body>
          <script type="text/javascript">
            atOptions = {
              'key' : '4ad8359f50f6539bb71b6f4bb0502570',
              'format' : 'iframe',
              'height' : 90,
              'width' : 728,
              'params' : {}
            };
          </script>
          <script type="text/javascript" src="https://www.highperformanceformat.com/4ad8359f50f6539bb71b6f4bb0502570/invoke.js"></script>
        </body>
        </html>
      `);
      doc.close();
    }
  }, []);

  return (
    <div className="w-full mx-auto px-2 my-8">
      <div className="flex flex-col items-center">
        <span className="text-[10px] text-slate-600 font-mono uppercase tracking-widest mb-2 select-none">Sponsored</span>
        {/* Container with overflow handling for mobile devices since the ad is 728px wide */}
        <div className="w-full flex justify-center overflow-x-auto overflow-y-hidden bg-slate-900/30 rounded-xl border border-slate-800/30 backdrop-blur-sm py-4">
           <div ref={adRef} className="min-w-[728px] min-h-[90px] flex justify-center items-center"></div>
        </div>
      </div>
    </div>
  );
};

export default AdBanner;