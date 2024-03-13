export interface Notes {
  _id: string
  content: string
  author: string
  dateAdded: string
  authorSlug: string
}

export interface NoteResponse {
  results: Notes[]
}

export type NotesAction = 'delete' | 'add'
