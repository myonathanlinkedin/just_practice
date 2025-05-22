import React, { useState } from 'react';
import { useCreateNoteMutation, useUpdateNoteMutation, NoteCreateDto, NoteUpdateDto } from './notesApi';
import { TextField, Button, Box, Typography, Card, CardContent, Divider } from '@mui/material';

interface NoteFormProps {
  noteId?: number;
  initialData?: NoteCreateDto;
  onSuccess?: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ noteId, initialData, onSuccess }) => {
  const [formData, setFormData] = useState<NoteCreateDto>(initialData || { info1: '', info2: '' });
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (noteId) {
        await updateNote({ id: noteId, data: formData as NoteUpdateDto }).unwrap();
      } else {
        await createNote(formData).unwrap();
      }
      onSuccess?.();
    } catch (error) {
      console.error('Failed to save note:', error);
    }
  };

  return (
    <Card sx={{ mt: 3, borderRadius: 3, boxShadow: '0 2px 12px 0 rgba(10,102,194,0.08)' }}>
      <Divider />
      <CardContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            {noteId ? 'Edit Note' : 'Create Note'}
          </Typography>
          <TextField
            fullWidth
            label="Info 1"
            name="info1"
            value={formData.info1}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Info 2"
            name="info2"
            value={formData.info2}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 1, px: 4, fontWeight: 600 }}>
              {noteId ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NoteForm; 