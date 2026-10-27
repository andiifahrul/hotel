import { Link } from 'react-router-dom';
import { Wifi, Coffee, Utensils, Droplets, Car, Dumbbell } from 'lucide-react';

const Facilities = () => {
  const facilitiesList = [
    { icon: <Droplets />, title: "Kolam Renang", desc: "Nikmati kolam renang infinity dengan pemandangan kota." },
    { icon: <Utensils />, title: "Restoran Fine Dining", desc: "Menyajikan hidangan lokal dan internasional kelas atas." },
    { icon: <Wifi />, title: "Wi-Fi Berkecepatan Tinggi", desc: "Tetap terhubung dengan koneksi stabil di seluruh area hotel." },
    { icon: <Dumbbell />, title: "Pusat Kebugaran", desc: "Fasilitas gym modern untuk menjaga kebugaran Anda." },
    { icon: <Coffee />, title: "Lounge & Bar", desc: "Tempat bersantai dengan pilihan minuman terbaik." },
    { icon: <Car />, title: "Parkir Luas", desc: "Area parkir yang aman dan luas untuk tamu kami." },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg)', width: '100%' }}>
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>Fasilitas Hotel</h2>
        <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--accent)', margin: '15px auto' }}></div>
        <p className="text-muted">Kami menyediakan fasilitas terbaik untuk kenyamanan Anda.</p>
      </div>

      {/* Grid List */}
      <div className="row">
        {facilitiesList.map((item, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div 
              className="card h-100 p-4 text-center shadow-sm"
              style={{ 
                borderRadius: '15px',
                border: '2px solid var(--border)', // Border tipis untuk definisi
                backgroundColor: 'var(--white)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 15px 30px rgba(26, 43, 72, 0.15)'; // Shadow kebiruan
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)';
              }}
            >
              <div className="mb-3" style={{ color: 'var(--accent)', fontSize: '2.5rem' }}>
                {item.icon}
              </div>
              <h5 className="fw-bold" style={{ color: 'var(--primary)' }}>{item.title}</h5>
              <p className="text-muted small">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Facilities;