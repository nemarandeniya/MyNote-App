import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Notecard = ({ note, onEdit }) => {
    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="text-xl font-bold">{note.title}</div>
            <p>{note.description}</p>
            <div className="flex justify-end mt-2">
                <button className='text-blue-500 mr-2' onClick={() => onEdit(note)}>
                    <FaEdit />
                </button>
                <button className='text-red-500'>
                    <FaTrash />
                </button>
            </div>
        </div>
    )
}

export default Notecard