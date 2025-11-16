import React, { useState } from 'react';
import TarjetaJuego from '../components/TarjetaJuego';
import FormularioJuego from '../components/FormularioJuego';
import '../styles/BibliotecaJuegos.css';

function BibliotecaJuegos({ juegos, onAgregarJuego, onEditarJuego, onEliminarJuego }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [juegoEditando, setJuegoEditando] = useState(null);
  const [filtroGenero, setFiltroGenero] = useState('');
  const [filtroPlataforma, setFiltroPlataforma] = useState('');
  const [filtroCompletado, setFiltroCompletado] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  // Obtener géneros y plataformas únicos
  const generos = [...new Set(juegos.map(j => j.genero))];
  const plataformas = [...new Set(juegos.map(j => j.plataforma))];

  // Filtrar juegos
  const juegosFiltrados = juegos.filter(juego => {
    const cumpleBusqueda = juego.titulo.toLowerCase().includes(busqueda.toLowerCase());
    const cumpleGenero = !filtroGenero || juego.genero === filtroGenero;
    const cumplePlataforma = !filtroPlataforma || juego.plataforma === filtroPlataforma;
    const cumpleCompletado = 
      filtroCompletado === 'todos' ||
      (filtroCompletado === 'completados' && juego.completado) ||
      (filtroCompletado === 'pendientes' && !juego.completado);

    return cumpleBusqueda && cumpleGenero && cumplePlataforma && cumpleCompletado;
  });

  const handleAbrirFormulario = () => {
    setJuegoEditando(null);
    setMostrarFormulario(true);
  };

  const handleEditarJuego = (juego) => {
    setJuegoEditando(juego);
    setMostrarFormulario(true);
  };

  const handleGuardarJuego = (juegoData) => {
    if (juegoEditando) {
      onEditarJuego(juegoEditando._id, juegoData);
    } else {
      onAgregarJuego(juegoData);
    }
    setMostrarFormulario(false);
    setJuegoEditando(null);
  };

  const handleCancelar = () => {
    setMostrarFormulario(false);
    setJuegoEditando(null);
  };

  const limpiarFiltros = () => {
    setFiltroGenero('');
    setFiltroPlataforma('');
    setFiltroCompletado('todos');
    setBusqueda('');
  };

  return (
    <div className="biblioteca-page">
      <div className="biblioteca-header">
        <div className="header-top">
          <div>
            <h2 className="section-title">📚 Mi Biblioteca de Juegos</h2>
            <p className="section-subtitle">
              {juegos.length} {juegos.length === 1 ? 'juego' : 'juegos'} en tu colección
            </p>
          </div>
          <button className="btn btn-primary" onClick={handleAbrirFormulario}>
            ➕ Agregar Juego
          </button>
        </div>

        {/* Filtros y búsqueda */}
        <div className="filtros-container">
          <div className="filtros-grid">
            <div className="filtro-item">
              <label>🔍 Buscar:</label>
              <input
                type="text"
                placeholder="Buscar por título..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="filtro-item">
              <label>🎮 Género:</label>
              <select
                value={filtroGenero}
                onChange={(e) => setFiltroGenero(e.target.value)}
                className="form-select"
              >
                <option value="">Todos los géneros</option>
                {generos.map(genero => (
                  <option key={genero} value={genero}>{genero}</option>
                ))}
              </select>
            </div>

            <div className="filtro-item">
              <label>🖥️ Plataforma:</label>
              <select
                value={filtroPlataforma}
                onChange={(e) => setFiltroPlataforma(e.target.value)}
                className="form-select"
              >
                <option value="">Todas las plataformas</option>
                {plataformas.map(plataforma => (
                  <option key={plataforma} value={plataforma}>{plataforma}</option>
                ))}
              </select>
            </div>

            <div className="filtro-item">
              <label>✓ Estado:</label>
              <select
                value={filtroCompletado}
                onChange={(e) => setFiltroCompletado(e.target.value)}
                className="form-select"
              >
                <option value="todos">Todos</option>
                <option value="completados">Completados</option>
                <option value="pendientes">Pendientes</option>
              </select>
            </div>
          </div>

          {(filtroGenero || filtroPlataforma || filtroCompletado !== 'todos' || busqueda) && (
            <button className="btn btn-secondary btn-sm" onClick={limpiarFiltros}>
              🔄 Limpiar Filtros
            </button>
          )}
        </div>
      </div>

      {/* Grid de juegos */}
      {juegosFiltrados.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">🎮</div>
          <p className="empty-state-text">
            {juegos.length === 0 
              ? 'No tienes juegos en tu biblioteca aún'
              : 'No se encontraron juegos con esos filtros'
            }
          </p>
          {juegos.length === 0 && (
            <button className="btn btn-primary" onClick={handleAbrirFormulario}>
              ➕ Agregar tu primer juego
            </button>
          )}
        </div>
      ) : (
        <div className="games-grid">
          {juegosFiltrados.map(juego => (
            <TarjetaJuego
              key={juego._id}
              juego={juego}
              onEdit={handleEditarJuego}
              onDelete={onEliminarJuego}
            />
          ))}
        </div>
      )}

      {/* Formulario Modal */}
      {mostrarFormulario && (
        <FormularioJuego
          juegoEditando={juegoEditando}
          onGuardar={handleGuardarJuego}
          onCancelar={handleCancelar}
        />
      )}
    </div>
  );
}

export default BibliotecaJuegos;