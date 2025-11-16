import React from 'react';
import '../styles/TarjetaJuego.css';

function TarjetaJuego({ juego, onEdit, onDelete }) {
  return (
    <div className="tarjeta-juego fade-in">
      <div className="tarjeta-imagen">
        {juego.imagenPortada ? (
          <img src={juego.imagenPortada} alt={juego.titulo} />
        ) : (
          <div className="tarjeta-placeholder">
            <span>🎮</span>
            <p>Sin imagen</p>
          </div>
        )}
        {juego.completado && (
          <div className="badge-completado">✓ Completado</div>
        )}
      </div>
      
      <div className="tarjeta-contenido">
        <h3 className="tarjeta-titulo">{juego.titulo}</h3>
        
        <div className="tarjeta-info">
          <span className="info-tag">{juego.genero}</span>
          <span className="info-tag">{juego.plataforma}</span>
        </div>
        
        <p className="tarjeta-descripcion">
          {juego.descripcion || 'Sin descripción disponible'}
        </p>
        
        <div className="tarjeta-detalles">
          <span>🎯 {juego.desarrollador}</span>
          <span>📅 {juego.añoLanzamiento}</span>
        </div>
        
        <div className="tarjeta-acciones">
          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => onEdit(juego)}
          >
            ✏️ Editar
          </button>
          <button 
            className="btn btn-danger btn-sm"
            onClick={() => onDelete(juego._id)}
          >
            🗑️ Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}

export default TarjetaJuego;