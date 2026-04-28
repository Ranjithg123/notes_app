import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NotesList from './components/NotesList';
import NoteDetail from './components/NoteDetail';
import NoteForm from './components/NoteForm';
import Nav from './components/Nav';
import api from './api';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch notes from Django API on mount
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await api.getNotes();
      setNotes(data);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleAddNote = async (noteData) => {
    try {
      const newNote = await api.createNote({
        note_title: noteData.title,
        note_content: noteData.content,
      });
      setNotes((prev) => [newNote, ...prev]);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await api.deleteNote(id);
      setNotes((prev) => prev.filter((note) => note.note_id !== id));
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <div className="app-container">
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <NotesList
              notes={notes}
              loading={loading}
              handleDeleteNote={handleDeleteNote}
            />
          }
        />
        <Route
          path="/notes/:id"
          element={
            <NoteDetail
              notes={notes}
              handleDeleteNote={handleDeleteNote}
            />
          }
        />
        <Route
          path="/new"
          element={<NoteForm handleAddNote={handleAddNote} />}
        />
      </Routes>
    </div>
  );
}

export default App;