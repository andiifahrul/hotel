import React, { useState } from 'react';
import { supabase } from '../../services/Supabase';
import { rooms } from '../../pages/Home'; // Mengambil data harga kamar

const ModalAddOffline = ({ show, onClose, onSuccess, roomClasses, getAvailableRooms }) => {
  const [loading, setLoading] = useState(false);
  const [offlineData, setOfflineData] = useState({
    nama: '',
    room_title: roomClasses[0]?.title || '',
    check_in: '',
    check_out: '',
    room_number: '' // Menambah field nomor kamar
  });

  if (!show) return null;

  // Menentukan batas minimal tanggal hari ini dan tanggal Check-out
  const today = new Date().toISOString().split('T')[0];
  let minCheckOut = today;
  if (offlineData.check_in) {
    const checkInDate = new Date(offlineData.check_in);
    checkInDate.setDate(checkInDate.getDate() + 1);
    minCheckOut = checkInDate.toISOString().split('T')[0];
  }

  // Fungsi untuk menghitung otomatis total harga
  const calculateTotal = () => {
    if (offlineData.check_in && offlineData.check_out && offlineData.room_title) {
      const start = new Date(offlineData.check_in);
      const end = new Date(offlineData.check_out);
      const diffTime = end - start;
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      const selectedRoom = rooms.find(r => r.title === offlineData.room_title);
      if (selectedRoom && nights > 0) {
        const cleanPrice = String(selectedRoom.price).replace(/[^0-9]/g, '');
        return nights * Number(cleanPrice);
      }
    }
    return 0;
  };

  const handleOfflineSubmit = async (e) => {
    e.preventDefault();

    // Validasi agar Check-out minimal 1 hari setelah Check-in
    if (new Date(offlineData.check_out) <= new Date(offlineData.check_in)) {
      alert("Tanggal Check-out harus minimal 1 hari setelah Check-in!");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.from('bookings').insert([
        {
          nama: offlineData.nama,
          room_title: offlineData.room_title,
          check_in: offlineData.check_in,
          check_out: offlineData.check_out,
          total_price: calculateTotal(), // Memasukkan hasil hitung otomatis
          status: 'confirmed', // Otomatis terkonfirmasi
          payment_url: 'Offline (Bayar di Tempat)', // Tanda bayar langsung
          room_number: offlineData.room_number || null // Menyimpan nomor kamar jika diisi
        }
      ]);
      if (error) throw error;

      alert('Pesanan offline berhasil ditambahkan!');
      // Reset form
      setOfflineData({ nama: '', room_title: roomClasses[0]?.title || '', check_in: '', check_out: '', room_number: '' });
      onSuccess(); // Refresh tabel di komponen induk
      onClose();   // Tutup modal
    } catch (error) {
      console.error(error);
      alert('Gagal menambahkan pesanan offline: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1050 }}
      onClick={onClose}
    >
      <div className="bg-white p-4 shadow" style={{ borderRadius: '15px', width: '90%', maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <h4 className="mb-4 text-center" style={{ color: 'var(--primary)' }}>Tambah Pesanan Offline</h4>
        <form onSubmit={handleOfflineSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Tamu</label>
            <input type="text" className="form-control" required value={offlineData.nama} onChange={(e) => setOfflineData({...offlineData, nama: e.target.value})} />
          </div>
          <div className="mb-3">
            <label className="form-label">Tipe Kamar</label>
            {/* Jika tipe kamar berubah, reset nomor kamar agar tidak salah pilih */}
            <select className="form-select" value={offlineData.room_title} onChange={(e) => setOfflineData({...offlineData, room_title: e.target.value, room_number: ''})}>
              {roomClasses.map(rc => <option key={rc.title} value={rc.title}>{rc.title}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label">Pilih Nomor Kamar (Opsional)</label>
            <select className="form-select" value={offlineData.room_number} onChange={(e) => setOfflineData({...offlineData, room_number: e.target.value})}>
              <option value="">-- Pilih Nanti --</option>
              {getAvailableRooms(offlineData.room_title).map(room => (
                <option key={room} value={room}>{room}</option>
              ))}
            </select>
          </div>
          <div className="row">
            <div className="col-6 mb-3"><label className="form-label">Check-in</label><input type="date" className="form-control" required min={today} value={offlineData.check_in} onChange={(e) => setOfflineData({...offlineData, check_in: e.target.value})} /></div>
            <div className="col-6 mb-3"><label className="form-label">Check-out</label><input type="date" className="form-control" required min={minCheckOut} value={offlineData.check_out} onChange={(e) => setOfflineData({...offlineData, check_out: e.target.value})} /></div>
          </div>
          <div className="mb-4">
            <label className="form-label">Total Harga</label>
            <div className="form-control bg-light" style={{ cursor: 'not-allowed' }}>
              <strong>Rp {calculateTotal().toLocaleString('id-ID')}</strong>
            </div>
          </div>
          <div className="d-flex gap-2 justify-content-end">
            <button type="button" className="btn btn-outline-secondary" onClick={onClose} disabled={loading}>Batal</button>
            <button type="submit" className="btn text-white" style={{ backgroundColor: 'var(--accent)' }} disabled={loading}>
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalAddOffline;