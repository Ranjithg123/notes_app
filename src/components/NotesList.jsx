import React from 'react';
import { Link } from 'react-router-dom';

const NotesList = ({ notes, loading, handleDeleteNote }) => {
  const handleDelete = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    handleDeleteNote(id);
  };

  const getColorForIndex = (index) => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b', '#fa709a', '#fee140', '#a18cd1'];
    return colors[index % colors.length];
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
            <circle cx="12" cy="12" r="10"/>
            <polyline points="12,6 12,12 16,14"/>
          </svg>
        </div>
        <h3>Loading notes...</h3>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1>
          Your <span className="header-accent">Notes</span>
        </h1>
        <p>
          {notes.length > 0
            ? `You have ${notes.length} note${notes.length !== 1 ? 's' : ''}`
            : 'Start capturing your thoughts'}
        </p>
      </div>

      {notes.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--text-muted)' }}>
              <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
              <polyline points="14,2 14,8 20,8"/>
            </svg>
          </div>
          <h3>No notes yet</h3>
          <p>Create your first note and start organizing your ideas</p>
          <Link to="/new" className="btn btn-primary" id="create-first-note">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create First Note
          </Link>
        </div>
      ) : (
        <div className="notes-grid" id="notes-grid">
          {notes.map((note, index) => (
            <Link to={`/notes/${note.note_id}`} key={note.note_id} className="note-card" id={`note-card-${note.note_id}`}>
              <div className="note-card-header">
                <div className="note-card-icon" style={{ color: getColorForIndex(index) }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                </div>
              </div>
              <h3 className="note-card-title">{note.note_title}</h3>
              <p className="note-card-content">{note.note_content}</p>
              <div className="note-card-footer">
                <span className="note-card-date">{formatDate(note.created_on)}</span>
                <div className="note-card-actions">
                  <button
                    className="btn-danger"
                    onClick={(e) => handleDelete(note.note_id, e)}
                    id={`delete-note-${note.note_id}`}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px', verticalAlign: 'middle' }}>
                      <polyline points="3,6 5,6 21,6"/>
                      <path d="M19,6v14a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6m3,0V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2v2"/>
                    </svg>
                    Delete
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;
