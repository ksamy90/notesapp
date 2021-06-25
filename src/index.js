import { setFilters } from "./filters";
import { createNote, getNotes } from "./notes";
import { renderNotes } from "./views";

renderNotes();

document.getElementById("createNote").addEventListener("click", (e) => {
  const id = createNote();
  location.assign(`/edit.html#${id}`);
});

document.getElementById("searchText").addEventListener("input", (e) => {
  setFilters({ searchText: e.target.value });
  renderNotes();
});

document.getElementById("filterBy").addEventListener("change", (e) => {
  setFilters({ sortBy: e.target.value });
  renderNotes();
});
