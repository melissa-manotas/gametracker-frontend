import React, { useState, useEffect } from 'react';
import '../styles/Formulario.css';

function FormularioJuego({ juegoEditando, onGuardar, onCancelar }) {
  const [formData, setFormData] = useState({
    titulo: '',
    genero: '',
    plataforma: '',
    añoLanzamiento: new Date().getFullYear(),
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false
  });

  useEffect(() => {
    if (juegoEditando) {
      setFormData(juegoEditando);
    }
  }, [juegoEditando]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onGuardar(formData);
    // Resetear formulario
    setFormData({
      titulo: '',
      genero: '',
      plataforma: '',
      añoLanzamiento: new Date().getFullYear(),
      desarrollador: '',
      imagenPortada: '',
      descripcion: '',
      completado: false
    });
  };

  return (
    <div className="formulario-overlay">
      <div className="formulario-modal fade-in">
        <div className="formulario-header">
          <h2>{juegoEditando ? '✏️ Editar Juego' : '➕ Agregar Nuevo Juego'}</h2>
          <button className="btn-cerrar" onClick={onCancelar}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="formulario">
          <div className="form-group">
            <label className="form-label">Título *</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              className="form-input"
              required
              placeholder="Ej: The Last of Us"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Género *</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecciona...</option>
                <option value="Acción">Acción</option>
                <option value="Aventura">Aventura</option>
                <option value="RPG">RPG</option>
                <option value="Estrategia">Estrategia</option>
                <option value="Deportes">Deportes</option>
                <option value="Carreras">Carreras</option>
                <option value="Simulación">Simulación</option>
                <option value="Terror">Terror</option>
                <option value="Puzzle">Puzzle</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Plataforma *</label>
              <select
                name="plataforma"
                value={formData.plataforma}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Selecciona...</option>
                <option value="PC">PC</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="Xbox Series X/S">Xbox Series X/S</option>
                <option value="Xbox One">Xbox One</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Mobile">Mobile</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Año de Lanzamiento *</label>
              <input
                type="number"
                name="añoLanzamiento"
                value={formData.añoLanzamiento}
                onChange={handleChange}
                className="form-input"
                min="1970"
                max={new Date().getFullYear() + 5}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Desarrollador *</label>
              <input
                type="text"
                name="desarrollador"
                value={formData.desarrollador}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Ej: Naughty Dog"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">URL de la Imagen de Portada</label>
            <input
              type="url"
              name="imagenPortada"
              value={formData.imagenPortada}
              onChange={handleChange}
              className="form-input"
              placeholder="https://ejemplo.com/imagen.jpg"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              className="form-textarea"
              placeholder="Escribe una breve descripción del juego..."
              rows="4"
            ></textarea>
          </div>

          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="completado"
                checked={formData.completado}
                onChange={handleChange}
              />
              <span>✓ Marcar como completado</span>
            </label>
          </div>

          <div className="formulario-acciones">
            <button type="button" className="btn btn-secondary" onClick={onCancelar}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {juegoEditando ? '💾 Guardar Cambios' : '➕ Agregar Juego'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormularioJuego;