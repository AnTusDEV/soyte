import React, { useEffect, useRef } from "react";
const HealthRecords = () => {
  const initialized = useRef(false)
  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;
    // Function to load the script
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    // Load the dashboard script
    loadScript("https://datahub.hanoi.gov.vn/js/visualcommon/publish-dashboard-drag.js")
      .then(() => {
        // Once the script is loaded, execute dashboard commands
        if (window.dashboard) {
          window.dashboard.setUnit('');
          window.dashboard.setUser('');
          window.dashboard.domReady(() => {
            window.dashboard.viewDashboard('https://datahub.hanoi.gov.vn/databox/ttksbt/tinyroute/1EBC83D81249F5F1.cpx?secrd=zZlJb2VFjTYo0sQ8vu0Tmk2K87v92uRv5VtEQsbYeQHWoRD9KmJ3AiWiHLfkBh1m', 'view-design');
          });
        }
      })
      .catch((error) => {
        console.error("Failed to load dashboard script:", error);
      });

    // Cleanup function (optional, but good practice if script adds event listeners etc.)
    return () => {
      // Remove the script if the component unmounts
      const scriptElement = document.querySelector('script[src="https://datahub.hanoi.gov.vn/js/visualcommon/publish-dashboard-drag.js"]');
      if (scriptElement) {
        scriptElement.remove();
      }
      const viewDesign = document.getElementById('view-design');
      if(viewDesign) {
          viewDesign.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">  
      <div className="p-4 md:p-6 max-w-[1600px] mx-auto"> 
        <div id="view-design" className=" min-h-[600px]" style={{height: "500px",width: "100%"}}> 
        </div> 
      </div>
    </div>
  );
};

export default HealthRecords;
