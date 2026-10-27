import { Link } from 'react-router-dom';
import heroBg from '../../asset/hero.jpg';

const Hero = () => {
  return (
    <section
      className="hero-section d-flex align-items-center"
      style={{
        // Menambahkan gambar sebagai background
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg})`,
        // Properti background untuk memastikan gambar tertutup sempurna
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        // Menyesuaikan tinggi section agar mencakup seluruh viewport, atau sesuai kebutuhan
        minHeight: '100vh', 
      }}
    >
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Headline - Warna teks mungkin perlu disesuaikan agar kontras dengan background */}
            <h1 className="display-3 fw-bold text-white mb-4">
              Pengalaman Menginap yang{' '}
              <span style={{ color: '#C5A059' }}>Tak Terlupakan</span> di{' '}
              <span style={{ color: '#C5A059' }}>Wisma Sang Surya</span>
            </h1>

            <p className="lead text-white mb-5">
              Temukan kenyamanan eksklusif dan pelayanan ramah di jantung kota.
              Pilihan tepat untuk liburan maupun perjalanan bisnis Anda.
            </p>

            <div className="d-flex justify-content-center gap-3">
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

export default Hero;