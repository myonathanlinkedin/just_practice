import React, { useMemo } from 'react';
import { Grid, CircularProgress, Box, Typography, Container, Fab } from '@mui/material';
import NoteCard from './NoteCard';
import NoteForm from './NoteForm';
import AddIcon from '@mui/icons-material/Add';
import { useGetNotesQuery } from './notesApi';
import { NoteDto } from './notesApi';

const pastelColors = [
  '#e3d7fc', // light purple
  '#d0f5ee', // light teal
  '#ffe6c7', // light peach
  '#f9e2e7', // light pink
  '#fdf6b2', // light yellow
  '#c7e9f7', // light blue
];

const NotesList: React.FC = () => {
  const { data: notes, isLoading, error } = useGetNotesQuery();
  const [editingNote, setEditingNote] = React.useState<NoteDto | null>(null);
  const [showForm, setShowForm] = React.useState(false);

  const handleAdd = () => setShowForm(true);
  const handleFormSuccess = () => setShowForm(false);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center">
        Error loading notes
      </Typography>
    );
  }

  return (
    <Container sx={{ px: 0, position: 'relative', minHeight: 400, maxWidth: '100%!important', ml: 0, pl: 0 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 3,
          alignItems: 'flex-start',
          justifyItems: 'start',
          width: '100%',
          m: 0,
          p: 0,
        }}
      >
        {notes?.map((note: NoteDto, idx: number) =>
          editingNote && editingNote.id === note.id ? (
            <NoteForm
              key={note.id}
              noteId={note.id}
              initialData={{ info1: note.info1, info2: note.info2 }}
              onSuccess={() => setEditingNote(null)}
            />
          ) : (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={setEditingNote}
              bgColor={pastelColors[idx % pastelColors.length]}
            />
          )
        )}
        {showForm && <NoteForm onSuccess={handleFormSuccess} />}
      </Box>
      <Fab 
        color="primary" 
        aria-label="add" 
        onClick={handleAdd}
        sx={{
          position: 'fixed',
          bottom: { xs: 32, sm: 48 },
          right: { xs: 32, sm: 64 },
          zIndex: 1201,
          boxShadow: '0 4px 16px 0 rgba(0,0,0,0.18)',
        }}
      >
        <AddIcon sx={{ fontSize: 32 }} />
      </Fab>
    </Container>
  );
};

export default NotesList; 