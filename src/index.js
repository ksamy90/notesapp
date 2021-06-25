import { createNote, getNotes } from "./notes";
import { renderNotes } from "./views";

const notes = getNotes();

renderNotes();
