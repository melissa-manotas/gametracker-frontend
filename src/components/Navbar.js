import React from 'react';

function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="container navbar-content">
        <div className="navbar-logo">
          <span>🎮</span>
          GameTracker
        </div>
        <ul className="navbar-nav">
          <li>
            <a 
              href="#biblioteca"
              className={currentPage === 'biblioteca' ? 'active' : ''}
              onClick={() => setCurrentPage('biblioteca')}
            >
              📚 Mi Biblioteca
            </a>
          </li>
          <li>
            <a 
              href="#reseñas"
              className={currentPage === 'reseñas' ? 'active' : ''}
              onClick={() => setCurrentPage('reseñas')}
            >
              ⭐ Reseñas
            </a>
          </li>
          <li>
            <a 
              href="#estadisticas"
              className={currentPage === 'estadisticas' ? 'active' : ''}
              onClick={() => setCurrentPage('estadisticas')}
            >
              📊 Estadísticas
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;