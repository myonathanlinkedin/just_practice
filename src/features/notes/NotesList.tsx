import React, { useState } from 'react';
import { Grid } from '@mui/material';
import { NoteDto } from '../../models/NoteDto';
import { NoteCard } from './NoteCard';
import { NoteForm } from './NoteForm';

const NotesList: React.FC = () => {
  const [notes, setNotes] = useState<NoteDto[]>([]);
  const [editingNote, setEditingNote] = useState<NoteDto | null>(null);

  return (
    <Grid container spacing={3} justifyContent="center">
      {notes?.map((note: NoteDto) => (
        <Grid key={note.id} item xs={12} sm={10} md={8}>
          <NoteCard note={note} onEdit={setEditingNote} />
        </Grid>
      ))}
      {editingNote && (
        <Grid item xs={12} sm={10} md={8}>
          <NoteForm
            noteId={editingNote.id}
            initialData={{ info1: editingNote.info1, info2: editingNote.info2 }}
            onSuccess={() => setEditingNote(null)}
          />
        </Grid>
      )}
    </Grid>
  );
};

export default NotesList; 