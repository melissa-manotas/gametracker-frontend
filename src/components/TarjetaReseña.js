import React from 'react';
import '../styles/TarjetaReseña.css';

function TarjetaReseña({ reseña, juego, onEdit, onDelete }) {
  const renderEstrellas = (puntuacion) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < puntuacion ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  const getDificultadColor = (dificultad) => {
    switch(dificultad) {
      case 'Fácil': return 'var(--accent-green)';
      case 'Normal': return 'var(--accent-orange)';
      case 'Difícil': return 'var(--accent-pink)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="tarjeta-reseña fade-in">
      <div className="reseña-header">
        <div className="reseña-juego-info">
          <h3>{juego?.titulo || 'Juego no encontrado'}</h3>
          <div className="reseña-rating">
            {renderEstrellas(reseña.puntuacion)}
            <span className="rating-numero">{reseña.puntuacion}/5</span>
          </div>
        </div>
        <div className="reseña-badges">
          {reseña.recomendaria && (
            <span className="badge badge-recomendado">👍 Recomendado</span>
          )}
          <span 
            className="badge badge-dificultad"
            style={{ borderColor: getDificultadColor(reseña.dificultad) }}
          >
            🎯 {reseña.dificultad}
          </span>
        </div>
      </div>

      <div className="reseña-contenido">
        <p>{reseña.textoReseña}</p>
      </div>

      <div className="reseña-footer">
        <div className="reseña-stats">
          <span>⏱️ {reseña.horasJugadas}h jugadas</span>
          <span>📅 {new Date(reseña.fechaCreacion).toLocaleDateString()}</span>
        </div>
        
        <div className="reseña-acciones">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(reseña)}
          >
            ✏️ Editar
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(reseña._id)}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaReseña;