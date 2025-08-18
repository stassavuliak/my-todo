import {useState} from 'react';

 function TodoItem ({text, id, onDelete, onEdit}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(text);

   // edit task
  const handleEditClick = () => {
    setEditedText(text);
    setIsEditing(true);
  }

  // save task
  const handleSaveClick = () => {
    const value = editedText.trim();
    if (!value) {
      setIsEditing(false);
      return;
    }
    if (value === text) {
      setIsEditing(false);
      return;
    }
    onEdit (id, value);
    setIsEditing(false);
  }

  return (
    <div>
      {isEditing 
        ? <>
            <input value={editedText} onChange={(e) => setEditedText(e.target.value)} autoFocus /> 
            <button onClick={handleSaveClick}>Save</button>
          </>
        : <>
            <span>{text}</span> 
            <button onClick={handleEditClick}>Edit</button>
          </>
      }
      
      
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  )
}

export default TodoItem;

