import React from 'react';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { NoteDto, useDeleteNoteMutation } from './notesApi';

interface NoteCardProps {
  note: NoteDto;
  onEdit: (note: NoteDto) => void;
  bgColor: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, bgColor }) => {
  const [deleteNote] = useDeleteNoteMutation();

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onEdit
    deleteNote(note.id);
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 6,
        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.08)',
        p: 2,
        width: 286,
        bgcolor: bgColor,
        cursor: 'pointer',
        transition: 'box-shadow 0.2s',
        '&:hover': {
          boxShadow: '0 4px 24px 0 rgba(0,0,0,0.16)',
        },
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        overflow: 'hidden',
        position: 'relative',
      }}
      onClick={() => onEdit(note)}
    >
      <IconButton
        aria-label="delete"
        size="small"
        onClick={handleDelete}
        sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1 }}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
      <CardContent sx={{ p: 0, width: '100%', height: '100%' }}>
        <Typography 
          variant="subtitle1" 
          fontWeight={700} 
          sx={{ mb: 1, color: '#222', fontSize: '1.1rem', wordBreak: 'break-word', whiteSpace: 'normal' }}
        >
          {note.info1}
        </Typography>
        <Typography 
          variant="body2" 
          sx={{ color: '#444', wordBreak: 'break-word', whiteSpace: 'normal' }}
        >
          {note.info2}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default NoteCard; 