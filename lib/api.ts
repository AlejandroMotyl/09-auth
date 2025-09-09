import axios from "axios"
import type { Note } from "@/types/note"

interface FetchResult{
    notes: Note[],
    totalPages: number,
}

interface headersParams{
    headers: {
        Authorization: string,
    }
}

interface FetchParams extends headersParams{
    params: {
        tag?:string
        page?: number,
        search?: string,
        perPage: number,
    }
}
interface CreateBody{
    title: string,
    content: string,
    tag:string,
}

export async function fetchNotes(keyWord?: string, page?: number, tag?: string): Promise<FetchResult>{

 tag = tag === "All" ? undefined : tag;

const fetchParams:FetchParams = {
    params: {
    tag:tag,
    page: page,
    search: keyWord,
    perPage: 9, 
  },
  headers: {
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
  }
}

const fetchResponse = await axios.get<FetchResult>('https://notehub-public.goit.study/api/notes', fetchParams)
return fetchResponse.data;
}

export async function createNote({ title, content, tag }:CreateBody): Promise<Note> {
    const createBody: CreateBody = {
        title: title,
        content: content,
        tag: tag,
    }

    const createResponse = await axios.post<Note>('https://notehub-public.goit.study/api/notes', createBody,  {headers: {Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`}})
    return createResponse.data;
}

export async function deleteNote(id: string):Promise<Note> {
    const deleteResponse = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`}})
    return deleteResponse.data;
}

export async function fetchNoteById (id: string):Promise<Note> {
    const fetchNoteByIdResponse = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
    { headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`}})
    return fetchNoteByIdResponse.data;
}