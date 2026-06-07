// src/pages/Home.jsx
import React, { useState } from 'react';
import Hero from '../componen/componenpublic/HeroSection';
import RoomCard from '../componen/componenpublic/Room';
import RoomModal from '../componen/componenpublic/RoomModal';
import Fasilitas from '../componen/componenpublic/Fasilitas';
import Location from '../componen/componenpublic/Lokasi';
import Contact from '../componen/componenpublic/Contact';

  export const rooms = [
    { 
      title: "Deluxe Room", 
      price: "500.000", 
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop",
      facilities: ["Wi-Fi Gratis", "AC", "Smart TV", "Minibar"] 
    },
    { 
      title: "Suite Room", 
      price: "1.200.000", 
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop",
      facilities: ["Bathtub", "King Bed", "View Kota", "Ruang Tamu", "Coffee Maker"] 
    },
    { 
      title: "Family Room", 
      price: "900.000", 
      image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=800&auto=format&fit=crop",
      facilities: ["2 Queen Beds", "Dapur Kecil", "Wi-Fi", "Area Bermain Anak"] 
    },
  ];

const Home = () => {
  // State untuk menyimpan data kamar yang sedang diklik
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Data kamar sekarang sudah memiliki properti 'facilities'


  return (
    <>
      <section id="hero">
        <Hero />
      </section>

      <section className="container py-5" id="kamar">
        <h2 className="text-center mb-5 fw-bold" style={{ color: '#1A2B48' }}>
          Kamar Pilihan Kami
        </h2>
        <div className="row">
          {rooms.map((room, index) => (
            <RoomCard 
              key={index} 
              {...room} 
              onOpen={setSelectedRoom}
            />
          ))}
        </div>
      </section>

      {/* Komponen Modal akan otomatis menerima data fasilitas dari selectedRoom */}
      <RoomModal 
        show={selectedRoom !== null} 
        onClose={() => setSelectedRoom(null)} 
        roomData={selectedRoom || {}} 
      />

      <section id='fasilitas'>
        <Fasilitas />
      </section>

      <section id='lokasi'>
        <Location />
      </section>

      <section id='kontak'>
        <Contact />
      </section>
    </>
  );
};

export default Home;