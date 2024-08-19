import React, { createContext, useContext} from 'react';
import { useCollection, useQuery } from '@squidcloud/react';
import { NoteType } from '../types/note';

type NoteContextType = {
    notes: NoteType[];
    addNote: (title: string, text: string, endDate: string) => Promise<void>;
    updateNote: (note: NoteType) => Promise<void>;
    deleteNote: (id: string) => Promise<void>;
}
const NoteContext = createContext<NoteContextType>({
    notes: [],
    addNote: async () => {},
    updateNote: async () => {},
    deleteNote: async () => {},
});

export const NoteProvider: React.FC<{ children: React.ReactNode}> = ({ children }) => {
    const noteCollection = useCollection<NoteType>("notes");
    const { data: notes} = useQuery(noteCollection.query().dereference());

    const addNote = async (title: string, text: string, endDate: string) => {
        try {
            const noteId = crypto.randomUUID();
            await noteCollection.doc(noteId).insert({
                id: noteId,
                title,
                text,
                end_date: new Date(endDate),
                date_added: new Date(new Date().toISOString().split('T')[0]),
                is_done: false,
                sub_notes: []
            })
        } catch (error) {
          console.error('Failed to add note', error);
        }
      };

    const updateNote = async (note: NoteType) => {
        try {
            await noteCollection.doc(note.id).update(note);
        } catch (error) {
          console.error('Failed to update note', error);
        }
      };

    const deleteNote = async (id: string) => {
        try {
            await noteCollection.doc(id).delete();
        } catch (error) {
          console.error('Failed to delete note', error);
        }
      };
    
    return (
        <NoteContext.Provider value={{ notes, addNote, updateNote, deleteNote }}>
            {children}
        </NoteContext.Provider>
        )
}

export const useNotes = () => {
    const context = useContext(NoteContext);
    if (!context) {
      throw new Error('useNotes must be used within a NoteProvider');
    }
    return context;
};