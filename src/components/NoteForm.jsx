import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const NoteForm = ({ handleAddNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim() || !content.trim()) return;
    const newNote = { id: Date.now(), title, content };
    handleAddNote(newNote);
    setTitle('');
    setContent('');
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="form-container">
      <Link to="/" className="btn-back" id="form-back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"/>
          <polyline points="12,19 5,12 12,5"/>
        </svg>
        Back to all notes
      </Link>

      <div className="page-header">
        <h1>
          Create <span className="header-accent">Note</span>
        </h1>
        <p>Capture a new thought or idea</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleSubmit} id="note-form">
          <div className="form-group">
            <label className="form-label" htmlFor="note-title">Title</label>
            <input
              id="note-title"
              type="text"
              className="form-input"
              placeholder="Give your note a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="note-content">Content</label>
            <textarea
              id="note-content"
              className="form-textarea"
              placeholder="Write your thoughts here..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <p className="form-hint">
              {content.length > 0
                ? `${content.split(' ').filter(Boolean).length} words`
                : 'Start typing...'}
            </p>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary" id="submit-note">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20,6 9,17 4,12"/>
              </svg>
              Save Note
            </button>
            <button type="button" className="btn btn-ghost" onClick={handleCancel} id="cancel-note">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
