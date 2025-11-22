import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import ListaReseñas from './pages/ListaReseñas';
import EstadisticasPersonales from './components/EstadisticasPersonales';
import * as api from './utils/api';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('biblioteca');
  const [juegos, setJuegos] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [loading, setLoading] = useState(true);

  // ========== CARGAR DATOS AL INICIAR ==========
  
  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    try {
      setLoading(true);
      const [juegosData, reseñasData] = await Promise.all([
        api.obtenerJuegos(),
        api.obtenerReseñas()
      ]);
      setJuegos(juegosData);
      setReseñas(reseñasData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      alert('Error al conectar con el servidor. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  // ========== FUNCIONES CRUD PARA JUEGOS ==========
  
  const agregarJuego = async (nuevoJuego) => {
    try {
      const juegoCreado = await api.crearJuego(nuevoJuego);
      setJuegos([...juegos, juegoCreado]);
      console.log('✅ Juego agregado:', juegoCreado);
    } catch (error) {
      console.error('Error al agregar juego:', error);
      alert('Error al agregar el juego');
    }
  };

  const editarJuego = async (id, juegoActualizado) => {
    try {
      const juegoEditado = await api.actualizarJuego(id, juegoActualizado);
      setJuegos(juegos.map(juego => 
        juego._id === id ? juegoEditado : juego
      ));
      console.log('✅ Juego editado:', juegoEditado);
    } catch (error) {
      console.error('Error al editar juego:', error);
      alert('Error al editar el juego');
    }
  };

  const eliminarJuego = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      try {
        await api.eliminarJuego(id);
        setJuegos(juegos.filter(juego => juego._id !== id));
        // También eliminar reseñas asociadas
        setReseñas(reseñas.filter(reseña => reseña.juegoId !== id));
        console.log('✅ Juego eliminado:', id);
      } catch (error) {
        console.error('Error al eliminar juego:', error);
        alert('Error al eliminar el juego');
      }
    }
  };

  // ========== FUNCIONES CRUD PARA RESEÑAS ==========
  
  const agregarReseña = async (nuevaReseña) => {
    try {
      const reseñaCreada = await api.crearReseña(nuevaReseña);
      setReseñas([...reseñas, reseñaCreada]);
      console.log('✅ Reseña agregada:', reseñaCreada);
    } catch (error) {
      console.error('Error al agregar reseña:', error);
      alert('Error al agregar la reseña');
    }
  };

  const editarReseña = async (id, reseñaActualizada) => {
    try {
      const reseñaEditada = await api.actualizarReseña(id, reseñaActualizada);
      setReseñas(reseñas.map(reseña => 
        reseña._id === id ? reseñaEditada : reseña
      ));
      console.log('✅ Reseña editada:', reseñaEditada);
    } catch (error) {
      console.error('Error al editar reseña:', error);
      alert('Error al editar la reseña');
    }
  };

  const eliminarReseña = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      try {
        await api.eliminarReseña(id);
        setReseñas(reseñas.filter(reseña => reseña._id !== id));
        console.log('✅ Reseña eliminada:', id);
      } catch (error) {
        console.error('Error al eliminar reseña:', error);
        alert('Error al eliminar la reseña');
      }
    }
  };

  // ========== RENDERIZAR PÁGINA ACTUAL ==========
  
  const renderizarPagina = () => {
    if (loading) {
      return (
        <div className="loading">
          <div>🎮 Cargando datos...</div>
        </div>
      );
    }

    switch(currentPage) {
      case 'biblioteca':
        return (
          <BibliotecaJuegos
            juegos={juegos}
            onAgregarJuego={agregarJuego}
            onEditarJuego={editarJuego}
            onEliminarJuego={eliminarJuego}
          />
        );
      case 'reseñas':
        return (
          <ListaReseñas
            reseñas={reseñas}
            juegos={juegos}
            onAgregarReseña={agregarReseña}
            onEditarReseña={editarReseña}
            onEliminarReseña={eliminarReseña}
          />
        );
      case 'estadisticas':
        return (
          <EstadisticasPersonales
            juegos={juegos}
            reseñas={reseñas}
          />
        );
      default:
        return <BibliotecaJuegos juegos={juegos} />;
    }
  };

  return (
    <div className="App">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="main-section">
        <div className="container">
          {renderizarPagina()}
        </div>
      </main>
      
      <footer style={{ 
        textAlign: 'center', 
        padding: '2rem', 
        color: 'var(--text-secondary)',
        borderTop: '1px solid rgba(167, 139, 250, 0.2)',
        marginTop: '4rem'
      }}>
        <p>🎮 GameTracker - Tu biblioteca personal de videojuegos</p>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>
          Desarrollado por Melissa Manotas © 2025
        </p>
      </footer>
    </div>
  );
}

export default App;