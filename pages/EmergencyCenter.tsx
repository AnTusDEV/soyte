import React, { useState, useEffect } from 'react';
import { 
  Ambulance, 
  MapPin, 
  Phone, 
  User, 
  Stethoscope, 
  AlertCircle, 
  Siren, 
  Activity, 
  X,
  Navigation,
  Clock,
  ShieldAlert,
  Radio,
  Building2,
  Layers,
  Search,
  Filter
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// --- Types ---
interface AmbulanceUnit {
  id: string;
  plateNumber: string;
  status: 'AVAILABLE' | 'BUSY' | 'RETURNING';
  coords: [number, number]; // Lat, Lng
  driver: string;
  phone: string;
  hospital: string;
  speed: number;
}

interface Facility {
  id: string;
  name: string;
  type: 'BV' | 'TTYT';
  coords: [number, number];
}

interface EmergencyRequest {
  id: string;
  callerName: string;
  phone: string;
  address: string;
  symptoms: string;
  coords: [number, number];
  time: string;
}

// Coordinate Center of Hanoi
const HANOI_CENTER: [number, number] = [21.0285, 105.8542];

// Custom Icons
const createAmbulanceIcon = (status: string, rotation: number) => {
  let colorClass = 'bg-blue-600';
  if (status === 'BUSY') colorClass = 'bg-red-600 animate-pulse';
  if (status === 'RETURNING') colorClass = 'bg-yellow-500';

  return L.divIcon({
    className: 'amb-marker',
    html: `<div class="${colorClass} w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white" style="transform: rotate(${rotation}deg)">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m19 19-7-7 7-7"/><path d="M16 12H2"/></svg>
           </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

const hospitalIcon = L.divIcon({
  className: 'hospital-marker',
  html: `<div class="bg-white w-8 h-8 rounded-full border-2 border-red-500 shadow-md flex items-center justify-center text-red-600 font-bold">
           H
         </div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const sosIcon = L.divIcon({
  className: 'sos-marker',
  html: `<div class="relative w-12 h-12 flex items-center justify-center">
            <div class="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-75"></div>
            <div class="relative bg-red-600 w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-white shadow-xl">
               SOS
            </div>
         </div>`,
  iconSize: [48, 48],
  iconAnchor: [24, 24],
});


// --- Mock Data ---

const HOSPITALS: Facility[] = [
  { id: 'H1', name: 'BV Bạch Mai', type: 'BV', coords: [21.0031, 105.8402] },
  { id: 'H2', name: 'BV Việt Đức', type: 'BV', coords: [21.0315, 105.8465] },
  { id: 'H3', name: 'BV Xanh Pôn', type: 'BV', coords: [21.0318, 105.8396] },
  { id: 'H4', name: 'BV TW Quân Đội 108', type: 'BV', coords: [21.0189, 105.8617] },
  { id: 'H5', name: 'BV Nhi Trung Ương', type: 'BV', coords: [21.0275, 105.8112] },
  { id: 'H6', name: 'BV Thanh Nhàn', type: 'BV', coords: [21.0028, 105.8569] },
  { id: 'H7', name: 'BV Phụ Sản Hà Nội', type: 'BV', coords: [21.0268, 105.8099] },
];

// Generate 20 Random Ambulances around Hanoi
const generateAmbulances = (): AmbulanceUnit[] => {
  const units: AmbulanceUnit[] = [];
  for (let i = 1; i <= 20; i++) {
    const isBusy = Math.random() > 0.7;
    const isReturning = !isBusy && Math.random() > 0.8;
    const status = isBusy ? 'BUSY' : isReturning ? 'RETURNING' : 'AVAILABLE';
    
    // Random position around Hanoi
    const lat = HANOI_CENTER[0] + (Math.random() - 0.5) * 0.1;
    const lng = HANOI_CENTER[1] + (Math.random() - 0.5) * 0.1;

    units.push({
      id: `AMB-${i < 10 ? '0' + i : i}`,
      plateNumber: `29A-${11500 + i}`,
      status: status,
      coords: [lat, lng],
      driver: `Tài xế Nguyễn Văn ${String.fromCharCode(65 + i)}`,
      phone: `098.${Math.floor(100 + Math.random() * 900)}.xxx`,
      hospital: HOSPITALS[Math.floor(Math.random() * HOSPITALS.length)].name,
      speed: status === 'AVAILABLE' ? 0 : Math.floor(30 + Math.random() * 40)
    });
  }
  return units;
};

const INITIAL_AMBULANCES = generateAmbulances();

const EMERGENCY_CALL: EmergencyRequest = {
  id: 'SOS-2024-001',
  callerName: 'Trần Thị Mai (SOS)',
  phone: '0912.345.xxx',
  address: '18 Lý Thường Kiệt, Hoàn Kiếm',
  symptoms: 'Tai nạn giao thông, chấn thương vùng đầu',
  coords: [21.0265, 105.8525], // Ly Thuong Kiet area
  time: 'Vừa xong'
};

const EmergencyCenter = () => {
  const [ambulances, setAmbulances] = useState<AmbulanceUnit[]>(INITIAL_AMBULANCES);
  const [selectedUnit, setSelectedUnit] = useState<AmbulanceUnit | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<EmergencyRequest | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Layer Toggles
  const [showAmbulances, setShowAmbulances] = useState(true);
  const [showHospitals, setShowHospitals] = useState(true);

  // Simulation: Move busy ambulances slightly (Real Movement)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setAmbulances(prev => prev.map(amb => {
        if (amb.status !== 'AVAILABLE') {
          // Move randomly a tiny bit
          return {
            ...amb,
            coords: [
              amb.coords[0] + (Math.random() - 0.5) * 0.001,
              amb.coords[1] + (Math.random() - 0.5) * 0.001
            ]
          };
        }
        return amb;
      }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] bg-gray-100 font-sans overflow-hidden">
      
      {/* 1. Dashboard Header (Light Theme) */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 flex justify-between items-center shadow-sm z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center shadow-red-200 shadow-lg">
            <Siren size={24} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold uppercase text-gray-800">Trung tâm Điều hành Cấp cứu 115</h1>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block animate-pulse"></span>
              TRỰC TUYẾN • {currentTime.toLocaleTimeString('vi-VN')}
            </p>
          </div>
        </div>
        
        {/* Quick Filters / Stats */}
        <div className="flex items-center gap-4">
           <div className="bg-gray-50 px-4 py-2 rounded-lg border border-gray-200 flex gap-4 text-sm">
              <div className="flex items-center gap-2">
                 <span className="w-3 h-3 bg-blue-600 rounded-full"></span>
                 <span className="font-bold text-gray-700">{ambulances.filter(a => a.status === 'AVAILABLE').length}</span> Rảnh
              </div>
              <div className="flex items-center gap-2">
                 <span className="w-3 h-3 bg-red-600 rounded-full"></span>
                 <span className="font-bold text-gray-700">{ambulances.filter(a => a.status === 'BUSY').length}</span> Bận
              </div>
           </div>
           <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-bold shadow-lg flex items-center gap-2">
              <Phone size={18} /> Tổng đài 115
           </button>
        </div>
      </div>

      <div className="flex-grow flex relative overflow-hidden">
        
        {/* 2. Map Area */}
        <div className="relative w-full h-full bg-[#e5e7eb] z-10">
           
           <MapContainer 
              center={HANOI_CENTER} 
              zoom={13} 
              style={{ height: '100%', width: '100%' }}
           >
              <TileLayer
                attribution='&copy; OpenStreetMap contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {/* HOSPITALS */}
              {showHospitals && HOSPITALS.map(hospital => (
                <Marker 
                  key={hospital.id} 
                  position={hospital.coords}
                  icon={hospitalIcon}
                  eventHandlers={{
                    click: () => { setSelectedFacility(hospital); setSelectedUnit(null); setSelectedRequest(null); }
                  }}
                />
              ))}

              {/* AMBULANCES */}
              {showAmbulances && ambulances.map(amb => (
                 <Marker 
                    key={amb.id} 
                    position={amb.coords}
                    icon={createAmbulanceIcon(amb.status, Math.random() * 360)}
                    eventHandlers={{
                        click: () => { setSelectedUnit(amb); setSelectedFacility(null); setSelectedRequest(null); }
                    }}
                 />
              ))}

              {/* SOS */}
              <Marker 
                 position={EMERGENCY_CALL.coords}
                 icon={sosIcon}
                 eventHandlers={{
                     click: () => { setSelectedRequest(EMERGENCY_CALL); setSelectedUnit(null); setSelectedFacility(null); }
                 }}
              />

           </MapContainer>
            
            {/* Map Controls Overlay */}
            <div className="absolute top-4 left-14 z-[1000] flex flex-col gap-2 pointer-events-none">
               {/* Layer Control */}
               <div className="bg-white p-2 rounded shadow-md border border-gray-300 w-40 pointer-events-auto">
                  <h4 className="text-xs font-bold text-gray-500 uppercase mb-2 flex items-center gap-1"><Layers size={12}/> Lớp bản đồ</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                       <input type="checkbox" checked={showAmbulances} onChange={(e) => setShowAmbulances(e.target.checked)} className="rounded text-blue-600"/>
                       <span className="flex items-center gap-1"><Ambulance size={14} className="text-blue-600"/> Xe cấp cứu</span>
                    </label>
                    <label className="flex items-center gap-2 text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                       <input type="checkbox" checked={showHospitals} onChange={(e) => setShowHospitals(e.target.checked)} className="rounded text-red-600"/>
                       <span className="flex items-center gap-1"><Building2 size={14} className="text-red-600"/> Bệnh viện</span>
                    </label>
                  </div>
               </div>
            </div>

            {/* --- INFO PANELS --- */}

            {/* FACILITY DETAIL PANEL */}
            {selectedFacility && (
               <div className="absolute bottom-0 left-0 right-0 md:bottom-6 md:left-auto md:right-6 md:w-80 bg-white rounded-t-xl md:rounded-xl shadow-2xl p-4 animate-in slide-in-from-bottom-10 z-[1001] border border-gray-200">
                  <div className="flex justify-between items-start mb-3">
                     <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-red-600">
                           <Building2 size={24} />
                        </div>
                        <div>
                           <h3 className="font-bold text-gray-900">{selectedFacility.name}</h3>
                           <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded">{selectedFacility.type === 'BV' ? 'Bệnh viện' : 'Trung tâm Y tế'}</span>
                        </div>
                     </div>
                     <button onClick={() => setSelectedFacility(null)} className="text-gray-400 hover:text-gray-600"><X size={20}/></button>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                     <p className="flex items-center gap-2"><MapPin size={16}/> Tọa độ: {selectedFacility.coords[0].toFixed(4)}, {selectedFacility.coords[1].toFixed(4)}</p>
                     <p className="flex items-center gap-2"><Activity size={16}/> Trạng thái: Đang hoạt động</p>
                  </div>
                  <button className="w-full mt-4 bg-white border border-gray-300 text-gray-700 font-bold py-2 rounded hover:bg-gray-50 transition">
                     Xem chi tiết
                  </button>
               </div>
            )}

            {/* AMBULANCE DETAIL PANEL */}
            {selectedUnit && (
               <div className="absolute top-4 right-4 w-80 bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 z-[1001] border border-gray-200">
                  <div className="bg-primary-600 p-3 text-white flex justify-between items-center">
                     <h3 className="font-bold">{selectedUnit.plateNumber}</h3>
                     <button onClick={() => setSelectedUnit(null)}><X size={18}/></button>
                  </div>
                  <div className="p-4">
                     <div className="flex justify-between items-center mb-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${selectedUnit.status === 'AVAILABLE' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                           {selectedUnit.status === 'AVAILABLE' ? 'SẴN SÀNG' : 'ĐANG BẬN'}
                        </span>
                        {selectedUnit.speed > 0 && <span className="text-gray-500 text-sm font-mono">{selectedUnit.speed} km/h</span>}
                     </div>
                     
                     <div className="space-y-3 text-sm text-gray-700">
                        <div className="flex items-center gap-3">
                           <User size={16} className="text-gray-400"/>
                           <span>{selectedUnit.driver}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <Phone size={16} className="text-gray-400"/>
                           <span>{selectedUnit.phone}</span>
                        </div>
                        <div className="flex items-center gap-3">
                           <MapPin size={16} className="text-gray-400"/>
                           <span className="truncate">{selectedUnit.hospital}</span>
                        </div>
                     </div>

                     <div className="mt-4 grid grid-cols-2 gap-2">
                        <button className="bg-blue-600 text-white py-2 rounded font-bold text-xs hover:bg-blue-700">GỌI LÁI XE</button>
                        <button className="border border-gray-300 text-gray-700 py-2 rounded font-bold text-xs hover:bg-gray-50">LỘ TRÌNH</button>
                     </div>
                  </div>
               </div>
            )}

            {/* SOS REQUEST PANEL */}
            {selectedRequest && (
               <div className="absolute bottom-6 left-6 w-96 bg-red-50 border-2 border-red-500 rounded-xl shadow-2xl p-4 animate-in slide-in-from-left-10 z-[1001]">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-red-700 font-bold flex items-center gap-2"><AlertCircle size={20}/> YÊU CẦU CẤP CỨU</h3>
                     <button onClick={() => setSelectedRequest(null)} className="text-red-400 hover:text-red-700"><X size={20}/></button>
                  </div>
                  <div className="bg-white p-3 rounded border border-red-100 mb-3">
                     <p className="font-bold text-lg text-gray-800">{selectedRequest.callerName}</p>
                     <p className="text-red-600 font-bold text-xl">{selectedRequest.phone}</p>
                  </div>
                  <div className="space-y-2 mb-4">
                     <p className="text-sm text-gray-700"><strong>Địa chỉ:</strong> {selectedRequest.address}</p>
                     <p className="text-sm text-gray-700"><strong>Tình trạng:</strong> {selectedRequest.symptoms}</p>
                  </div>
                  <button className="w-full bg-red-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-red-700 shadow-lg animate-pulse">
                     ĐIỀU XE NGAY
                  </button>
               </div>
            )}

        </div>
      </div>
    </div>
  );
};

export default EmergencyCenter;