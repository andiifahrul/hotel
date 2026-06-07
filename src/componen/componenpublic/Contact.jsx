import { Phone, Mail, MapPin, MessageSquare, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
     <div style={{ backgroundColor: 'var(--bg)', width: '100%' }}>
    <div className="container py-5">
      {/* Header */}
      <div className="text-center mb-5">
        <h2 className="fw-bold" style={{ color: 'var(--primary)' }}>Hubungi Kami</h2>
        <div style={{ width: '60px', height: '3px', backgroundColor: 'var(--accent)', margin: '15px auto' }}></div>
        <p className="text-muted">Punya pertanyaan? Tim kami siap membantu Anda 24/7.</p>
      </div>

      <div className="row g-4">
        {/* Kolom Informasi Kontak */}
        <div className="col-lg-4">
          <div className="p-4 h-100 shadow-sm border" style={{ borderRadius: '15px', backgroundColor: 'var(--white)' }}>
            <h5 className="fw-bold mb-4" style={{ color: 'var(--primary)' }}>Informasi Kontak</h5>
            
            <div className="d-flex align-items-start mb-4">
              <Phone className="me-3 mt-1" style={{ color: 'var(--accent)' }} />
              <div>
                <p className="fw-bold mb-0">Telepon / WhatsApp</p>
                <span className="text-muted">+62 812 3456 7890</span>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <Mail className="me-3 mt-1" style={{ color: 'var(--accent)' }} />
              <div>
                <p className="fw-bold mb-0">Email</p>
                <span className="text-muted">hello@hotelsangsurya.com</span>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <MapPin className="me-3 mt-1" style={{ color: 'var(--accent)' }} />
              <div>
                <p className="fw-bold mb-0">Alamat</p>
                <span className="text-muted">Jl. Pariwisata Indah No. 123, Pusat Kota, Indonesia</span>
              </div>
            </div>
          </div>
        </div>

        {/* Kolom Form Pesan */}
        <div className="col-lg-8">
          <div className="p-4 h-100 shadow-sm border" style={{ borderRadius: '15px', backgroundColor: 'var(--white)' }}>
            <h5 className="fw-bold mb-4" style={{ color: 'var(--primary)' }}>Kirim Pesan</h5>
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <input type="text" className="form-control" placeholder="Nama Lengkap" style={{ padding: '12px' }} />
                </div>
                <div className="col-md-6 mb-3">
                  <input type="email" className="form-control" placeholder="Alamat Email" style={{ padding: '12px' }} />
                </div>
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" placeholder="Subjek" style={{ padding: '12px' }} />
              </div>
              <div className="mb-4">
                <textarea className="form-control" rows="5" placeholder="Pesan Anda" style={{ padding: '12px' }}></textarea>
              </div>
              <button 
                className="btn text-white w-100 py-3 fw-bold" 
                style={{ backgroundColor: 'var(--primary)', transition: '0.3s' }}
                onMouseOver={(e) => e.target.style.backgroundColor = 'var(--accent)'}
                onMouseOut={(e) => e.target.style.backgroundColor = 'var(--primary)'}
              >
                <Send size={18} className="me-2" /> Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Contact;