import React from 'react';
import { BedDouble } from 'lucide-react';

const AdminRoomMonitor = ({ bookings }) => {
  // Definisi Kelas Kamar dan Jumlahnya
  const roomClasses = [
    { title: "Deluxe Room", prefix: "DLX" },
    { title: "Suite Room", prefix: "SUT" },
    { title: "Family Room", prefix: "FML" }
  ];
  const totalRoomsPerClass = 15;


  return (
    <div>
      <h2 className="mb-2" style={{ color: 'var(--primary)' }}>Pantau Ketersediaan Kamar</h2>
      <p className="text-muted mb-4">
        Kamar berwarna merah menandakan sedang diisi oleh tamu yang telah Anda pilihkan kamarnya di menu Orderan Kostumer.
      </p>

      {roomClasses.map((roomClass, classIndex) => {
        // Hitung berapa kamar yang sudah terisi di kelas ini berdasarkan room_number
        const occupiedCount = bookings.filter(b => b.status === 'confirmed' && b.room_title === roomClass.title && b.room_number).length;

        return (
          <div key={classIndex} className="card shadow-sm border-0 p-4 mb-4" style={{ borderRadius: '15px' }}>
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 style={{ color: 'var(--primary)', margin: 0 }}>{roomClass.title}</h4>
              <span className="badge p-2 bg-light text-dark border" style={{ fontSize: '0.9rem' }}>
                Terisi: <span className="text-danger fw-bold">{occupiedCount}</span> / {totalRoomsPerClass} Kamar
              </span>
            </div>
            
            {/* Grid 15 Kamar */}
            <div className="d-flex flex-wrap gap-3">
              {Array.from({ length: totalRoomsPerClass }).map((_, roomIndex) => {
                const roomNumber = `${roomClass.prefix}-${(roomIndex + 1).toString().padStart(2, '0')}`;
                // Cek apakah ada tamu dengan status confirmed yang menempati nomor kamar ini
                const occupant = bookings.find(b => b.status === 'confirmed' && b.room_number === roomNumber);
                const isOccupied = !!occupant;

                return (
                  <div 
                    key={roomIndex}
                    className="p-3 text-center rounded shadow-sm d-flex flex-column align-items-center justify-content-center"
                    style={{ 
                      width: '100px', height: '100px',
                      backgroundColor: isOccupied ? '#f8d7da' : '#d1e7dd',
                      border: `1px solid ${isOccupied ? '#f5c2c7' : '#badbcc'}`,
                      color: isOccupied ? '#842029' : '#0f5132',
                      transition: 'transform 0.2s ease',
                      cursor: 'default'
                    }}
                    title={isOccupied ? `Terisi oleh: ${occupant.nama}` : 'Kamar Kosong'}
                  >
                    <BedDouble size={28} className="mb-2" />
                    <small className="fw-bold">{roomNumber}</small>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminRoomMonitor;