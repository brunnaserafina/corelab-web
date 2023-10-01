import axios from "axios";
import INote from "../types/INote";

const api = axios.create({
  baseURL: "http://localhost:3333/api",
});

export async function postNote(body: INote) {
  const promise = await api.post("/notes", body);
  return promise.data;
}

export async function getOtherNotes() {
  const promise = await api.get("/notes");
  return promise.data;
}

export async function getFavoriteNotes() {
  const promise = await api.get("/favorites");
  return promise.data;
}

export async function deleteNote(id: string) {
  console.log(typeof id);
  const promise = await api.delete(`/notes/${String(id)}`);
  return promise;
}

export async function editColorNote(id: string, note: INote) {
  const promise = await api.put(`/notes/color/${id}`, { color: note.color });
  return promise;
}

export async function deleteFavorite(note_id: string) {
  const promise = await api.delete(`/favorites/${note_id}`);
  return promise;
}

export async function postFavorite(note_id: string) {
  const promise = await api.post(`/favorites/${note_id}`);
  return promise;
}

export async function editNote(body: INote) {
  const promise = await api.put("/notes", body);
  return promise.data;
}
