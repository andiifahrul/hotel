// ... import sebelumnya
import React, { useState } from 'react';

const BookingPage = () => {
  // ... state sebelumnya
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentProof, setPaymentProof] = useState(null);

  // Fungsi saat tombol konfirmasi ditekan
  const handleBookingSubmit = (e) => {
    e.preventDefault();
    // Validasi dasar (cek tanggal)
    if (new Date(formData.checkOut) <= new Date(formData.checkIn)) {
      alert("Tanggal salah!");
      return;
    }
    // Buka modal pembayaran
    setShowPaymentModal(true);
  };

  // Fungsi saat user mengupload bukti
  const handleFileChange = (e) => {
    setPaymentProof(e.target.files[0]);
  };

  // Fungsi akhir setelah bukti diupload
  const handleFinalPayment = () => {
    if (!paymentProof) {
      alert("Mohon upload bukti pembayaran terlebih dahulu!");
      return;
    }
    alert("Bukti pembayaran berhasil dikirim! Kami akan segera memproses pesanan Anda.");
    setShowPaymentModal(false);
    // Di sini Anda bisa menambahkan logika kirim data ke API
  };

  return (
    <div className="container-fluid px-3 py-5" style={{ marginTop: '80px' }}>
      {/* ... kode form sebelumnya (ganti tombol submit menjadi pemanggil modal) */}
      <button 
        type="button" 
        onClick={handleBookingSubmit}
        className="btn w-100" 
        style={{ backgroundColor: 'var(--accent)', color: 'var(--white)', borderRadius: '50px' }}
      >
        Konfirmasi Pemesanan
      </button>

      {/* MODAL PEMBAYARAN */}
      {showPaymentModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h4 className="mb-4">Selesaikan Pembayaran</h4>
            <p>Silakan scan QRIS di bawah ini:</p>
            
            {/* Ganti src dengan link gambar QRIS Anda */}
            <img src="/path-ke-gambar-qris.jpg" alt="QRIS Hotel" style={{ width: '200px', marginBottom: '20px' }} />
            
            <div className="mb-3 text-start">
              <label className="form-label">Upload Bukti Transfer:</label>
              <input type="file" className="form-control" onChange={handleFileChange} />
            </div>

            <div className="d-flex gap-2">
              <button className="btn btn-secondary w-50" onClick={() => setShowPaymentModal(false)}>Batal</button>
              <button className="btn w-50" style={{ backgroundColor: 'var(--accent)', color: 'var(--white)' }} onClick={handleFinalPayment}>Kirim Bukti</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Style sederhana untuk Modal
const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: '#fff',
  padding: '30px',
  borderRadius: '15px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center'
};

export default BookingPage;