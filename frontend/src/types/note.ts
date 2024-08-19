export type NoteType = {
    id: string;
    date_added: Date;
    end_date: Date;
    is_done: boolean;
    title: string;
    text: string;
    sub_notes: string[];
}