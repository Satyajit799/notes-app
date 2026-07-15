import { RiAddLargeLine } from "@remixicon/react";
import Card from "./Card";
import { useState, useEffect } from "react";
const Parent = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const hasUnsavedDraft = notes.some((note) => note.isEditing);

  useEffect(() => {
    if (hasUnsavedDraft) return;
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes, hasUnsavedDraft]);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (hasUnsavedDraft) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedDraft]);

  const addNote = () => {
    if (hasUnsavedDraft) return;

    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "Untitled",
        content: "",
        date: new Date().toLocaleDateString(),
        isEditing: true,
        isNew: true,
        isStarred: false,
      },
    ]);
  };

  const saveNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isEditing: false, isNew: false } : note,
      ),
    );
  };

  const editNote = (id) => {
    if (hasUnsavedDraft) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isEditing: true, isNew: false } : note,
      ),
    );
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  const toggleStar = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? {
              ...note,
              isStarred: !note.isStarred,
            }
          : note,
      ),
    );
  };

  return (
    <div className="relative min-h-screen w-full bg-linear-to-b from-sky-300 to-orange-100 px-4 py-4 sm:px-6 lg:px-8 xl:px-10">
      <button
        onClick={addNote}
        disabled={hasUnsavedDraft}
        className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-pink-500 p-4 shadow-lg transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <RiAddLargeLine size={22} />
      </button>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:gap-8 lg:gap-10">
        <div className="mt-6 flex items-center justify-center sm:mt-8 lg:mt-10">
          <h1 className="text-3xl font-semibold sm:text-4xl lg:text-5xl">
            My Notes...
          </h1>
        </div>

        <Card
          notes={notes}
          setNotes={setNotes}
          saveNote={saveNote}
          editNote={editNote}
          deleteNote={deleteNote}
          toggleStar={toggleStar}
        />
      </div>
    </div>
  );
};

export default Parent;
