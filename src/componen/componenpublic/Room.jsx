import React from 'react';

// 1. Tambahkan 'facilities' di parameter props
const RoomCard = ({ title, price, image, facilities, onOpen }) => {
  const cardStyle = {
    backgroundColor: 'var(--white)',
    borderRadius: '16px',
    border: '2px solid var(--border)',
    boxShadow: '0 10px 30px rgba(26, 43, 72, 0.08)',
    overflow: 'hidden',
    transition: 'transform 0.4s ease, box-shadow 0.4s ease',
    cursor: 'pointer'
  };

  return (
    <div className="col-md-4 mb-4">
      <div 
        className="card h-100" 
        style={cardStyle}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px)';
          e.currentTarget.style.boxShadow = '0 20px 40px rgba(26, 43, 72, 0.12)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(26, 43, 72, 0.08)';
        }}
      >
        <div style={{ overflow: 'hidden' }}>
          <img 
            src={image} 
            className="card-img-top" 
            alt={title} 
            style={{ 
              height: '240px', 
              objectFit: 'cover',
              transition: 'transform 0.4s ease'
            }} 
          />
        </div>
        
        <div className="card-body p-4 text-center">
          <h5 className="card-title fw-bold mb-2" style={{ color: 'var(--primary)', letterSpacing: '0.5px' }}>
            {title}
          </h5>
          
          <p className="card-text mb-4" style={{ color: 'var(--accent)', fontWeight: '500', fontSize: '1rem' }}>
            Mulai dari <span style={{ fontWeight: '700' }}>Rp {price}</span> /malam
          </p>

          <button 
            type="button"
            className="btn px-4 py-2" 
            // 2. TAMBAHKAN 'facilities' KE DALAM OBJECT DI BAWAH INI
            onClick={() => onOpen({ title, price, image, facilities })} 
            style={{ 
              backgroundColor: 'transparent',
              borderColor: 'var(--accent)', 
              color: 'var(--accent)',
              borderRadius: '50px',
              transition: 'all 0.3s ease',
              width: '100%'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = 'var(--accent)';
              e.target.style.color = 'var(--white)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'var(--accent)';
            }}
          >
            Lihat Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;