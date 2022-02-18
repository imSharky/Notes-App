//const { Console } = require('console')

// const getNotes = () => {   //const getNotes = function() {.....}
//     return 'Your Notes...'
// }
//module.exports = getNotes

const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=>note.title === title)
    const duplicateNote = notes.find((note)=>note.title === title)
    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title
    // })

    // console.log(duplicateNote)  //for debugging
    // console.log(title)
    //debugger //for debugger write in cmd node --inspect-break app.js add --titel..anyone which is taken for debug
    //& then in chrome write chrome://inspect page is oepn for debug for again debug write restart in cmd or for out press ctrl+c
    if (!duplicateNote) {   //if(duplicateNotes.length === 0)  if(duplicateNote=== undefined)
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    } else {
        console.log(chalk.red.inverse('Note title taken'))
    }   
}

const removeNote = (title) => {   //bcos it need only title to remove
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=>note.title !== title)
    // const notesToKeep = notes.filter( function(note) {
    //     return note.title != title
    // })
    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note Removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }  
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes'))
    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNotes()
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.inverse(note.title))
        console.log(note.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }    
}

module.exports = {
   // getNotes : getNotes,
    addNote : addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}