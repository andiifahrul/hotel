import React from 'react';
import { Link } from 'react-router-dom';
import heroBg from '../../asset/hero.jpg';

const Hero = () => {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        // Menambahkan gambar sebagai background dengan efek gelap
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
        
        // Properti agar background responsif sempurna di semua ukuran layar
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        
        // Menambahkan attachment scroll agar aman dan tidak bug di beberapa browser HP
        backgroundAttachment: 'scroll', 
        
        // Tinggi minimum layar
        minHeight: '100vh', 
      }}
    >
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Headline */}
            <h1 className="display-3 fw-bold text-white mb-4" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Pengalaman Menginap yang{' '}
              <span style={{ color: '#C5A059' }}>Tak Terlupakan</span> di{' '}
              <span style={{ color: '#C5A059' }}>Wisma Sang Surya</span>
            </h1>

            <p className="lead text-white mb-5">
              Temukan kenyamanan eksklusif dan pelayanan ramah di jantung kota.
              Pilihan tepat untuk liburan maupun perjalanan bisnis Anda.
            </p>

            <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
              <Link to="/booking" className="btn btn-warning btn-lg px-4">
                Pesan Sekarang
              </Link>

              <a href="#kamar" className="btn btn-outline-light btn-lg px-4">
                Lihat Kamar
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; // Atau export default Hero; sesuaikan dengan eksport file Anda