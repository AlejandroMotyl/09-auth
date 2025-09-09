import type {Note} from '../../types/note';
import css from './NoteList.module.css';
import { useQueryClient,useMutation } from '@tanstack/react-query';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
      const queryClient = useQueryClient();
   const mutationDelete = useMutation({
    mutationFn:(id:string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: () => {} }
  )
  
    const  onDelete = (id: string) => {
      mutationDelete.mutate(id);
    }
  

    return (
<ul className={css.list}>
      {notes.map((note) => {
          const { id, title, content, tag } = note;
          return (
  <li className={css.listItem} key={id}>
    <h2 className={css.title}>{title}</h2>
    <p className={css.content}>{content}</p>
    <Link className={css.link} href={`/notes/${id}`}>View details</Link>
    <div className={css.footer}>
        <span className={css.tag}>{tag}</span>
        <button className={css.button} onClick={() => onDelete(id)}>Delete</button>
    </div>
  </li>
)
  })}
</ul>)
}