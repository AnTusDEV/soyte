
import React, { useState } from 'react';
import { 
  Search,  
  Share2, 
  Building2, 
  Clock, 
  Download,   
  FileDown
} from 'lucide-react';
import { Button } from '@/components/prime';

const mockResults = [
  {
    id: 1,
    title: "Dữ liệu danh sách các cơ sở sản xuất kinh doanh thực phẩm thuộc thẩm quyền của UBND Thành phố",
    description: "Danh sách tổng hợp các cơ sở sản xuất, kinh doanh thực phẩm được UBND Thành phố cấp phép và quản lý trực tiếp.",
    source: "Sở Y tế",
    date: "15/01/2026",
    downloads: 1250,
    fileName: "1. Du lieu danh sach cac co so san xuat kinh doanh thuc pham.xlsx"
  },
  {
    id: 2,
    title: "Các doanh nghiệp tự công bố sản phẩm ATTP",
    description: "Danh sách các doanh nghiệp thực hiện tự công bố sản phẩm an toàn thực phẩm theo quy định hiện hành.",
    source: "Sở Y tế",
    date: "14/01/2026",
    downloads: 842,
    fileName: "2. Cac DN tu cong bo san pham ATTP.xlsx"
  },
  {
    id: 3,
    title: "Dữ liệu các phòng kiểm nghiệm phục vụ quản lý nhà nước, các đơn vị kiểm tra nhà nước về thực phẩm nhập khẩu",
    description: "Thông tin chi tiết về các đơn vị, phòng kiểm nghiệm đủ điều kiện thực hiện kiểm tra nhà nước đối với thực phẩm nhập khẩu.",
    source: "Sở Y tế",
    date: "12/01/2026",
    downloads: 456,
    fileName: "3. Du lieu cac phong kiem nghiem phuc vu quan ly nha nuoc.docx"
  },
  {
    id: 4,
    title: "Danh sách cơ sở đủ điều kiện khám sức khỏe",
    description: "Danh sách các cơ sở y tế đủ điều kiện thực hiện khám sức khỏe trên địa bàn Thành phố Hà Nội.",
    source: "Sở Y tế",
    date: "10/01/2026",
    downloads: 2105,
    fileName: "4. DS cs du dieu kien KSK.xlsx"
  },
  {
    id: 5,
    title: "Danh sách an toàn sinh học",
    description: "Danh sách các cơ sở đạt tiêu chuẩn An toàn sinh học theo quy chuẩn y tế.",
    source: "Sở Y tế",
    date: "08/01/2026",
    downloads: 128,
    fileName: "5. DS ATSH.xlsx"
  },
  {
    id: 6,
    title: "Dữ liệu danh sách tiêm chủng",
    description: "Dữ liệu thống kê danh sách tiêm chủng mở rộng và tiêm chủng dịch vụ trên địa bàn Thành phố.",
    source: "Sở Y tế",
    date: "05/01/2026",
    downloads: 3420,
    fileName: "6. DL ds Tiem chung.xlsx"
  },
  {
    id: 7,
    title: "Danh sách quan trắc môi trường lao động trên địa bàn Thành phố",
    description: "Kết quả quan trắc và danh sách các đơn vị thực hiện quan trắc môi trường lao động định kỳ.",
    source: "Sở Y tế",
    date: "04/01/2026",
    downloads: 672,
    fileName: "7. Danh sach quan trac moi truong lao dong.docx"
  },
  {
    id: 8,
    title: "Danh sách cơ sở khẳng định HIV",
    description: "Danh sách các cơ sở y tế đủ thẩm quyền và trang thiết bị thực hiện xét nghiệm khẳng định HIV.",
    source: "Sở Y tế",
    date: "02/01/2026",
    downloads: 89,
    fileName: "8. DS cs xet nghiem khang dinh hiv.xlsx"
  },
  {
    id: 9,
    title: "Dữ liệu về người đủ điều kiện hành nghề y_quý IV.2025",
    description: "Danh sách nhân sự y tế đủ điều kiện hành nghề y được cập nhật trong quý IV năm 2025.",
    source: "Sở Y tế",
    date: "28/12/2025",
    downloads: 1560,
    fileName: "9. Du lieu ve nguoi du dieu kien hanh nghe y_quy IV.2025.xlsx"
  },
  {
    id: 10,
    title: "Dữ liệu người được cấp chứng chỉ hành nghề y học cổ truyền_quý IV.2025",
    description: "Danh sách các cá nhân được cấp chứng chỉ hành nghề trong lĩnh vực Y học cổ truyền.",
    source: "Sở Y tế",
    date: "25/12/2025",
    downloads: 432,
    fileName: "10. Du lieu nguoi duoc cap chung chi hanh nghe y hoc co truyen_quy IV.2025.xlsx"
  },
  {
    id: 11,
    title: "Dữ liệu phòng khám y học cổ truyền trên địa bàn thành phố_quý IV.2025",
    description: "Danh sách các phòng khám y học cổ truyền hoạt động hợp pháp trên địa bàn Thành phố Hà Nội.",
    source: "Sở Y tế",
    date: "20/12/2025",
    downloads: 780,
    fileName: "11. Du lieu phong kham y hoc co truyen tren dia ban thanh pho_quy IV.2025.xlsx"
  },
  {
    id: 12,
    title: "Danh sách chứng chỉ hành nghề dược",
    description: "Danh sách cập nhật các cá nhân có Chứng chỉ hành nghề Dược trên địa bàn Thành phố.",
    source: "Sở Y tế",
    date: "15/12/2025",
    downloads: 1240,
    fileName: "12. DS CCHN Duoc.xlsx"
  },
  {
    id: 13,
    title: "Danh sach cơ sở kinh doanh dược",
    description: "Danh sách các nhà thuốc, quầy thuốc và cơ sở kinh doanh dược phẩm đủ điều kiện hoạt động.",
    source: "Sở Y tế",
    date: "10/12/2025",
    downloads: 2890,
    fileName: "13. DS cs kinh doanh duoc.xlsx"
  },
  {
    id: 14,
    title: "Dữ liệu dân số",
    description: "Dữ liệu thống kê về dân số, tỷ lệ sinh và các chỉ số sức khỏe sinh sản trên địa bàn Hà Nội.",
    source: "Sở Y tế",
    date: "01/12/2025",
    downloads: 5400,
    fileName: "14. DL dan so.xlsx"
  }
];

