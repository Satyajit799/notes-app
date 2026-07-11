import { RiAddLargeLine } from "@remixicon/react";
import Card from "./Card";
import { useState, useEffect } from "react";
const Parent = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    setNotes((prev) => [
      ...prev,
      {
        id: Date.now(),
        title: "New Note",
        content: "Add details...",
        date: new Date().toLocaleDateString(),
        isEditing: true,
        isStarred: false,
      },
    ]);
  };

  const saveNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isEditing: false } : note,
      ),
    );
  };

  const editNote = (id) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, isEditing: true } : note,
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
    <div className="relative bg-linear-to-b from-sky-300 to-orange-100 min-h-screen w-full px-15 py-4 flex flex-col gap-10">
      <button
        onClick={addNote}
        className="fixed bottom-[10%] left-[50%] bg-pink-500 rounded-full p-4 z-50"
      >
        <RiAddLargeLine size={22} />
      </button>
      <div className="flex items-center justify-center mt-10">
        <h1 className="text-5xl font-medium">My Notes...</h1>
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
  );
};

export default Parent;
