import React, { useEffect, useRef, useState } from "react";
import {
  Building2,
  Activity,
  HeartPulse,
  Building,
  Stethoscope,
  Home,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Search,
  LayoutDashboard,
} from "lucide-react";
import { Link } from "react-router-dom";

const HealthRecords = () => {
  const initialized = useRef(false);
  const [activeFacility, setActiveFacility] = useState<string | null>(null);

  const facilities = [
    {
      id: "xanh-pon",
      name: "Bệnh viện Đa khoa Xanh Pôn",
      icon: Building2,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      id: "tim-hn",
      name: "Bệnh viện Tim Hà Nội",
      icon: HeartPulse,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      id: "soc-son",
      name: "Bệnh viện Đa khoa Sóc Sơn",
      icon: Building,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "da-lieu",
      name: "Bệnh viện Da liễu Hà Nội",
      icon: Stethoscope,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      id: "hang-ma",
      name: "Trạm Y tế  Hàng Mã",
      icon: Home,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      id: "co-loa",
      name: "Trạm Y tế Xã Cổ Loa",
      icon: MapPin,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
  ];

  useEffect(() => {
    if (initialized.current) {
      return;
    }
    initialized.current = true;

    const loadScript = (src: string) => {
      return new Promise((resolve, reject) => {
        const existingScript = document.querySelector(`script[src="${src}"]`);
        if (existingScript) {
          resolve(true);
          return;
        }
        const script = document.createElement("script");
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    loadScript(
      "https://datahub.hanoi.gov.vn/js/visualcommon/publish-dashboard-drag.js"
    )
      .then(() => {
        const win = window as any;
        if (win.dashboard) {
          win.dashboard.setUnit("");
          win.dashboard.setUser("");
          win.dashboard.domReady(() => {
            win.dashboard.viewDashboard(
              "https://datahub.hanoi.gov.vn/databox/ttksbt/tinyroute/1EBC83D81249F5F1.cpx?secrd=zZlJb2VFjTYo0sQ8vu0Tmk2K87v92uRv5VtEQsbYeQHWoRD9KmJ3AiWiHLfkBh1m",
              "view-design"
            );
          });
        }
      })
      .catch((error) => {
        console.error("Failed to load dashboard script:", error);
      });

    return () => {
      const scriptElement = document.querySelector(
        'script[src="https://datahub.hanoi.gov.vn/js/visualcommon/publish-dashboard-drag.js"]'
      );
      if (scriptElement) {
        // We might want to keep it if multiple navigations happen, but cleanup is safer for POC
      }
      const viewDesign = document.getElementById("view-design");
      if (viewDesign) {
        viewDesign.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen font-sans pb-12">
      {/* Header Area */}
      <div className="bg-primary-900 text-white py-12 px-4 shadow-lg mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none -translate-y-1/4 translate-x-1/4">
          <Activity size={300} />
        </div>
        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-secondary-400" size={32} />
            <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tight">
              Hồ sơ Sức khỏe Toàn dân
            </h1>
          </div>
          <p className="text-primary-100 text-lg max-w-3xl leading-relaxed">
            Hệ thống tích hợp dữ liệu sức khỏe thông minh, cho phép người dân
            tra cứu lịch sử khám bệnh, kết quả xét nghiệm và quản lý các thông
            số sinh tồn từ tất cả các cơ sở y tế trên địa bàn Thủ đô.
          </p>
        </div>
      </div>

      <div className="w-full px-4">
        {/* Quick Access Grid - The 6 Requested Buttons */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="https://data.hanoi.gov.vn/datagov/ttksbt/publish/page/index.cpx#/app/5adada4a-76e8-4b48-f346-b8907f5281e1/layout?navId=69631c27c293d1c0d6bc47c1"
              className="inline-flex items-center gap-3 bg-white text-primary-800 font-bold text-lg px-6 py-3 rounded-lg shadow-md hover:shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1 border border-gray-200"
            >
              <LayoutDashboard className="text-primary-600" size={24} />
              <span>Dashboard điều hành Sở Y Tế → </span>
            </Link>
          </div>
        </div>

        {/* Dashboard Frame */}
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden min-h-[650px] flex flex-col"> 
          <div className="flex-grow relative bg-slate-100">
            <div
              id="view-design"
              className="w-full h-[600px]"
              style={{ height: "600px", width: "100%" }}
            >
              {/* Dashboard script loads here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthRecords;
