import { initializeEditPage } from "./views";

const titleElement = document.getElementById("noteTitle");
const bodyElement = document.getElementById("noteBody");
const noteId = location.hash.substring(1);

initializeEditPage(noteId);
