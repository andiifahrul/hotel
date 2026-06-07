
import Swal from 'sweetalert2';

// Warna tema hotel Anda agar seragam
const ACCENT_COLOR = '#C5A059'; 

export const showAlert = {
  success: (title, text) => {
    return Swal.fire({
      icon: 'success',
      title: title,
      text: text,
      confirmButtonColor: ACCENT_COLOR
    });
  },
  
  error: (title, text) => {
    return Swal.fire({
      icon: 'error',
      title: title,
      text: text,
      confirmButtonColor: ACCENT_COLOR
    });
  },
  
  warning: (title, text) => {
    return Swal.fire({
      icon: 'warning',
      title: title,
      text: text,
      confirmButtonColor: ACCENT_COLOR
    });
  },
  
  confirm: (title, text, confirmText = 'Ya', cancelText = 'Batal') => {
    return Swal.fire({
      title: title,
      text: text,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#dc3545', // Warna merah untuk aksi bahaya (logout/hapus)
      cancelButtonColor: '#6c757d',
      confirmButtonText: confirmText,
      cancelButtonText: cancelText
    });
  }
};