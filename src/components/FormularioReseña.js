import React, { useState, useEffect } from 'react';
import '../styles/Formulario.css';

function FormularioReseña({ reseñaEditando, juegos, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    juegoId: '',
    puntuacion: 5,
    textoReseña: '',
    horasJugadas: 0,
    dificultad: 'Normal',
    recomendaria: true
  });

  const [hoverRating, setHoverRating] = useState(0);

  useEffect(() => {
    if (reseñaEditando) {
      setFormData(reseñaEditando);
    }
  }, [reseñaEditando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleRatingClick = (rating) => {
    setFormData({ ...formData, puntuacion: rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
    // Resetear formulario
    setFormData({
      juegoId: '',
      puntuacion: 5,
      textoReseña: '',
      horasJugadas: 0,
      dificultad: 'Normal',
      recomendaria: true
    });
  };

  const renderEstrellas = () => {
    return [...Array(5)].map((_, index) => {
      const ratingValue = index + 1;
      return (
        <span
          key={index}
          className={ratingValue <= (hoverRating || formData.puntuacion) ? 'star filled' : 'star'}
          onClick={() => handleRatingClick(ratingValue)}
          onMouseEnter={() => setHoverRating(ratingValue)}
          onMouseLeave={() => setHoverRating(0)}
        >
          ★
        </span>
      );
    });
  };

  return (
    <div className="formulario-overlay">
      <div className="formulario-modal fade-in">
        <div className="formulario-header">
          <h2>{reseñaEditando ? '✏️ Editar Reseña' : '⭐ Escribir Nueva Reseña'}</h2>
          <button className="btn-cerrar" onClick={onCancelar}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-group">
            <label className="form-label">Selecciona el Juego *</label>
            <select
              name="juegoId"
              value={formData.juegoId}
              onChange={handleChange}
              className="form-select"
              required
              disabled={reseñaEditando}
            >
              <option value="">-- Elige un juego --</option>
              {juegos.map(juego => (
                <option key={juego._id} value={juego._id}>
                  {juego.titulo}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Puntuación *</label>
            <div className="rating-container">
              <div className="star-rating">
                {renderEstrellas()}
              </div>
              <span className="rating-value">{formData.puntuacion}/5</span>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Horas Jugadas *</label>
              <input
                type="number"
                name="horasJugadas"
                value={formData.horasJugadas}
                onChange={handleChange}
                className="form-input"
                min="0"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dificultad *</label>
              <select
                name="dificultad"
                value={formData.dificultad}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="Fácil">Fácil</option>
                <option value="Normal">Normal</option>
                <option value="Difícil">Difícil</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tu Reseña *</label>
            <textarea
              name="textoReseña"
              value={formData.textoReseña}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Escribe tu opinión sobre el juego..."
              rows="6"
              required
            ></textarea>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="recomendaria"
                checked={formData.recomendaria}
                onChange={handleChange}
              />
              <span>👍 Recomendaría este juego</span>
            </label>
          </div>

          <div className="formulario-acciones">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {reseñaEditando ? '💾 Guardar Cambios' : '⭐ Publicar Reseña'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioReseña;