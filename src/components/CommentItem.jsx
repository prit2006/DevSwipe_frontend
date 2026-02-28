  import React, { useState } from "react";

  const CommentItem = ({ comment, onDelete, onEdit, isOwner }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(comment.text);

    const handleEdit = () => {
      if (editText.trim() && editText !== comment.text) {
        onEdit(comment._id, editText);
      }
      setIsEditing(false);
    };

    if (isEditing) {
      return (
        <div className="text-sm flex gap-2 items-start">
          <input
            className="input input-xs input-bordered flex-1"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") handleEdit();
              if (e.key === "Escape") setIsEditing(false);
            }}
          />
          <button onClick={handleEdit} className="btn btn-xs btn-primary">
            ✓
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="btn btn-xs btn-ghost"
          >
            ✕
          </button>
        </div>
      );
    }

    return (
      <div className="text-sm flex justify-between items-start group">
        <div>
         <span className="font-semibold text-primary">
         {comment.userId?.firstname || "User"} : 
        </span>
          <span className="text-base-content"> {comment.text}</span>
        </div>
        {isOwner && (
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
            <button
              onClick={() => setIsEditing(true)}
              className="text-primary text-xs hover:underline"
            >
              Edit
            </button>
            <button onClick={onDelete} className="text-error text-xs hover:underline">
              Delete
            </button>
          </div>
        )}
      </div>
    );
  };

  export default CommentItem;


// import React from "react";

// const CommentItem = ({ comment, onDelete, isOwner }) => {
//   return (
//     <div className="text-sm flex justify-between items-start group">
//       <div>
//         <span className="font-semibold text-primary">
//           {comment.userId.firstname}:
//         </span>{" "}
//         <span className="text-base-content">{comment.text}</span>
//       </div>
//       {isOwner && (
//         <button
//           onClick={onDelete}
//           className="opacity-0 group-hover:opacity-100 transition-opacity text-error text-xs"
//         >
//           ×
//         </button>
//       )}
//     </div>
//   );
// };

// export default CommentItem;


// import React from "react";

// const CommentItem = ({ comment }) => {
//   return (
//     <div className="text-sm">
//       <span className="font-semibold">
//         {comment.userId.firstname}:
//       </span>{" "}
//       {comment.text}
//     </div>
//   );
// };

// export default CommentItem;