const DataLookup = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleDownload = (fileName: string) => {
    // Trỏ trực tiếp vào thư mục assets/fileDL
    const fileUrl = `assets/fileDL/${fileName}`;
    console.log(`Đang tải file: ${fileUrl}`);
    
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredResults = mockResults.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f4f7fa] font-sans pb-12"> 
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">  
          {/* Main Content */}
          <main className="flex-grow">
            {/* Search Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 mb-4">
              <div className="flex items-center">
                <div className="flex-grow flex items-center px-4">
                  <Search size={18} className="text-blue-600 mr-3" />
                  <input 
                    type="text" 
                    placeholder="Tìm kiếm tên tài liệu hoặc nội dung..."
                    className="w-full py-2.5 outline-none text-[14px] text-gray-700 placeholder:text-gray-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Button label="Tìm kiếm" className="!bg-[#004a99] hover:!bg-[#003d80] !text-white px-8 py-2.5 rounded-lg font-bold text-sm" />
              </div>
            </div>

            {/* Result Stats */}
            <div className="mb-4 flex items-center gap-1.5 px-1">
              <p className="text-[13px] text-gray-500 font-medium">
                Hiển thị <span className="font-black text-gray-800">{filteredResults.length}</span> kết quả dữ liệu công khai
              </p>
            </div>

            {/* Results List */}
            <div className="space-y-4">
              {filteredResults.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col md:flex-row">
                  {/* Icon Column */}
                  <div className="w-full md:w-24 bg-[#eef6ff] flex flex-row md:flex-col items-center justify-center p-4 gap-4 md:gap-2 border-r border-gray-50">
                    <div className="w-10 h-10 rounded-lg bg-blue-500 text-white flex items-center justify-center shadow-sm">
                      <Share2 size={20} />
                    </div>
                    <span className="text-[11px] font-black text-gray-400">#{item.id}</span>
                  </div>

                  {/* Info Column */}
                  <div className="flex-grow p-5 md:p-6">
                    <h2 className="text-[15px] md:text-[16px] font-bold text-[#004a99] leading-snug mb-2 hover:underline cursor-pointer">
                      {item.title}
                    </h2>
                    
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-[11px] text-gray-400 font-bold uppercase tracking-tight mb-3">
                      <div className="flex items-center gap-1.5">
                        <Building2 size={14} className="text-blue-300" />
                        {item.source}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock size={14} className="text-emerald-300" />
                        {item.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Download size={14} className="text-orange-300" />
                        {item.downloads} lượt tải
                      </div>
                    </div>

                    <p className="text-[13px] text-gray-500 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Column - Download Button */}
                  <div className="p-4 md:p-6 flex items-center justify-center border-t md:border-t-0 md:border-l border-gray-50 bg-gray-50/30 shrink-0">
                     <Button 
                       onClick={() => handleDownload(item.fileName)}
                       label="Tải tài liệu"
                       icon={<FileDown size={18} />}
                       className="!bg-emerald-600 hover:!bg-emerald-700"
                     />
                  </div>
                </div>
              ))}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
};

export default DataLookup;
