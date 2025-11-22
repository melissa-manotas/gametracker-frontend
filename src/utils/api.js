// URL base de tu API backend
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// ========== FUNCIONES PARA JUEGOS ==========

export const obtenerJuegos = async () => {
  try {
    const response = await fetch(`${API_URL}/juegos`);
    if (!response.ok) throw new Error('Error al obtener juegos');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const obtenerJuegoPorId = async (id) => {
  try {
    const response = await fetch(`${API_URL}/juegos/${id}`);
    if (!response.ok) throw new Error('Error al obtener juego');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const crearJuego = async (juegoData) => {
  try {
    const response = await fetch(`${API_URL}/juegos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(juegoData),
    });
    if (!response.ok) throw new Error('Error al crear juego');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const actualizarJuego = async (id, juegoData) => {
  try {
    const response = await fetch(`${API_URL}/juegos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(juegoData),
    });
    if (!response.ok) throw new Error('Error al actualizar juego');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const eliminarJuego = async (id) => {
  try {
    const response = await fetch(`${API_URL}/juegos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar juego');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// ========== FUNCIONES PARA RESEÑAS ==========

export const obtenerReseñas = async () => {
  try {
    const response = await fetch(`${API_URL}/reseñas`);
    if (!response.ok) throw new Error('Error al obtener reseñas');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const obtenerReseñasPorJuego = async (juegoId) => {
  try {
    const response = await fetch(`${API_URL}/reseñas/juego/${juegoId}`);
    if (!response.ok) throw new Error('Error al obtener reseñas del juego');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const crearReseña = async (reseñaData) => {
  try {
    const response = await fetch(`${API_URL}/reseñas`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reseñaData),
    });
    if (!response.ok) throw new Error('Error al crear reseña');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const actualizarReseña = async (id, reseñaData) => {
  try {
    const response = await fetch(`${API_URL}/reseñas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reseñaData),
    });
    if (!response.ok) throw new Error('Error al actualizar reseña');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export const eliminarReseña = async (id) => {
  try {
    const response = await fetch(`${API_URL}/reseñas/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Error al eliminar reseña');
    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};