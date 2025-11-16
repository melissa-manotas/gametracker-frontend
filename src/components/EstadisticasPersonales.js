import React from 'react';
import '../styles/Estadisticas.css';

function EstadisticasPersonales({ juegos, reseñas }) {
  // Calcular estadísticas
  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(j => j.completado).length;
  const juegosPendientes = totalJuegos - juegosCompletados;
  const totalReseñas = reseñas.length;
  
  const horasTotales = reseñas.reduce((total, r) => total + Number(r.horasJugadas), 0);
  
  const promedioCalificacion = reseñas.length > 0
    ? (reseñas.reduce((sum, r) => sum + r.puntuacion, 0) / reseñas.length).toFixed(1)
    : 0;

  // Juegos recomendados
  const juegosRecomendados = reseñas.filter(r => r.recomendaria).length;

  // Géneros más jugados
  const generos = {};
  juegos.forEach(juego => {
    generos[juego.genero] = (generos[juego.genero] || 0) + 1;
  });
  const generoFavorito = Object.keys(generos).length > 0
    ? Object.keys(generos).reduce((a, b) => generos[a] > generos[b] ? a : b)
    : 'N/A';

  // Plataformas
  const plataformas = {};
  juegos.forEach(juego => {
    plataformas[juego.plataforma] = (plataformas[juego.plataforma] || 0) + 1;
  });

  return (
    <div className="estadisticas-container">
      <div className="estadisticas-grid">
        {/* Tarjeta 1: Total de Juegos */}
        <div className="stat-card fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--accent-purple), var(--accent-cyan))' }}>
            🎮
          </div>
          <div className="stat-info">
            <h3>{totalJuegos}</h3>
            <p>Total de Juegos</p>
          </div>
        </div>

        {/* Tarjeta 2: Juegos Completados */}
        <div className="stat-card fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--accent-green), #22c55e)' }}>
            ✓
          </div>
          <div className="stat-info">
            <h3>{juegosCompletados}</h3>
            <p>Completados</p>
          </div>
        </div>

        {/* Tarjeta 3: Juegos Pendientes */}
        <div className="stat-card fade-in" style={{ animationDelay: '0.3s' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--accent-orange), #f97316)' }}>
            ⏳
          </div>
          <div className="stat-info">
            <h3>{juegosPendientes}</h3>
            <p>Pendientes</p>
          </div>
        </div>

        {/* Tarjeta 4: Total Reseñas */}
        <div className="stat-card fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--accent-pink), #ec4899)' }}>
            ⭐
          </div>
          <div className="stat-info">
            <h3>{totalReseñas}</h3>
            <p>Reseñas Escritas</p>
          </div>
        </div>

        {/* Tarjeta 5: Horas Totales */}
        <div className="stat-card fade-in" style={{ animationDelay: '0.5s' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6366f1)' }}>
            ⏱️
          </div>
          <div className="stat-info">
            <h3>{horasTotales}h</h3>
            <p>Horas Jugadas</p>
          </div>
        </div>

        {/* Tarjeta 6: Promedio de Calificación */}
        <div className="stat-card fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="stat-icon" style={{ background: 'linear-gradient(135deg, var(--accent-orange), #fbbf24)' }}>
            ⭐
          </div>
          <div className="stat-info">
            <h3>{promedioCalificacion}/5</h3>
            <p>Promedio Rating</p>
          </div>
        </div>
      </div>

      {/* Sección de Detalles */}
      <div className="estadisticas-detalles">
        <div className="detalle-card fade-in" style={{ animationDelay: '0.7s' }}>
          <h3>📊 Género Favorito</h3>
          <div className="detalle-contenido">
            <span className="detalle-highlight">{generoFavorito}</span>
            <p>con {generos[generoFavorito] || 0} juegos</p>
          </div>
        </div>

        <div className="detalle-card fade-in" style={{ animationDelay: '0.8s' }}>
          <h3>👍 Recomendaciones</h3>
          <div className="detalle-contenido">
            <span className="detalle-highlight">{juegosRecomendados}</span>
            <p>de {totalReseñas} juegos</p>
          </div>
        </div>

        <div className="detalle-card fade-in" style={{ animationDelay: '0.9s' }}>
          <h3>🎯 Plataformas</h3>
          <div className="plataformas-lista">
            {Object.entries(plataformas).map(([plat, cant]) => (
              <div key={plat} className="plataforma-item">
                <span>{plat}</span>
                <span className="plataforma-count">{cant}</span>
              </div>
            ))}
            {Object.keys(plataformas).length === 0 && (
              <p className="texto-vacio">No hay plataformas registradas</p>
            )}
          </div>
        </div>
      </div>

      {/* Progreso de Completados */}
      {totalJuegos > 0 && (
        <div className="progreso-section fade-in" style={{ animationDelay: '1s' }}>
          <h3>📈 Progreso de Completados</h3>
          <div className="progreso-bar-container">
            <div 
              className="progreso-bar"
              style={{ width: `${(juegosCompletados / totalJuegos) * 100}%` }}
            >
              <span className="progreso-texto">
                {Math.round((juegosCompletados / totalJuegos) * 100)}%
              </span>
            </div>
          </div>
          <p className="progreso-info">
            {juegosCompletados} de {totalJuegos} juegos completados
          </p>
        </div>
      )}
    </div>
  );
}

export default EstadisticasPersonales;