import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import Notecard from '../components/Notecard';

const Home = () => {
    const [isModalOpen, setModalOpen] = useState(false)
    const [filterNote, setFilterNote] = useState([])
    const [notes, setNotes] = useState([])
    const [currentNote, setCurrentNote] = useState(null)
    const [query, setquery] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        fetchNotes();
    }, [])

    useEffect(() => {
        setFilterNote(
            notes.filter((note) =>
                note.title.toLowerCase().includes(query.toLowerCase()) ||
                note.description.toLowerCase().includes(query.toLowerCase())
            )
        )
    }, [query, notes])

    const fetchNotes = async () => {
        try {
            const { data } = await axios.get("http://localhost:5000/note", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setNotes(data.notes)
        } catch (error) {
            console.log(error);
        }
    }

    const closeModal = () => {
        setModalOpen(false)
    }

    const onEdit = (note) => {
        setCurrentNote(note)
        setModalOpen(true)
    }

    const deleteNote = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/note/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
            console.log(response);
            if (response.data.success) {
                toast.success("note deleted")
                fetchNotes();
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addNote = async (title, description) => {
        try {
            const response = await axios.post('http://localhost:5000/note/add',
                { title, description }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response);
            if (response.data.success) {
                navigate('/')
                fetchNotes();
                closeModal()
                toast.success("note added")
            }
        } catch (error) {
            console.log(error);
        }
    }

    const editNote = async (id, title, description) => {
        try {
            const response = await axios.put(`http://localhost:5000/note/${id}`,
                { title, description }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(response);
            if (response.data.success) {
                navigate('/')
                fetchNotes();
                closeModal()
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='bg-gray-100 min-h-screen'>
            <Navbar setquery={setquery} />
            <div className='px-8 pt-4 grid grid-cols-1 md:grid-cols-3 gap-6'>
                {filterNote.length > 0 ? filterNote.map(note => (
                    <Notecard note={note} onEdit={onEdit} deleteNote={deleteNote} />
                )) : <p>No notes</p>}
            </div>
            <button
                onClick={() => setModalOpen(true)}
                className='fixed right-4 bottom-4 text-2xl bg-teal-500 text-white font-bold p-4 rounded-full'>
                +
            </button>
            {isModalOpen && <NoteModal closeModal={closeModal} addNote={addNote} currentNote={currentNote} editNote={editNote} />}
        </div>
    )
}

export default Home