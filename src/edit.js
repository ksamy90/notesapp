import { updateNote } from "./notes";
import { generateLastEdited, initializeEditPage } from "./views";

const titleElement = document.getElementById("noteTitle");
const bodyElement = document.getElementById("noteBody");
const dateElement = document.getElementById("lastEdited");
const noteId = location.hash.substring(1);

initializeEditPage(noteId);

titleElement.addEventListener("input", (e) => {
  const note = updateNote(noteId, {
    title: e.target.value,
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});

bodyElement.addEventListener("input", (e) => {
  const note = updateNote(noteId, {
    body: e.target.value,
  });
  dateElement.textContent = generateLastEdited(note.updatedAt);
});
