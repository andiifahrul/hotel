import React from 'react';

const AdminDashboard = ({ bookings }) => {
  // Data Kalkulasi untuk Dashboard
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed');
  
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (Number(b.total_price) || 0), 0);
  const pendingOrders = bookings.filter(b => !b.status || b.status === 'pending').length;

  return (
    <div>
      <h2 className="mb-4" style={{ color: 'var(--primary)' }}>Dashboard Utama</h2>
      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: '15px', backgroundColor: 'var(--white)' }}>
            <h6 className="text-muted fw-bold mb-3">Total Orderan</h6>
            <h2 style={{ color: 'var(--primary)' }}>{confirmedBookings.length}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: '15px', backgroundColor: 'var(--white)' }}>
            <h6 className="text-muted fw-bold mb-3">Pendapatan (Terkonfirmasi)</h6>
            <h2 style={{ color: 'var(--accent)' }}>Rp {totalRevenue.toLocaleString('id-ID')}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card shadow-sm border-0 p-4 h-100" style={{ borderRadius: '15px', backgroundColor: 'var(--white)' }}>
            <h6 className="text-muted fw-bold mb-3">Menunggu Konfirmasi</h6>
            <h2 className="text-warning">{pendingOrders}</h2>
          </div>
        </div>
      </div>
      
      <div className="card shadow-sm border-0 p-4" style={{ borderRadius: '15px', backgroundColor: 'var(--white)' }}>
        <h5 style={{ color: 'var(--primary)' }} className="mb-3">Tren Pemesanan</h5>
        <div className="d-flex align-items-center justify-content-center bg-light" style={{ height: '300px', borderRadius: '10px' }}>
           <p className="text-muted mb-0">Fitur Grafik Tren Sedang Dalam Pengembangan...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;