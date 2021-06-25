import { createNote, getNotes } from "./notes";
import { renderNotes } from "./views";

renderNotes();

document.getElementById("createNote").addEventListener("click", (e) => {
  const id = createNote();
  location.assign(`/edit.html#${id}`);
});
