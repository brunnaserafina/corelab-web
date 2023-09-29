import axios from "axios";
import INote from "../types/INote";

const api = axios.create({
  baseURL: "http://localhost:3333",
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

export async function deleteNote(id: number) {
  const promise = await api.delete(`/notes/${id}`);
  return promise;
}

export async function editColorNote(id: number, note: INote) {
  const promise = await api.put(`/notes/${id}`, note);
  return promise;
}

export async function deleteFavorite(note_id: number) {
  const promise = await api.delete(`likes/${note_id}`);
  return promise;
}

export async function postFavorite(note_id: number) {
  const promise = await api.post("likes", { note_id });
  return promise;
}

export async function editNote(body: INote){
  const promise = await api.put(`/notes/${body.id}`, body);
  return promise.data;
}
