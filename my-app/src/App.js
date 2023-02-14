import { useState, useEffect } from 'react';
import NotesList from './components/NotesList';
import { nanoid } from 'nanoid';
import Search from './components/Search';
import Header from './components/Header';


const App = () => {

  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is a note",
      date: "14/01/2023"
    },

    {
      id: nanoid(),
      text: "This is another note",
      date: "02/02/2023"
    },

    {
      id: nanoid(),
      text: "This is a final note",
      date: "11/12/2022"
    },
    {
      id: nanoid(),
      text: "This is a final note",
      date: "11/12/2022"
    }
     

  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notesapp-data')
    );

    if(savedNotes) {
      setNotes(savedNotes);
    }

  }, [])

  useEffect(() => {
    localStorage.setItem(
      'notesapp-data',
       JSON.stringify(notes))

  }, [notes])

  const addNote = (text) => {
    const date = new Date();
    const newNote= {
      id: nanoid(),
      text: text,
      date: date.toLocaleDateString()
    }
    const newNotes = [...notes, newNote];
    setNotes(newNotes);


  }

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);

  }

  return (
    <div className={`${darkMode && 'dark-mode'}`}>

    <div className="container">
      <Header handleToggleDarkMode={setDarkMode}/>
      <Search handleSearchNote={setSearchText} />
      <NotesList 
      notes={notes.filter((note) => 
        note.text.toLowerCase().includes(searchText)
        )} 
      handleAddNote={addNote}
      handleDeleteNote={deleteNote}
      />
    </div>

  </div>
  )
}

export default App;
