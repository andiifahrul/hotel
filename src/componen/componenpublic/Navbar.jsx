import { useNavigate, useLocation } from 'react-router-dom';
import { Link as ScrollLink, scroller } from 'react-scroll';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Cek apakah kita sedang di halaman Home
  const isHome = location.pathname === '/';

  const handleNavClick = (e, targetId) => {
    if (!isHome) {
      e.preventDefault();
      navigate('/');
      setTimeout(() => {
        scroller.scrollTo(targetId, {
          smooth: true,
          offset: -70,
          duration: 500,
        });
      }, 100);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top" style={{ backgroundColor: 'var(--primary)' }}>
      <div className="container">
        
        {/* Brand: Mengarah ke Home */}
        <RouterLink to="/" className="navbar-brand fw-bold" style={{ color: 'var(--accent)', cursor: 'pointer' }}>
          Hotel Sang Surya
        </RouterLink>

        {/* --- INI BAGIAN YANG TADI HILANG --- */}
        {/* Mobile Wrapper: Muncul di layar kecil, hilang di layar besar */}
        <div className="d-flex align-items-center d-lg-none">
          <RouterLink to="/booking" className="btn btn-sm text-white border-0 me-2" style={{ backgroundColor: 'var(--accent)' }}>
            Book Now
          </RouterLink>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        {/* ------------------------------------ */}

        {/* Menu (Desktop & Mobile Collapse) */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            
            <li className="nav-item">
              <ScrollLink 
                to="hero" spy={isHome} smooth={true} offset={-70} duration={300} 
                activeClass={isHome ? "active" : ""} className="nav-link" style={{cursor: 'pointer'}}
                onClick={(e) => handleNavClick(e, 'hero')}
              >Home</ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink 
                to="kamar" spy={isHome} smooth={true} offset={-70} duration={300} 
                activeClass={isHome ? "active" : ""} className="nav-link" style={{cursor: 'pointer'}}
                onClick={(e) => handleNavClick(e, 'kamar')}
              >Kamar</ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink 
                to="fasilitas" spy={isHome} smooth={true} offset={-70} duration={300} 
                activeClass={isHome ? "active" : ""} className="nav-link" style={{cursor: 'pointer'}}
                onClick={(e) => handleNavClick(e, 'fasilitas')}
              >Fasilitas</ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink 
                to="lokasi" spy={isHome} smooth={true} offset={-70} duration={300} 
                activeClass={isHome ? "active" : ""} className="nav-link" style={{cursor: 'pointer'}}
                onClick={(e) => handleNavClick(e, 'lokasi')}
              >Lokasi</ScrollLink>
            </li>
            <li className="nav-item">
              <ScrollLink 
                to="kontak" spy={isHome} smooth={true} offset={-70} duration={300} 
                activeClass={isHome ? "active" : ""} className="nav-link" style={{cursor: 'pointer'}}
                onClick={(e) => handleNavClick(e, 'kontak')}
              >Kontak</ScrollLink>
            </li>
            
            {/* Tombol Book Now (Desktop) */}
            <li className="nav-item d-none d-lg-block">
              <RouterLink to="/booking" className="btn ms-lg-3" style={{ backgroundColor: 'var(--accent)', color: 'var(--white)' }}>
                Book Now
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;