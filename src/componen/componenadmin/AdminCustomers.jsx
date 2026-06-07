import React from 'react';
import { Download } from 'lucide-react';

const AdminCustomers = ({ bookings }) => {
  // Ambil data booking yang sedang dikonfirmasi atau sudah selesai (check-out)
  const confirmedBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'completed');

  // Fungsi untuk Export data ke format CSV
  const handleExportCSV = () => {
    const headers = ['ID', 'Nama', 'Kamar', 'Check-in', 'Check-out', 'Total Harga', 'Status'];
    const csvData = confirmedBookings.map(b => [
      b.id,
      `"${b.nama || ''}"`,
      `"${b.room_title || ''}"`,
      b.check_in,
      b.check_out,
      b.total_price || 0,
      b.status || 'pending'
    ]);

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'data_costumer.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>Data Costumer</h2>
        <button className="btn" style={{ backgroundColor: 'var(--accent)', color: 'var(--white)' }} onClick={handleExportCSV}>
          <Download size={18} className="me-2" /> Export ke Excel (CSV)
        </button>
      </div>
      <div className="card shadow-sm p-3 p-md-4 border-0" style={{ borderRadius: '15px' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle text-nowrap">
            <thead className="table-light">
              <tr>
                <th>Nama Costumer</th>
                <th>Kamar yang Dipesan</th>
                <th>Tanggal Check-in</th>
                <th>Tanggal Check-out</th>
                <th>Total Transaksi (Rp)</th>
              </tr>
            </thead>
            <tbody>
              {confirmedBookings.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">Belum ada data costumer.</td>
                </tr>
              ) : (
                confirmedBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="fw-bold">{booking.nama}</td>
                    <td>{booking.room_title}</td>
                    <td>{booking.check_in}</td>
                    <td>{booking.check_out}</td>
                    <td>{booking.total_price?.toLocaleString('id-ID')}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;