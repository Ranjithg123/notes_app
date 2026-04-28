// API helper for communicating with Django backend
const API_BASE = '/api';

const api = {
  // Get all notes
  getNotes: async () => {
    const response = await fetch(`${API_BASE}/notes/`);
    if (!response.ok) throw new Error('Failed to fetch notes');
    return response.json();
  },

  // Get a single note by ID
  getNote: async (id) => {
    const response = await fetch(`${API_BASE}/notes/${id}/`);
    if (!response.ok) throw new Error('Failed to fetch note');
    return response.json();
  },

  // Create a new note
  createNote: async (noteData) => {
    const response = await fetch(`${API_BASE}/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) throw new Error('Failed to create note');
    return response.json();
  },

  // Update a note
  updateNote: async (id, noteData) => {
    const response = await fetch(`${API_BASE}/notes/${id}/`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(noteData),
    });
    if (!response.ok) throw new Error('Failed to update note');
    return response.json();
  },

  // Delete a note
  deleteNote: async (id) => {
    const response = await fetch(`${API_BASE}/notes/${id}/`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete note');
    return true;
  },
};

export default api;
