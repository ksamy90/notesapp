import uuid from "uuid";
import moment from "moment";

let notes = [];

// CRUD - create, read, update, delete
// read existing notes from localStorage
const getSavedNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

// save notes to localstorage
const saveNotes = function(notesData) {
  localStorage.setItem("notes", JSON.stringify(notesData));
};

// make notes available for import
const getNotes = () => {
  return notes;
};

// create note
const createNote = () => {
  const id = uuid();
  const timeStamp = moment().valueOf();
  notes.push({
    id: id,
    title: "",
    body: "",
    createdAt: timeStamp,
    updatedAt: timeStamp,
  });
  saveNotes(notes); // notes is stringified
};

// remove a note from the list
const removeNote = function(id) {
  const noteIndex = notes.findIndex(function(note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes(notes);
  }
};

// sort notes
function sortNotes(notes, sortBy) {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return 1;
      } else if (a.createdAt < b.createdAt) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byAlphabet") {
    return notes.sort((a, b) => {
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else {
        return 0;
      }
    });
  } else {
    return notes;
  }
}

// update note
const updateNote = (id, updates) => {
  const note = notes.find((note) => {
    return note.id === id;
  });

  if (!note) {
    return;
  }

  if (typeof updates.title === "string") {
    note.title = updates.title;
    note.updatedAt = moment().valueOf();
  }

  if (typeof updates.body === "string") {
    note.body = updates.body;
    note.updatedAt = moment().valueOf();
  }
  saveNotes(notes);
};

notes = getSavedNotes();

export { getNotes, createNote, removeNote, updateNote, sortNotes };
