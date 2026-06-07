import { Link } from 'react-router-dom'; // Hanya pakai Link

const Hero = () => {
  return (
    <section className="hero-section d-flex align-items-center">
      <div className="container text-center">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Headline */}
            <h1 className="display-3 fw-bold text-white mb-4">
              Pengalaman Menginap yang <span style={{ color: '#C5A059' }}>Tak Terlupakan</span>
            </h1>
            
            <p className="lead text-white mb-5">
              Temukan kenyamanan eksklusif di pusat kota dengan pemandangan menakjubkan.
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