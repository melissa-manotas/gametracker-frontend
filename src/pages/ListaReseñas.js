import React, { useState } from 'react';
import TarjetaReseña from '../components/TarjetaReseña';
import FormularioReseña from '../components/FormularioReseña';
import '../styles/ListaReseñas.css';

function ListaReseñas({ reseñas, juegos, onAgregarReseña, onEditarReseña, onEliminarReseña }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [reseñaEditando, setReseñaEditando] = useState(null);

  const handleAbrirFormulario = () => {
    setReseñaEditando(null);
    setMostrarFormulario(true);
  };

  const handleEditarReseña = (reseña) => {
    setReseñaEditando(reseña);
    setMostrarFormulario(true);
  };

  const handleGuardarReseña = (reseñaData) => {
    if (reseñaEditando) {
      onEditarReseña(reseñaEditando._id, reseñaData);
    } else {
      onAgregarReseña(reseñaData);
    }
    setMostrarFormulario(false);
    setReseñaEditando(null);
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setReseñaEditando(null);
  };

  // Función para encontrar el juego de una reseña
  const obtenerJuego = (juegoId) => {
    // Si juegoId es un objeto (poblado desde el backend), usa directamente
    if (typeof juegoId === 'object' && juegoId !== null) {
      return juegoId;
    }
    // Si es un string, busca en el array de juegos
    return juegos.find(j => j._id === juegoId);
  };

  return (
    <div className="reseñas-page">
      <div className="reseñas-header">
        <div>
          <h2 className="section-title">⭐ Mis Reseñas</h2>
          <p className="section-subtitle">
            {reseñas.length} {reseñas.length === 1 ? 'reseña escrita' : 'reseñas escritas'}
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={handleAbrirFormulario}
          disabled={juegos.length === 0}
        >
          ✍️ Escribir Reseña
        </button>
      </div>

      {juegos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎮</div>
          <p className="empty-state-text">
            Primero debes agregar juegos a tu biblioteca para poder escribir reseñas
          </p>
        </div>
      ) : reseñas.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">⭐</div>
          <p className="empty-state-text">
            Aún no has escrito ninguna reseña
          </p>
          <button className="btn btn-primary" onClick={handleAbrirFormulario}>
            ✍️ Escribe tu primera reseña
          </button>
        </div>
      ) : (
        <div className="reseñas-lista">
          {reseñas.map(reseña => (
            <TarjetaReseña
              key={reseña._id}
              reseña={reseña}
              juego={obtenerJuego(reseña.juegoId)}
              onEdit={handleEditarReseña}
              onDelete={onEliminarReseña}
            />
          ))}
        </div>
      )}

      {/* Formulario Modal */}
      {mostrarFormulario && (
        <FormularioReseña
          reseñaEditando={reseñaEditando}
          juegos={juegos}
          onGuardar={handleGuardarReseña}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default ListaReseñas;