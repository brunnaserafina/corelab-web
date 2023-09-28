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
