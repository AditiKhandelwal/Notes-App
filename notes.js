const chalk = require("chalk")   // npm module to design output - to increase readability and to help in debugging
const fs = require("fs")         // module to use file system



const addNote = (title , body) =>{
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note)=> note.title === title) 
    // const duplicateNotes = notes.filter(function(note){
    //     return note.title === title
    // })
    const duplicateNote =  notes.find((note)=> note.title === title)  // filter function checks each and every note, find function stops when it finds
    
    if( duplicateNote=== undefined){   // if note with givent title not found than add a new note
        notes.push({
            title: title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added'))
    }
    else{
        console.log(chalk.red.inverse('Note title already taken'))
    }
    
}

const removeNote = (title)  =>{
    const notes = loadNotes()
    const notesToKeep = notes.filter((note)=> note.title !== title) // array of notes whose title are not mentioned to remove
    if(notes.length > notesToKeep.length){
        console.log(chalk.green.inverse('Note removed'))
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('No note found'))
    }
    
}

const readNote = (title)=>{
    const notes = loadNotes()
    //const noteToRead = notes.filter((note)=> note.title === title) // filter takes more time
    const noteToRead = notes.find((note)=> note.title === title)
    if(noteToRead){
        console.log(chalk.green.inverse('Title: ' + noteToRead.title))
        console.log(chalk.inverse('Note: ' + noteToRead.body))
    }
    else{
        console.log(chalk.red.inverse('Note title not found'))
    }
    
}

const listNote = ()=>{
    const notes = loadNotes()
    console.log(chalk.inverse('Your notes'))
    if(notes.length !== 0){
        for(var i =0;i<notes.length;i++){                                  // printing each note's title and body
            console.log(chalk.green.inverse('Title: ' + notes[i].title))
            console.log(chalk.green.inverse('Note: ' + notes[i].body))
        }
    }
    else{
        console.log(chalk.red.inverse('No Notes found'))
    }
      
 
}

// loading notes from file
const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json') // return in integer format
        const dataJSON = dataBuffer.toString()           // data is converted into string
        return JSON.parse(dataJSON)                      // string is parsed into json format for easy access
    }catch(e){
        return []
    }
    
}

//saving changes into the file
const saveNotes = (notes) =>{
    const dataJSON = JSON.stringify(notes)     // converting json format into string
    fs.writeFileSync('notes.json', dataJSON)   // writing into file
}

// functions are exported so that they can be used outside this file
module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    readNote : readNote,
    listNode : listNote
}