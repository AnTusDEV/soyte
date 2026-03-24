import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ChevronRight, FileText, Home, ArrowLeft, Download, Printer, ShieldCheck } from "lucide-react";
import { api } from "@/api";
import { Button } from "@/components/prime";

const TemplateQrView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForm = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/forms/${id}`);
        setForm(res.data);
      } catch (error) {
        console.error("Fetch form error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchForm();
  }, [id]);

  const publicUrl = `${window.location.origin}/forms/${id}`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(publicUrl)}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(qrUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `QR_Code_${form?.name || id}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Download error:", error);
      window.open(qrUrl, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="text-red-500 mb-4 font-bold text-xl">Không tìm thấy biểu mẫu</div>
        <Button label="Quay lại" icon={<ArrowLeft size={18} />} onClick={() => navigate(-1)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary-100 selection:text-primary-900 pb-20">
      <style>{`
        @media print {
          @page { size: landscape; margin: 0; }
          
          /* DEFINITIVE HIDING of EVERYTHING outside the QR content */
          body > *, #root > *, main > *, .no-print, aside, header, footer, nav, .hero-bg, .breadcrumb-container { 
            display: none !important; 
          }

          /* Force colors & backgrounds in all browsers - VITAL FOR BEAUTY */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          /* Reset layout to perfectly isolate the qr-content */
          html, body, #root, #root > div, .min-h-screen, main, .flex-grow.p-8, .flex-grow.p-8 > div { 
            background: white !important;
            height: 100vh !important;
            min-height: 100vh !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100vw !important;
            visibility: visible !important;
          }

          /* Ensure the target containers are VISIBLE and CENTERED */
          .qr-content, .qr-row {
            display: flex !important;
            visibility: visible !important;
          }

          /* Scale for aesthetics and centering */
          .qr-content { 
            transform: scale(0.9) !important;
            transform-origin: center center !important;
            background: white !important;
            width: 100% !important;
          }

          .qr-row { 
            flex-direction: row !important; 
            align-items: center !important; 
            justify-content: center !important;
            gap: 8rem !important; 
            padding: 3rem !important;
            background: white !important;
            border: none !important;
            box-shadow: none !important;
            width: 100% !important;
          }

          /* Card Proportions - FIX STRETCHING */
          .flex-1.w-full.max-w-lg {
            flex: 0 0 500px !important; 
            width: 500px !important;
            max-width: 500px !important;
          }

          /* Premium Typography for Print Card */
          h3 { 
            color: #0f172a !important; 
            font-weight: 950 !important; 
            font-size: 2.25rem !important; 
            line-height: 1.1 !important; 
            letter-spacing: -0.02em !important;
            margin-bottom: 2rem !important;
          }
          p { 
            color: #475569 !important; 
            line-height: 1.7 !important; 
            font-size: 1.2rem !important; 
            font-weight: 500 !important;
          }
          
          /* QR Code Image Scale */
          img { 
            max-height: 12cm !important; 
            width: auto !important; 
            filter: contrast(1.1) brightness(1) !important;
          }

          /* Label below QR */
          .qr-area p:first-child { 
             font-size: 14px !important; 
             letter-spacing: 0.3em !important;
             margin-top: 1.5rem !important;
          }
          
          /* Hide interactive/decorative bits */
          .group.block span, 
          .animate-in, 
          .print-hidden,
          [className*="blur"], 
          [className*="animate"] { 
            display: none !important; 
            animation: none !important; 
          }
        }
      `}</style>

      {/* Header (Simplified Public Header) */}
      <header className="bg-white border-b border-gray-100 shadow-sm no-print sticky top-0 z-50 backdrop-blur-md bg-white/90">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
           <Link to="/" className="flex items-center gap-4 group">
              <img src="https://storage-vnportal.vnpt.vn/gov-hni/6749/soyte.png" alt="Logo" className="h-12 w-auto drop-shadow-sm transition-transform group-hover:scale-105" />
              <div className="hidden sm:block border-l border-gray-100 pl-4">
                <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] leading-tight mb-0.5">Hệ thống công trực tuyến</p>
                <p className="text-sm font-black text-primary-900 uppercase tracking-tight">Sở Y tế Hà Nội</p>
              </div>
           </Link>
           <Button 
            label="QUAY LẠI QUẢN LÝ" 
            icon="pi pi-arrow-left" 
            className="p-button-text p-button-sm text-gray-500 font-black tracking-widest text-[10px] hover:text-primary-600 transition-colors" 
            onClick={() => navigate("/admin/templates")} 
           />
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-gray-100 no-print">
        <div className="container mx-auto px-6 py-2.5 flex items-center text-[10px] font-black text-gray-400 uppercase tracking-[0.15em]">
          <Link to="/" className="hover:text-primary-600 flex items-center gap-1.5 transition-colors">
            <Home size={11} /> TRANG CHỦ
          </Link>
          <ChevronRight size={11} className="mx-2 text-gray-300" />
          <Link to="/admin/templates" className="hover:text-primary-600 transition-colors">QUẢN LÝ BIỂU MẪU</Link>
          <ChevronRight size={11} className="mx-2 text-gray-300" />
          <span className="text-primary-700">MÃ QR ĐỊNH DANH</span>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-[#0066a2] text-white py-20 relative overflow-hidden hero-bg">
        <div className="absolute top-0 right-0 opacity-10 -translate-y-1/4 translate-x-1/4 rotate-12">
          <ShieldCheck size={600} />
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/5 to-transparent"></div>
        <div className="container mx-auto px-6 relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="bg-white/10 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 inline-block border border-white/20 shadow-xl">
              Cổng thông tin định danh
            </span>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
              {form.name}
            </h1>
            <p className="text-blue-50 text-base md:text-xl font-medium opacity-80 leading-relaxed max-w-2xl">
              Tải xuống hoặc in mã QR này để niêm yết tại các cơ sở giúp người dân dễ dàng truy cập và thực hiện đánh giá.
            </p>
          </div>
        </div>
      </div>

      {/* QR Content */}
      <div className="container mx-auto px-6 -mt-12 mb-20 qr-content">
        <div className="bg-white rounded-[3rem] shadow-[0_32px_64px_-16px_rgba(0,102,162,0.15)] border border-slate-100 p-8 md:p-16 flex flex-col lg:flex-row gap-16 items-center lg:items-center qr-row">
          
            {/* Form Card (Public Style) */}
            <div className="flex-1 w-full max-w-lg">
              <Link 
                to={`/forms/${id}`}
                className="group block relative transition-all duration-500 hover:scale-[1.03]"
                title="Nhấn để xem biểu mẫu chi tiết"
              >
                <div className="p-10 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-[2.5rem] border-t-[12px] border-primary-600 shadow-xl relative group-hover:shadow-2xl transition-all overflow-hidden h-full">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl group-hover:bg-primary-500/10 transition-colors print-hidden"></div>
                  <div className="flex flex-col items-start gap-8 relative z-10">
                    <div className="bg-white p-6 rounded-3xl shadow-md border border-slate-100 ring-[6px] ring-primary-50 group-hover:ring-primary-100 transition-all duration-500">
                      <FileText className="w-12 h-12 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800 tracking-tight leading-tight mb-4 group-hover:text-primary-700 transition-colors">
                        {form.name}
                      </h3>
                      <p className="text-base text-slate-500 font-medium leading-relaxed opacity-80">
                        {form.description || "Hệ thống tiếp nhận phản ánh và đánh giá chất lượng dịch vụ y tế chính thức."}
                      </p>
                    </div>
                    <div className="w-full pt-8 border-t border-slate-200/60 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <ShieldCheck className="text-primary-600" size={20} />
                         <span className="text-[11px] font-black text-primary-900 uppercase tracking-[0.1em]">Biểu mẫu chính quy</span>
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary-600 transition-colors">XEM CHI TIẾT →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

          {/* QR Area */}
          <div className="flex-1 flex flex-col items-center gap-10 qr-area">
             <div className="relative group">
                {/* QR Display Frame */}
                <div className="bg-white p-10 rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,102,162,0.2)] border-2 border-slate-50 relative overflow-hidden transition-transform duration-500 group-hover:scale-[1.02]">
                   <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-400 via-primary-600 to-primary-400"></div>
                   <div className="relative z-10 bg-white p-4 rounded-3xl shadow-inner ring-1 ring-slate-100">
                      <img src={qrUrl} alt="QR Code" className="w-72 h-72 md:w-96 md:h-96 object-contain" />
                   </div>
                   <div className="mt-8 text-center space-y-1">
                      <p className="text-[11px] font-black text-primary-900 uppercase tracking-[0.2em]">QUÉT MÃ ĐỂ ĐÁNH GIÁ</p>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sở Y tế Hà Nội • Cổng dịch vụ công</p>
                   </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-secondary-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 no-print"></div>
                <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-primary-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 no-print"></div>
             </div>

             <div className="flex flex-wrap justify-center gap-5 no-print">
                <Button 
                  label="TẢI XUỐNG" 
                  icon={<Download size={20} />} 
                  className="bg-[#0088cc] text-white border-none px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:translate-y-[-4px] transition-all shadow-xl shadow-blue-100 hover:shadow-2xl hover:bg-[#0077bb]"
                  onClick={handleDownload}
                />
                <Button 
                  label="IN MÃ QR" 
                  icon={<Printer size={20} />} 
                  className="bg-primary-900 text-white border-none px-8 py-4 rounded-2xl font-black text-xs tracking-widest hover:translate-y-[-4px] transition-all shadow-xl shadow-slate-200 hover:shadow-2xl hover:bg-black"
                  onClick={() => window.print()}
                />
             </div>

             <div className="bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100/60 max-w-full text-center no-print group">
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 opacity-60">Liên kết chính thức</p>
               <div className="flex items-center gap-3">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                 <span className="text-sm font-black text-primary-700 truncate">{publicUrl}</span>
               </div>
             </div>
          </div>
        </div>
      </div>

      <footer className="container mx-auto px-6 py-10 text-center no-print">
         <p className="text-[10px] text-slate-300 font-bold uppercase tracking-[0.3em]">
           Phát triển bởi đội ngũ kỹ thuật • © 2026 Sở Y tế Hà Nội
         </p>
      </footer>
    </div>
  );
};

export default TemplateQrView;
