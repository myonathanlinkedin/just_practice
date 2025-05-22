import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface NoteDto {
  id: number;
  info1: string;
  info2: string;
}

export interface NoteCreateDto {
  info1: string;
  info2: string;
}

export interface NoteUpdateDto {
  info1: string;
  info2: string;
}

export const notesApi = createApi({
  reducerPath: 'notesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://localhost:7036/api/notes' }),
  tagTypes: ['Note'],
  endpoints: (builder) => ({
    getNotes: builder.query<NoteDto[], void>({
      query: () => '',
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Note' as const, id })), { type: 'Note', id: 'LIST' }]
          : [{ type: 'Note', id: 'LIST' }],
    }),
    getNote: builder.query<NoteDto, number>({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: 'Note', id }],
    }),
    createNote: builder.mutation<NoteDto, NoteCreateDto>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    }),
    updateNote: builder.mutation<void, { id: number; data: NoteUpdateDto }>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Note', id }],
    }),
    deleteNote: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Note', id }, { type: 'Note', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApi; 