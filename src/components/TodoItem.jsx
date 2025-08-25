import {useState} from 'react';
import { FaTrashCan, FaPen, FaFloppyDisk } from "react-icons/fa6";
import './TodoItem.scss';

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
    <div className='todo__item'>
      {isEditing 
        ? <>
            <input value={editedText} onChange={(e) => setEditedText(e.target.value)} autoFocus /> 
            <button className='todo__btn-save' onClick={handleSaveClick}><FaFloppyDisk /></button>
          </>
        : <>
            <span>{text}</span> 
            <button className='todo__btn-edit' onClick={handleEditClick}><FaPen /></button>
          </>
      }
      
      <button className='todo__btn-delete' onClick={() => onDelete(id)}><FaTrashCan /></button>
    </div>
  )
}

export default TodoItem;

