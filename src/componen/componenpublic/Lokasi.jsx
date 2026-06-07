import { MapPin, Phone, Mail, Navigation, Bus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Location = () => {
  return (
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>Lokasi Kami</h2>
        <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--accent)', margin: '15px auto' }}></div>
        <p className="text-muted">Temukan kami di jantung kota dengan akses mudah ke tempat-tempat ikonik.</p>
      </div>

      <div className="row g-4 align-items-center">
        {/* Info Box */}
        <div className="col-lg-5">
          <div className="p-4 shadow-sm border" style={{ borderRadius: '15px', backgroundColor: 'var(--white)' }}>
            <h5 className="fw-bold mb-4" style={{ color: 'var(--primary)' }}>Informasi Alamat</h5>
            
            <div className="d-flex mb-3">
              <MapPin className="me-3" style={{ color: 'var(--accent)' }} />
              <p className="mb-0">Jl. Pariwisata Indah No. 123, Pusat Kota, Indonesia</p>
            </div>
            
            <div className="d-flex mb-3">
              <Phone className="me-3" style={{ color: 'var(--accent)' }} />
              <p className="mb-0">+62 812 3456 7890</p>
            </div>

            <div className="d-flex mb-4">
              <Mail className="me-3" style={{ color: 'var(--accent)' }} />
              <p className="mb-0">hello@hotelsangsurya.com</p>
            </div>

            <hr />

            <h5 className="fw-bold mb-3" style={{ color: 'var(--primary)' }}>Jarak Terdekat</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Navigation size={16} className="me-2" style={{color: 'var(--accent)'}}/> 15 Menit dari Bandara Internasional</li>
              <li className="mb-2"><Bus size={16} className="me-2" style={{color: 'var(--accent)'}}/> 5 Menit ke Stasiun Kereta Kota</li>
              <li className="mb-2"><MapPin size={16} className="me-2" style={{color: 'var(--accent)'}}/> 10 Menit ke Pusat Perbelanjaan</li>
            </ul>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="col-lg-7">
          <div 
            className="shadow-sm border overflow-hidden" 
            style={{ 
              borderRadius: '15px', 
              height: '400px', 
              backgroundColor: '#e9ecef',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {/* Di sini Anda bisa menyematkan Google Maps Embed */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.81956!3d-6.17539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2f!5e0!3m2!1sen!2sid!4v1612345678901!5m2!1sen!2sid" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy"
              title="Hotel Location Map"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;