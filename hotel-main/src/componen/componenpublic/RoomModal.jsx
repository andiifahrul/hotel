import React from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import hook ini

const RoomModal = ({ show, onClose, roomData }) => {
  const navigate = useNavigate(); // 2. Inisialisasi hook

  if (!show) return null;

  // 3. Fungsi untuk menangani navigasi
  const handleBooking = () => {
    // Kita pindah ke /booking dan membawa 'roomData' sebagai state
    navigate('/booking', { state: { selectedRoom: roomData } });
  };

  const styles = {
    overlay: {
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(26, 43, 72, 0.7)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 1050,
    },
    modal: {
      backgroundColor: 'var(--bg)',
      borderRadius: '20px',
      width: '90%', maxWidth: '500px',
      padding: '30px',
      position: 'relative',
      color: 'var(--text)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    closeBtn: {
      position: 'absolute', top: '15px', right: '15px',
      background: 'none', border: 'none',
      fontSize: '1.5rem', color: 'var(--primary)', cursor: 'pointer'
    }
  };

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}>&times;</button>
        
        <h2 style={{ color: 'var(--primary)' }}>{roomData.title}</h2>
        <hr style={{ borderColor: 'var(--accent)' }} />
        
        <img 
          src={roomData.image} 
          alt={roomData.title} 
          style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} 
        />
        
        <p style={{ fontSize: '1.1rem' }}>
          <strong>Harga:</strong> <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>Rp {roomData.price}</span> /malam
        </p>
        
        {roomData.facilities && roomData.facilities.length > 0 && (
          <div style={{ marginBottom: '15px' }}>
            <h5 style={{ color: 'var(--primary)', marginBottom: '10px' }}>Fasilitas Kamar:</h5>
            <ul style={{ paddingLeft: '20px' }}>
              {roomData.facilities.map((item, index) => (
                <li key={index} style={{ marginBottom: '5px' }}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <p style={{ marginTop: '10px' }}>
          Deskripsi kamar ini sangat nyaman dan dilengkapi dengan fasilitas premium untuk pengalaman menginap yang tak terlupakan.
        </p>
        
        {/* 4. Gunakan handleBooking di sini */}
        <button 
          className="btn w-100 mt-3"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--white)', borderRadius: '50px' }}
          onClick={handleBooking} 
        >
          Booking Sekarang
        </button>
      </div>
    </div>
  );
};

export default RoomModal;