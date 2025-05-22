import React from 'react';
import { Card, CardContent, Typography, IconButton, Box, Avatar, CardActions, Tooltip, useTheme } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NoteDto } from './notesApi';
import { useDeleteNoteMutation } from './notesApi';

interface NoteCardProps {
  note: NoteDto;
  onEdit: (note: NoteDto) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit }) => {
  const [deleteNote] = useDeleteNoteMutation();
  const theme = useTheme();

  const handleDelete = async () => {
    try {
      await deleteNote(note.id).unwrap();
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
  };

  return (
    <Card
      sx={{
        mb: 2,
        borderRadius: 3,
        bgcolor: '#fff', // Always white background
        boxShadow: theme.palette.mode === 'dark' 
          ? '0 4px 24px 0 rgba(0,0,0,0.2)'
          : '0 2px 12px 0 rgba(0,0,0,0.06)',
        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.palette.mode === 'dark'
            ? '0 8px 32px 0 rgba(0,0,0,0.3)'
            : '0 6px 20px 0 rgba(0,0,0,0.1)',
        },
        p: 1,
        minHeight: 160,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' 
          ? 'rgba(255,255,255,0.1)' 
          : 'rgba(0,0,0,0.08)',
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box display="flex" alignItems="center" mb={1}>
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: theme.palette.primary.main,
              fontWeight: 700, 
              mr: 2,
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
            }}
          >
            {note.info1?.charAt(0)?.toUpperCase() || 'N'}
          </Avatar>
          <Typography 
            variant="h6" 
            fontWeight={700} 
            sx={{
              color: '#1a2027', // Dark text for contrast on white background
              background: 'linear-gradient(45deg, #1a2027 30%, #2d3748 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 1px 2px rgba(0,0,0,0.1)',
            }}
            noWrap
          >
            {note.info1}
          </Typography>
        </Box>
        <Typography 
          variant="body1" 
          sx={{ 
            ml: 6, 
            minHeight: 40,
            color: '#4a5568', // Consistent dark gray text
            transition: 'all 0.2s',
          }}
        >
          {note.info2}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
        <Tooltip title="Edit">
          <IconButton 
            size="small" 
            onClick={() => onEdit(note)} 
            color="primary"
            sx={{
              '&:hover': {
                bgcolor: 'rgba(25, 118, 210, 0.08)',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete">
          <IconButton 
            size="small" 
            onClick={handleDelete} 
            color="error"
            sx={{
              '&:hover': {
                bgcolor: 'rgba(211,47,47,0.08)',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default NoteCard; 