import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNote from "./components/Form/CreateNote";
import { useLocalStorage } from "./useLocalStorage";
import { Note, NoteData, RawNote, Tag } from "./types";
import { v4 } from "uuid";
import MainPage from "./components/MainPage";
import { useMemo } from "react";
import EditNote from "./components/Form/EditNote";
import NoteDetail from "./components/NoteDetail";
import Layout from "./components/Layout";

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  const noteWithTags = useMemo(
    () =>
      notes?.map((note) => ({
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      })),
    [notes, tags]
  );

  const addNote = ({ tags, ...data }: NoteData) => {
    setNotes((prev: Note[]) => {
      return [
        ...prev,
        {
          ...data,
          id: v4(),
          tagIds: tags?.map((tag) => tag.id),
        },
      ];
    });
  };

  const createTag = (tag: Tag) => {
    setTags((prev: Tag[]) => [...prev, tag]);
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    const updated = notes?.map((note) =>
      note.id === id
        ? { ...note, ...data, tagIds: tags.map((tag) => tag.id) }
        : note
    );
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage availableTags={tags} notes={noteWithTags} />}
        />
        <Route
          path="/new"
          element={
            <CreateNote
              onSubmit={addNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id" element={<Layout notes={noteWithTags} />}>
          <Route index element={<NoteDetail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={<EditNote onSubmit={updateNote} createTag={createTag} />}
            availabeTags={tags}
          />
        </Route>
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
