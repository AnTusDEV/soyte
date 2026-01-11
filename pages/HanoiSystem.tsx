import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Phone, 
  Navigation, 
  Building2, 
  Stethoscope, 
  Activity, 
  Info,
  X 
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default Leaflet icon in React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Coordinate Center of Hanoi
const HANOI_CENTER: [number, number] = [21.0285, 105.8542];

// Custom DivIcons for Map Markers
const createCustomIcon = (type: string) => {
  let colorClass = 'bg-gray-500';
  if (type === 'BV') colorClass = 'bg-red-600';
  if (type === 'TTYT') colorClass = 'bg-blue-600';
  if (type === 'TYT') colorClass = 'bg-green-600';

  return L.divIcon({
    className: 'custom-map-marker',
    html: `<div class="${colorClass} w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
            <div class="w-2 h-2 bg-white rounded-full"></div>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

interface Facility {
  id: number;
  name: string;
  type: 'BV' | 'TTYT' | 'TYT';
  address: string;
  phone: string;
  image: string;
  coords: [number, number]; // Lat, Lng
  description: string;
}

const FACILITIES: Facility[] = [
  {
    id: 1,
    name: "Bệnh viện Đa khoa Xanh Pôn",
    type: "BV",
    address: "12 Chu Văn An, Quận Ba Đình, Hà Nội",
    phone: "024 3823 3075",
    image: "https://picsum.photos/400/250?random=1",
    coords: [21.0318, 105.8396],
    description: "Bệnh viện hạng I của Thành phố Hà Nội, chuyên khoa đầu ngành về Ngoại khoa, Nhi khoa, Gây mê hồi sức."
  },
  {
    id: 2,
    name: "Bệnh viện Thanh Nhàn",
    type: "BV",
    address: "42 Thanh Nhàn, Hai Bà Trưng, Hà Nội",
    phone: "024 3971 4363",
    image: "https://picsum.photos/400/250?random=2",
    coords: [21.0028, 105.8569],
    description: "Bệnh viện đa khoa hạng I, mũi nhọn về Nội khoa, Hồi sức cấp cứu và Ung bướu."
  },
  {
    id: 3,
    name: "Trung tâm Y tế Quận Hoàn Kiếm",
    type: "TTYT",
    address: "26 Lương Ngọc Quyến, Hàng Buồm, Hoàn Kiếm",
    phone: "024 3825 2445",
    image: "https://picsum.photos/400/250?random=3",
    coords: [21.0345, 105.8521],
    description: "Đơn vị y tế dự phòng và chăm sóc sức khỏe ban đầu cho người dân quận trung tâm."
  },
  {
    id: 4,
    name: "Bệnh viện Phụ Sản Hà Nội",
    type: "BV",
    address: "929 Đ. La Thành, Ngọc Khánh, Ba Đình",
    phone: "1900 6922",
    image: "https://picsum.photos/400/250?random=4",
    coords: [21.0268, 105.8099],
    description: "Bệnh viện chuyên khoa hạng I của thành phố trong lĩnh vực Sản Phụ Khoa và Kế hoạch hóa gia đình."
  },
  {
    id: 5,
    name: "Trạm Y tế Phường Hàng Bài",
    type: "TYT",
    address: "15 Vọng Đức, Hàng Bài, Hoàn Kiếm",
    phone: "024 3825 4321",
    image: "https://picsum.photos/400/250?random=5",
    coords: [21.0221, 105.8505],
    description: "Trạm y tế cơ sở thực hiện tiêm chủng mở rộng và sơ cấp cứu ban đầu."
  },
  {
    id: 6,
    name: "Bệnh viện Tim Hà Nội",
    type: "BV",
    address: "92 Trần Hưng Đạo, Cửa Nam, Hoàn Kiếm",
    phone: "024 3942 2430",
    image: "https://picsum.photos/400/250?random=6",
    coords: [21.0245, 105.8432],
    description: "Bệnh viện chuyên khoa đầu ngành Tim mạch của Thủ đô Hà Nội."
  },
  {
    id: 7,
    name: "Trung tâm Y tế Quận Đống Đa",
    type: "TTYT",
    address: "107 Tôn Đức Thắng, Hàng Bột, Đống Đa",
    phone: "024 3511 2345",
    image: "https://picsum.photos/400/250?random=7",
    coords: [21.0263, 105.8341],
    description: "Trung tâm y tế thực hiện chức năng y tế dự phòng, dân số và khám chữa bệnh."
  },
  {
    id: 8,
    name: "Trạm Y tế Phường Láng Hạ",
    type: "TYT",
    address: "Ngõ 5 Láng Hạ, Đống Đa, Hà Nội",
    phone: "024 3835 1234",
    image: "https://picsum.photos/400/250?random=8",
    coords: [21.0152, 105.8165],
    description: "Chăm sóc sức khỏe nhân dân trên địa bàn phường Láng Hạ."
  }
];

// Component to fly to location on click
const MapFlyTo = ({ coords }: { coords: [number, number] | null }) => {
  const map = useMap();
  if (coords) {
    map.flyTo(coords, 15, { duration: 2 });
  }
  return null;
};

const HanoiSystem = () => {
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [filterType, setFilterType] = useState<'ALL' | 'BV' | 'TTYT' | 'TYT'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter Logic
  const filteredFacilities = FACILITIES.filter(item => {
    const matchType = filterType === 'ALL' || item.type === filterType;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        item.address.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const getTypeColor = (type: string) => {
    switch(type) {
      case 'BV': return 'bg-red-600 text-white border-red-700';
      case 'TTYT': return 'bg-blue-600 text-white border-blue-700';
      case 'TYT': return 'bg-green-600 text-white border-green-700';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getTypeLabel = (type: string) => {
    switch(type) {
      case 'BV': return 'Bệnh viện';
      case 'TTYT': return 'Trung tâm Y tế';
      case 'TYT': return 'Trạm Y tế';
      default: return 'Cơ sở y tế';
    }
  };

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'BV': return <Building2 size={16} />;
      case 'TTYT': return <Activity size={16} />;
      case 'TYT': return <Stethoscope size={16} />;
      default: return <Info size={16} />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-50 overflow-hidden">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
        <div>
          <h1 className="text-2xl font-bold text-primary-900 uppercase flex items-center gap-2">
            <MapPin className="text-red-600" /> Bản đồ Hệ thống Y tế Hà Nội
          </h1>
          <p className="text-sm text-gray-500">Tra cứu thông tin mạng lưới khám chữa bệnh trên địa bàn thành phố</p>
        </div>
      </div>

      <div className="flex flex-grow overflow-hidden relative">
        
        {/* LEFT SIDEBAR: LIST & SEARCH */}
        <div className="w-full md:w-[400px] bg-white border-r border-gray-200 flex flex-col z-30 shadow-lg md:shadow-none absolute md:relative h-full transition-transform transform md:translate-x-0 -translate-x-full">
            
            {/* Search & Filter */}
            <div className="p-4 border-b border-gray-100 bg-gray-50 space-y-3">
                <div className="relative">
                    <Search className="absolute left-3 top-2.5 text-gray-400" size={18}/>
                    <input 
                        type="text" 
                        placeholder="Tìm bệnh viện, trạm y tế..."
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                    <button onClick={() => setFilterType('ALL')} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition ${filterType === 'ALL' ? 'bg-primary-900 text-white border-primary-900' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        Tất cả
                    </button>
                    <button onClick={() => setFilterType('BV')} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition ${filterType === 'BV' ? 'bg-red-600 text-white border-red-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        Bệnh viện
                    </button>
                    <button onClick={() => setFilterType('TTYT')} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition ${filterType === 'TTYT' ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        TT Y tế
                    </button>
                    <button onClick={() => setFilterType('TYT')} className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition ${filterType === 'TYT' ? 'bg-green-600 text-white border-green-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-100'}`}>
                        Trạm Y tế
                    </button>
                </div>
                <div className="text-xs text-gray-500 font-medium px-1">
                    Tìm thấy <span className="font-bold text-primary-700">{filteredFacilities.length}</span> cơ sở y tế
                </div>
            </div>

            {/* List */}
            <div className="flex-grow overflow-y-auto">
                {filteredFacilities.map(fac => (
                    <div 
                        key={fac.id}
                        onClick={() => setSelectedFacility(fac)}
                        className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-blue-50 transition flex gap-3 ${selectedFacility?.id === fac.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : 'border-l-4 border-l-transparent'}`}
                    >
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm ${getTypeColor(fac.type)}`}>
                             {getTypeIcon(fac.type)}
                         </div>
                         <div>
                             <h3 className="text-sm font-bold text-gray-800 leading-tight mb-1">{fac.name}</h3>
                             <p className="text-xs text-gray-500 line-clamp-1 mb-1">{fac.address}</p>
                             <span className={`inline-block text-[10px] px-2 py-0.5 rounded border ${fac.type === 'BV' ? 'text-red-600 border-red-200 bg-red-50' : fac.type === 'TTYT' ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-green-600 border-green-200 bg-green-50'}`}>
                                {getTypeLabel(fac.type)}
                             </span>
                         </div>
                    </div>
                ))}
            </div>
        </div>

        {/* RIGHT AREA: REAL MAP */}
        <div className="flex-grow relative bg-slate-200 overflow-hidden group h-full z-10">
            <MapContainer 
              center={HANOI_CENTER} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
              zoomControl={false} // We will add custom if needed or use default top-left
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              
              <MapFlyTo coords={selectedFacility?.coords || null} />

              {filteredFacilities.map(fac => (
                <Marker 
                  key={fac.id} 
                  position={fac.coords}
                  icon={createCustomIcon(fac.type)}
                  eventHandlers={{
                    click: () => setSelectedFacility(fac),
                  }}
                />
              ))}
            </MapContainer>

            {/* DETAIL POPUP CARD (Floating on Map) */}
            {selectedFacility && (
                <div className="absolute top-4 left-4 md:left-auto md:right-4 w-[90%] md:w-80 bg-white rounded-lg shadow-2xl overflow-hidden z-[1000] animate-in fade-in zoom-in-95 duration-200 border border-gray-200">
                    <div className="relative h-40">
                        <img src={selectedFacility.image} alt={selectedFacility.name} className="w-full h-full object-cover" />
                        <button 
                            onClick={() => setSelectedFacility(null)}
                            className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition"
                        >
                            <X size={16} />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                             <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${selectedFacility.type === 'BV' ? 'bg-red-600' : selectedFacility.type === 'TTYT' ? 'bg-blue-600' : 'bg-green-600'}`}>
                                {getTypeLabel(selectedFacility.type)}
                             </span>
                        </div>
                    </div>
                    <div className="p-4">
                        <h2 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{selectedFacility.name}</h2>
                        
                        <div className="space-y-3 text-sm text-gray-600">
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="mt-0.5 text-primary-600 flex-shrink-0" />
                                <span>{selectedFacility.address}</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <Phone size={16} className="text-primary-600 flex-shrink-0" />
                                <span className="font-bold text-gray-800">{selectedFacility.phone}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <Info size={16} className="mt-0.5 text-primary-600 flex-shrink-0" />
                                <p className="text-xs italic bg-gray-50 p-2 rounded border border-gray-100">{selectedFacility.description}</p>
                            </div>
                        </div>

                        <div className="mt-5 grid grid-cols-2 gap-3">
                            <button className="flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2 rounded font-bold text-sm transition shadow-md">
                                <Navigation size={16} /> Chỉ đường
                            </button>
                            <button className="flex items-center justify-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 rounded font-bold text-sm transition">
                                <Phone size={16} /> Gọi điện
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default HanoiSystem;