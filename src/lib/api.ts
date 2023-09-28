import axios from "axios";
import INote from "../types/INote";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export async function postNote(body: INote) {
  const promise = await api.post("/notes", body);
  return promise.data;
}