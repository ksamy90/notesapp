import moment from "moment";
import { sortNotes, getNotes } from "./notes";
import { getFilters } from "./filters";

// generate the DOM structure for note
const generateNoteDOM = function(note) {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("p");
  const statusEl = document.createElement("p");

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "no title note";
  }
  textEl.classList.add("list-item__title");
  noteEl.appendChild(textEl);

  // link setup
  noteEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  // status message
  statusEl.textContent = generateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

// render notes
const renderNotes = function() {
  const notesEl = document.getElementById("notes");
  const filters = getFilters();
  const notesData = getNotes();
  const notes = sortNotes(notesData, filters.sortBy);
  const filteredNotes = notes.filter((note) => {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach(function(note) {
      const noteEl = generateNoteDOM(note);
      notesEl.appendChild(noteEl);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

// generate the last edit message
let generateLastEdited = function(timestamp) {
  return `Last edited ${moment(timestamp).fromNow()}`;
};

export { generateNoteDOM, renderNotes };
