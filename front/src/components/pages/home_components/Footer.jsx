const Footer = () => {
    return (
      <>
        <footer className="footer-i bg-menu">
          <div className="footer-des">
            <h3 className="footer-title"><span className="font-mod">el patio</span></h3>
            <h4 className="footer-text">- Restaurant de comida mejicana -</h4>
            <h4 className="footer-text">Bandera de Los Andes 1925</h4>
            <h4 className="footer-text">Ciudad de Mendoza</h4>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Navegación</h3>
            <div className="footer-links">
              <ul>
                <li><a href="pages/carta.html">Carta</a></li>
                <li><a href="#reservas">Reservas</a></li>
                <li><a href="#ubicacion">Ubicación</a></li>
                <li><a href="#reviews">Reseñas</a></li>
                <li><a href="#nosotros">Nosotros</a></li>
                <li><a href="pages/contacto.html">Contacto</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-section">
            <h3 className="footer-title">Nuestras redes sociales</h3>
            <div>
              <ul className="footer-icons">
                <li><a href="https://www.whatsapp.com/?lang=es" target="_blank"><i className='bx bxl-whatsapp footer-icon'></i><span> Whatsapp</span></a></li>
                <li><a href="https://www.instagram.com/" target="_blank"><i className='bx bxl-instagram footer-icon'></i><span>Instagram</span></a></li>
                <li><a href="https://github.com/PabloEchegaray97" target="_blank"><i className='bx bxl-github footer-icon'></i><span>Github</span></a></li>
                <li><a href="https://www.linkedin.com/in/pablo-echegaray-a4a000241/" target="_blank"><i className='bx bxl-linkedin footer-icon'></i><span>Linkedin</span></a></li>
              </ul>
            </div>
          </div>
        </footer>
      </>
    );
  }
  
  export default Footer;
  