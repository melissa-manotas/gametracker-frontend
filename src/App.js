import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BibliotecaJuegos from './pages/BibliotecaJuegos';
import ListaReseñas from './pages/ListaReseñas';
import EstadisticasPersonales from './components/EstadisticasPersonales';
import './App.css';

function App() {
  // Estado para la página actual
  const [currentPage, setCurrentPage] = useState('biblioteca');

  // ========== DATOS DE EJEMPLO (Mock Data) ==========
  // Estos datos serán reemplazados por el backend más adelante
  
  const [juegos, setJuegos] = useState([
    {
      _id: '1',
      titulo: 'The Last of Us Part II',
      genero: 'Acción',
      plataforma: 'PlayStation 5',
      añoLanzamiento: 2020,
      desarrollador: 'Naughty Dog',
      imagenPortada: 'https://image.api.playstation.com/vulcan/ap/rnd/202010/2618/Y02ljdBodKFBX3SThOQQaSZc.png',
      descripcion: 'Una aventura épica de supervivencia en un mundo post-apocalíptico.',
      completado: true,
      fechaCreacion: new Date()
    },
    {
      _id: '2',
      titulo: 'God of War Ragnarök',
      genero: 'Aventura',
      plataforma: 'PlayStation 5',
      añoLanzamiento: 2022,
      desarrollador: 'Santa Monica Studio',
      imagenPortada: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png',
      descripcion: 'Kratos y Atreus buscan respuestas mientras se prepara el Ragnarök.',
      completado: false,
      fechaCreacion: new Date()
    },
    {
      _id: '3',
      titulo: 'Elden Ring',
      genero: 'RPG',
      plataforma: 'PC',
      añoLanzamiento: 2022,
      desarrollador: 'FromSoftware',
      imagenPortada: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png',
      descripcion: 'Un RPG de acción en un vasto mundo abierto creado por FromSoftware.',
      completado: true,
      fechaCreacion: new Date()
    }
  ]);

  const [reseñas, setReseñas] = useState([
    {
      _id: '1',
      juegoId: '1',
      puntuacion: 5,
      textoReseña: 'Una obra maestra absoluta. La narrativa, los gráficos y el gameplay son perfectos. Una experiencia emocional inolvidable que todo gamer debería experimentar.',
      horasJugadas: 25,
      dificultad: 'Normal',
      recomendaria: true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    },
    {
      _id: '2',
      juegoId: '3',
      puntuacion: 4,
      textoReseña: 'Un juego increíblemente desafiante con un mundo fascinante. La dificultad puede ser frustrante pero la satisfacción al vencer jefes es inmensa.',
      horasJugadas: 80,
      dificultad: 'Difícil',
      recomendaria: true,
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    }
  ]);

  // ========== FUNCIONES CRUD PARA JUEGOS ==========
  
  const agregarJuego = (nuevoJuego) => {
    const juegoConId = {
      ...nuevoJuego,
      _id: Date.now().toString(), // ID temporal
      fechaCreacion: new Date()
    };
    setJuegos([...juegos, juegoConId]);
    console.log('✅ Juego agregado:', juegoConId);
  };

  const editarJuego = (id, juegoActualizado) => {
    setJuegos(juegos.map(juego => 
      juego._id === id ? { ...juego, ...juegoActualizado } : juego
    ));
    console.log('✅ Juego editado:', id);
  };

  const eliminarJuego = (id) => {
    if (window.confirm('¿Estás seguro de eliminar este juego?')) {
      setJuegos(juegos.filter(juego => juego._id !== id));
      // También eliminar reseñas asociadas
      setReseñas(reseñas.filter(reseña => reseña.juegoId !== id));
      console.log('✅ Juego eliminado:', id);
    }
  };

  // ========== FUNCIONES CRUD PARA RESEÑAS ==========
  
  const agregarReseña = (nuevaReseña) => {
    const reseñaConId = {
      ...nuevaReseña,
      _id: Date.now().toString(), // ID temporal
      fechaCreacion: new Date(),
      fechaActualizacion: new Date()
    };
    setReseñas([...reseñas, reseñaConId]);
    console.log('✅ Reseña agregada:', reseñaConId);
  };

  const editarReseña = (id, reseñaActualizada) => {
    setReseñas(reseñas.map(reseña => 
      reseña._id === id 
        ? { ...reseña, ...reseñaActualizada, fechaActualizacion: new Date() } 
        : reseña
    ));
    console.log('✅ Reseña editada:', id);
  };

  const eliminarReseña = (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta reseña?')) {
      setReseñas(reseñas.filter(reseña => reseña._id !== id));
      console.log('✅ Reseña eliminada:', id);
    }
  };

  // ========== RENDERIZAR PÁGINA ACTUAL ==========
  
  const renderizarPagina = () => {
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
      
      {/* Footer opcional */}
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