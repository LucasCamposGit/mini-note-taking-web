export interface Note {
  id: number;
  text: string;
  parent_id: number;
  created_at: string;
  replies: Note[];
}