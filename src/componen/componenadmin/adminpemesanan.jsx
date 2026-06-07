import React, { useState, useEffect } from 'react';
import { supabase } from '../../services/Supabase';
import { LayoutDashboard, ShoppingCart, Users, BedDouble, Search } from 'lucide-react';
import AdminDashboard from '../AdminDashboard';
import AdminCustomers from './AdminCustomers';
import AdminRoomMonitor from './AdminRoomMonitor';
import ModalAddOffline from './ModalAddOffline';

const ROOM_CLASSES = [
  { title: "Deluxe Room", prefix: "DLX" },
  { title: "Suite Room", prefix: "SUT" },
  { title: "Family Room", prefix: "FML" }
];

const Admin = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard'); // State untuk tab aktif
  const [showOfflineModal, setShowOfflineModal] = useState(false);
  const [searchOrder, setSearchOrder] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error.message);
      alert('Gagal mengambil data pemesanan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // Pastikan ada kolom 'status' di tabel bookings di Supabase!
      // (Bisa juga tambahkan alter table di Supabase Anda: 
      //  ALTER TABLE bookings ADD COLUMN status VARCHAR(20) DEFAULT 'pending';)
      const { data, error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error("Update diblokir oleh database! Pastikan RLS (Row Level Security) untuk operasi UPDATE sudah diizinkan di Supabase.");
      }

      // Update state lokal
      setBookings(
        bookings.map((booking) =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      console.error('Error updating status:', error.message);
      alert(`Gagal mengupdate status: ${error.message}`);
    }
  };

  // Fungsi untuk mendapatkan daftar kamar yang masih kosong
  const getAvailableRooms = (roomTitle) => {
    const roomClass = ROOM_CLASSES.find(rc => rc.title === roomTitle);
    if (!roomClass) return [];
    
    // Generate 15 nomor kamar (misal: DLX-01 s/d DLX-15)
    const allRooms = Array.from({ length: 15 }, (_, i) => `${roomClass.prefix}-${(i + 1).toString().padStart(2, '0')}`);
    
    // Filter kamar yang sedang ditempati (status 'confirmed' dan punya nomor kamar)
    const occupiedRooms = bookings
      .filter(b => b.status === 'confirmed' && b.room_title === roomTitle && b.room_number)
      .map(b => b.room_number);
      
    return allRooms.filter(r => !occupiedRooms.includes(r));
  };

  // Fungsi untuk menyimpan pilihan kamar ke database
  const handleAssignRoom = async (id, roomNumber) => {
    if (!roomNumber) return;
    try {
      const { data, error } = await supabase.from('bookings').update({ room_number: roomNumber }).eq('id', id).select();
      if (error) throw error;
      if (!data || data.length === 0) throw new Error("Update diblokir oleh RLS.");

      setBookings(bookings.map(b => b.id === id ? { ...b, room_number: roomNumber } : b));
    } catch (error) {
      console.error(error);
      alert(`Gagal menugaskan kamar: ${error.message}`);
    }
  };

  // Filter data untuk tab Orderan Kostumer
  const filteredOrders = bookings.filter(b => 
    b.nama?.toLowerCase().includes(searchOrder.toLowerCase())
  );

  if (loading) {
    return (
      <div className="container-fluid px-3 py-5" style={{ minHeight: '60vh' }}>
        <h2 className="text-center">Memuat data admin...</h2>
      </div>
    );
  }

  // Tab: Orderan Kostumer
  const renderOrders = () => (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <h2 style={{ color: 'var(--primary)', margin: 0 }}>Orderan Kostumer</h2>
        <div className="d-flex gap-2 flex-nowrap">
          <div className="input-group" style={{ maxWidth: '250px' }}>
            <span className="input-group-text bg-white"><Search size={18} className="text-muted" /></span>
            <input 
              type="text" 
              className="form-control border-start-0 ps-0" 
              placeholder="Cari nama tamu..." 
              value={searchOrder}
              onChange={(e) => setSearchOrder(e.target.value)}
            />
          </div>
          <button 
            className="btn" 
            style={{ backgroundColor: 'var(--accent)', color: 'var(--white)' }}
            onClick={() => setShowOfflineModal(true)}
          >
            + Pesanan Offline
          </button>
        </div>
      </div>
      <div className="card shadow-sm p-3 p-md-4 border-0" style={{ borderRadius: '15px' }}>
        <div className="table-responsive">
          <table className="table table-hover align-middle text-nowrap">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nama</th>
                <th>Tipe Kamar</th>
                <th>Check-in</th>
                <th>Check-out</th>
                <th>Total (Rp)</th>
                <th>Bukti Bayar</th>
                <th>No. Kamar</th>
                <th>Status</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="10" className="text-center py-4">{searchOrder ? 'Nama tamu tidak ditemukan.' : 'Belum ada data pemesanan.'}</td>
                </tr>
              ) : (
                filteredOrders.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.nama}</td>
                    <td>{booking.room_title}</td>
                    <td>{booking.check_in}</td>
                    <td>{booking.check_out}</td>
                    <td>{booking.total_price?.toLocaleString('id-ID')}</td>
                    <td>
                      {booking.payment_url && booking.payment_url.startsWith('http') ? (
                        <button 
                          onClick={() => setSelectedImage(booking.payment_url)} 
                          className="btn btn-sm btn-outline-primary"
                        >
                          Lihat Bukti
                        </button>
                      ) : booking.payment_url ? (
                        <span className="badge bg-secondary">{booking.payment_url}</span>
                      ) : (
                        <span className="text-muted">Tidak ada</span>
                      )}
                    </td>
                    <td>
                      {booking.status === 'confirmed' ? (
                        <select 
                          className="form-select form-select-sm" 
                          onChange={(e) => handleAssignRoom(booking.id, e.target.value)}
                          value={booking.room_number || ""}
                          style={{ minWidth: '110px' }}
                        >
                          <option value="" disabled>Pilih Kamar</option>
                          {booking.room_number && <option value={booking.room_number}>{booking.room_number}</option>}
                          {getAvailableRooms(booking.room_title).map(room => (
                            <option key={room} value={room}>{room}</option>
                          ))}
                        </select>
                      ) : booking.room_number ? (
                        <span className="badge bg-secondary">{booking.room_number}</span>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                    <td>
                      <span 
                        className={`badge ${
                          booking.status === 'confirmed' ? 'bg-success' :
                      booking.status === 'completed' ? 'bg-info text-dark' :
                          booking.status === 'rejected' ? 'bg-danger' : 
                          'bg-warning text-dark'
                        }`}
                      >
                        {booking.status || 'pending'}
                      </span>
                    </td>
                    <td>
                      {(!booking.status || booking.status === 'pending') && (
                        <div className="d-flex flex-wrap gap-2">
                          <button 
                            className="btn btn-sm btn-success"
                            onClick={() => handleUpdateStatus(booking.id, 'confirmed')}
                          >
                            Konfirmasi
                          </button>
                          <button 
                            className="btn btn-sm btn-danger"
                            onClick={() => handleUpdateStatus(booking.id, 'rejected')}
                          >
                            Tolak
                          </button>
                        </div>
                      )}
                  {booking.status === 'confirmed' && (
                    <button 
                      className="btn btn-sm btn-info text-dark mt-1"
                      onClick={() => handleUpdateStatus(booking.id, 'completed')}
                    >
                      Selesai (Check-out)
                    </button>
                  )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="d-flex flex-column flex-md-row" style={{ minHeight: '100vh' }}>
      
      {/* Sidebar Admin */}
      <div className="p-3 p-md-4 shadow-sm flex-shrink-0" style={{ flexBasis: '280px', backgroundColor: 'var(--primary)', color: 'var(--white)' }}>
        <h4 className="text-center mb-4 mt-2 fw-bold" style={{ color: 'var(--accent)' }}>Admin Panel</h4>
        <hr style={{ borderColor: 'var(--border)', opacity: 0.2 }} />
        <div className="d-flex flex-column gap-2 mt-4">
          <button className="btn text-start w-100 p-3" style={{ color: activeTab === 'dashboard' ? 'var(--white)' : '#ccc', backgroundColor: activeTab === 'dashboard' ? 'var(--accent)' : 'transparent', border: 'none', borderRadius: '10px' }} onClick={() => setActiveTab('dashboard')}>
            <LayoutDashboard size={20} className="me-3" /> Dashboard
          </button>
          <button className="btn text-start w-100 p-3" style={{ color: activeTab === 'orders' ? 'var(--white)' : '#ccc', backgroundColor: activeTab === 'orders' ? 'var(--accent)' : 'transparent', border: 'none', borderRadius: '10px' }} onClick={() => setActiveTab('orders')}>
            <ShoppingCart size={20} className="me-3" /> Orderan Kostumer
          </button>
          <button className="btn text-start w-100 p-3" style={{ color: activeTab === 'customers' ? 'var(--white)' : '#ccc', backgroundColor: activeTab === 'customers' ? 'var(--accent)' : 'transparent', border: 'none', borderRadius: '10px' }} onClick={() => setActiveTab('customers')}>
            <Users size={20} className="me-3" /> Data Costumer
          </button>
          <button className="btn text-start w-100 p-3" style={{ color: activeTab === 'rooms' ? 'var(--white)' : '#ccc', backgroundColor: activeTab === 'rooms' ? 'var(--accent)' : 'transparent', border: 'none', borderRadius: '10px' }} onClick={() => setActiveTab('rooms')}>
            <BedDouble size={20} className="me-3" /> Pantau Kamar
          </button>
        </div>
      </div>

      {/* Area Konten Utama */}
      <div className="flex-grow-1 p-4 p-md-5" style={{ backgroundColor: 'var(--bg)', overflowY: 'auto', width: '100%' }}>
        {activeTab === 'dashboard' && <AdminDashboard bookings={bookings} />}
        {activeTab === 'orders' && renderOrders()}
        {activeTab === 'customers' && <AdminCustomers bookings={bookings} />}
        {activeTab === 'rooms' && <AdminRoomMonitor bookings={bookings} />}
      </div>

      {/* Modal / Overlay for Bukti Pembayaran */}
      {selectedImage && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setSelectedImage(null)}
              style={{
                position: 'absolute',
                top: '-40px',
                right: '0',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '30px',
                cursor: 'pointer'
              }}
            >
              &times;
            </button>
            <img 
              src={selectedImage} 
              alt="Bukti Pembayaran" 
              style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }} 
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* Modal / Overlay for Tambah Pesanan Offline */}
      <ModalAddOffline 
        show={showOfflineModal} 
        onClose={() => setShowOfflineModal(false)} 
        onSuccess={fetchBookings} 
        roomClasses={ROOM_CLASSES} 
        getAvailableRooms={getAvailableRooms}
      />
    </div>
  );
};

export default Admin;