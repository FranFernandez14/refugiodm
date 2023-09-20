import React from 'react';
import { FaBed, FaBath, FaWifi, FaFire } from 'react-icons/fa';
import './cardcabaña.css';

const Cardcabaña = () => {
    return (
        <div className="cabin-card">
          <div className="cabin-image-container">
            <img
              src="https://via.placeholder.com/300x200" // Placeholder de imagen
              alt="Cabaña"
              className="cabin-image"
            />
            <div className="cabin-text">
              <h3>Cabaña en la montaña</h3>
              <p>Ubicación: Montañas</p>
              <p>Capacidad: 4 personas</p>
              <p>Precio por noche: $100</p>
            </div>
          </div>
          <div className="cabin-icons">
            <div>
              <FaBed /> <span>2 Habitaciones</span>
            </div>
            <div>
              <FaBath /> <span>2 Baños</span>
            </div>
            <div>
              <FaWifi /> <span>Wi-Fi</span>
            </div>
            <div>
              <FaFire /> <span>Chimenea</span>
            </div>
          </div>
          <button className="reserve-button">Reservar</button>
        </div>
      );
};

export default Cardcabaña;
