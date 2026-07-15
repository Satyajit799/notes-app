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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
      {notes.length === 0 && (
        <div className="col-span-full flex min-h-[12rem] items-center justify-center rounded-2xl border border-dashed border-slate-400/70 bg-white/50 p-6 text-center text-sm text-slate-700 sm:text-base">
          Add your first note to get started.
        </div>
      )}

      {notes.map((note) => (
        <div
          key={note.id}
          className="flex h-full min-h-[22rem] w-full max-w-[22rem] flex-col rounded-[1.5rem] bg-linear-to-b from-[#ca62da] to-[#ebe4e4] p-5 shadow-lg sm:max-w-none"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              {note.isEditing ? (
                <input
                  type="text"
                  value={note.title}
                  placeholder="Title"
                  autoFocus
                  onChange={(e) =>
                    setNotes((prev) =>
                      prev.map((item) =>
                        item.id === note.id
                          ? { ...item, title: e.target.value }
                          : item,
                      ),
                    )
                  }
                  className="w-full bg-transparent text-xl font-bold outline-none sm:text-2xl"
                />
              ) : (
                <h2 className="break-words text-xl font-bold sm:text-2xl">
                  {note.title}
                </h2>
              )}
            </div>
            {note.isEditing ? (
              <button onClick={() => saveNote(note.id)}>
                <RiCheckLine size={28} />
              </button>
            ) : (
              <button onClick={() => editNote(note.id)}>
                <RiPencilLine size={24} />
              </button>
            )}
          </div>

          <div className="mt-4 flex-1 text-left">
            {note.isEditing ? (
              <textarea
                value={note.content}
                placeholder="Add details..."
                onChange={(e) =>
                  setNotes((prev) =>
                    prev.map((item) =>
                      item.id === note.id
                        ? { ...item, content: e.target.value }
                        : item,
                    ),
                  )
                }
                className="h-full min-h-[10rem] w-full resize-none bg-transparent outline-none"
              />
            ) : (
              <p className="break-words text-sm leading-6 sm:text-base">
                {note.content}
              </p>
            )}
          </div>

          {!note.isEditing && (
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => toggleStar(note.id)}>
                {note.isStarred ? (
                  <RiStarFill color="rgba(240,187,64,1)" />
                ) : (
                  <RiStarLine color="rgba(240,187,64,1)" />
                )}
              </button>

              <button onClick={() => deleteNote(note.id)}>
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
