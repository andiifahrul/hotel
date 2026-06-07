import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { rooms } from '../../pages/Home'; 
import { supabase } from '../../services/Supabase';

const BookingPage = () => {
  const location = useLocation();

  // --- STATE HARUS DI DALAM KOMPONEN ---
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [selectedRoom, setSelectedRoom] = useState(
    location.state?.selectedRoom || rooms[0]
  );

  const [formData, setFormData] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    arrivalTime: ''
  });

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoomChange = (e) => {
    const foundRoom = rooms.find(room => room.title === e.target.value);
    setSelectedRoom(foundRoom);
  };

  const handleOpenModal = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.checkIn || !formData.checkOut || !formData.arrivalTime) {
      alert("Mohon lengkapi semua data!");
      return;
    }

    // Validasi agar Check-out minimal 1 hari setelah Check-in
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert("Tanggal Check-out harus minimal 1 hari setelah Check-in!");
      return;
    }

    setShowPaymentModal(true);
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    let paymentUrl = null;

    // 1. Cek apakah ada file yang dipilih (menggunakan 'paymentProof' bukan 'file')
    if (paymentProof) {
      const fileName = `${Date.now()}_${paymentProof.name}`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('bukti-pembayaran') // Pastikan nama bucket ini benar
        .upload(fileName, paymentProof);

      if (uploadError) throw uploadError;

      // 2. Ambil URL publik file tersebut
      const { data: publicUrlData } = supabase.storage
        .from('bukti-pembayaran')
        .getPublicUrl(fileName);

      paymentUrl = publicUrlData.publicUrl;
    } else {
      throw new Error("Mohon upload bukti pembayaran terlebih dahulu");
    }

    // 3. Simpan ke database
    const { data, error } = await supabase
      .from('bookings')
      .insert([
        {
          nama: formData.name,
          check_in: formData.checkIn,
          check_out: formData.checkOut,
          arrival_time: formData.arrivalTime,
          room_title: selectedRoom.title,
          total_price: calculateTotal(),
          payment_url: paymentUrl,
          status: 'pending', // Added status field for admin
        },
      ]);

    if (error) throw error;

    alert("Pemesanan berhasil disimpan!");
    setShowPaymentModal(false);
    setFormData({ name: '', checkIn: '', checkOut: '', arrivalTime: '' });
    setPaymentProof(null); // Reset state file

  } catch (err) {
    console.error("Error:", err);
    alert("Gagal melakukan pemesanan: " + err.message);
  } finally {
    setIsLoading(false);
  }
};

  const calculateTotal = () => {
    if (formData.checkIn && formData.checkOut && selectedRoom) {
      const start = new Date(formData.checkIn);
      const end = new Date(formData.checkOut);
      const diffTime = end - start;
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const cleanPrice = String(selectedRoom.price).replace(/[^0-9]/g, '');
      const pricePerNight = Number(cleanPrice);
      return nights > 0 ? nights * pricePerNight : 0;
    }
    return 0;
  };

  // Menentukan batas minimal tanggal hari ini dan besoknya untuk form
  const today = new Date().toISOString().split('T')[0];
  let minCheckOut = today;
  if (formData.checkIn) {
    const checkInDate = new Date(formData.checkIn);
    checkInDate.setDate(checkInDate.getDate() + 1);
    minCheckOut = checkInDate.toISOString().split('T')[0];
  }

  return (
    <div className="container-fluid px-3 py-5" style={{ marginTop: '80px' }}>
      <h2 className="text-center mb-5" style={{ color: 'var(--primary)' }}>Formulir Pemesanan</h2>
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-5 mb-4">
          <div className="card shadow-sm p-3" style={{ borderRadius: '15px', overflow: 'hidden' }}>
            <h5 className="mb-3">Pilih Tipe Kamar:</h5>
            <select className="form-select mb-3 w-100" onChange={handleRoomChange} value={selectedRoom.title}>
              {rooms.map((room) => (
                <option key={room.title} value={room.title}>{room.title}</option>
              ))}
            </select>
            <img src={selectedRoom.image} alt={selectedRoom.title} className="img-fluid rounded mb-3" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <h4>{selectedRoom.title}</h4>
            <p className="text-muted">Harga: <strong>Rp {selectedRoom.price.toLocaleString('id-ID')}</strong> /malam</p>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="card shadow-sm p-4" style={{ borderRadius: '15px' }}>
            <form> {/* Form tidak perlu onSubmit di sini karena akan dipicu oleh tombol */}
              <div className="mb-3">
                <label className="form-label">Nama Lengkap</label>
                <input type="text" name="name" className="form-control" placeholder="Masukkan nama Anda" onChange={handleInputChange} required />
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Check-in</label>
                  <input type="date" name="checkIn" className="form-control" min={today} onChange={handleInputChange} required />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Check-out</label>
                  <input type="date" name="checkOut" className="form-control" min={minCheckOut} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Perkiraan Jam Kedatangan</label>
                <input type="time" name="arrivalTime" className="form-control" onChange={handleInputChange} required />
              </div>
              
              {calculateTotal() > 0 && (
                <div className="text-start mb-3">
                  <p className="fs-5 mb-0">Total Harga:</p>
                  <h3 style={{ color: 'var(--accent)' }}>Rp {calculateTotal().toLocaleString('id-ID')}</h3>
                </div>
              )}

              <button 
                type="button" 
                className="btn w-100" 
                onClick={handleOpenModal}
                style={{ backgroundColor: 'var(--accent)', color: 'var(--white)', borderRadius: '50px' }}
                disabled={isLoading}
              >
                {isLoading ? "Memproses..." : "Konfirmasi Pemesanan"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* MODAL PEMBAYARAN - HANYA MUNCUL JIKA showPaymentModal TRUE */}
      {showPaymentModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '15px', width: '300px' }}>
            <h4 className="mb-3">Selesaikan Pembayaran</h4>
            <p className="text-muted">Silakan lakukan pembayaran ke QRIS berikut:</p>

            <div 
              className="d-flex align-items-center justify-content-center bg-light border text-muted mb-3" 
              style={{ width: '100%', height: '200px', borderRadius: '10px' }}
            >
              [Gambar QRIS Anda Di Sini]
            </div>
            
            <div className="mb-3 text-start">
              <label className="form-label">Upload Bukti Transfer</label>
              <input type="file" className="form-control" onChange={(e) => setPaymentProof(e.target.files[0])} />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-outline-secondary w-50" onClick={() => setShowPaymentModal(false)}>Batal</button>
              <button className="btn w-50" style={{ backgroundColor: 'var(--accent)', color: 'var(--white)' }} onClick={handleSubmit}>Kirim</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingPage;