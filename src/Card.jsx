import {
  RiPencilLine,
  RiStarFill,
  RiStarLine,
  RiDeleteBinLine,
  RiCheckLine,
} from "@remixicon/react";
const Card = ({
  notes,
  setNotes,
  saveNote,
  editNote,
  deleteNote,
  toggleStar,
}) => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {notes.map((notes) => (
        <div
          key={notes.id}
          className="h-90 w-80 gap-3 bg-linear-to-b from-[#ca62da] to-[#ebe4e4] rounded-3xl grid grid-rows-[auto_1fr] p-6"
        >
          <div className="flex justify-between">
            <div>
              {notes.isEditing ? (
                <input
                  type="text"
                  value={notes.title}
                  onChange={(e) =>
                    setNotes((prev) =>
                      prev.map((note) =>
                        note.id === notes.id
                          ? { ...note, title: e.target.value }
                          : note,
                      ),
                    )
                  }
                  className="bg-transparent outline-none w-60 text-2xl font-bold"
                />
              ) : (
                <h2 className="text-2xl font-bold">{notes.title}</h2>
              )}
            </div>
            {notes.isEditing ? (
              <button onClick={() => saveNote(notes.id)}>
                <RiCheckLine size={30} />
              </button>
            ) : (
              <button onClick={() => editNote(notes.id)}>
                <RiPencilLine size={25} />
              </button>
            )}
          </div>
          <div className="text-center h-full">
            {" "}
            {notes.isEditing ? (
              <textarea
                value={notes.content}
                onChange={(e) =>
                  setNotes((prev) =>
                    prev.map((note) =>
                      note.id === notes.id
                        ? { ...note, content: e.target.value }
                        : note,
                    ),
                  )
                }
                className="w-full h-full bg-transparent outline-none resize-none"
              />
            ) : (
              <p>{notes.content}</p>
            )}
          </div>
          {!notes.isEditing && (
            <div className="flex justify-end gap-3">
              <button onClick={() => toggleStar(notes.id)}>
                {notes.isStarred ? (
                  <RiStarFill color="rgba(240,187,64,1)" />
                ) : (
                  <RiStarLine color="rgba(240,187,64,1)" />
                )}
              </button>

              <button onClick={() => deleteNote(notes.id)}>
                <RiDeleteBinLine />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Card;
