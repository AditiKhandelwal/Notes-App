const yargs = require('yargs')       // for parsing - npm module
const chalk = require('chalk')       // npm module to design output
const notes = require('./notes.js') // This file contains all the functions
const { argv } = require('yargs')


console.log(yargs.argv)
//Customizing yargs version
yargs.version('1.1.0')

//Creating add command -  Add note with given title and body in command line
yargs.command({
    command: 'add',
    describe : 'Add a new note',
    builder: {                              // property to get data from command line
        title:{                             // for add command , title property
             describe: 'Title of Note',     
             demandOption: true,            // title is required for add command
             type: 'string'                 // if value not given to title, boolean value true is returned so string type is set
        },
        body:{
            describe: 'Text to write in note',
            demandOption: true,            // body is required for add command
            type: 'string'
        }
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
        
    }

})

//Creating remove command -  Remove note of particular title
yargs.command({
    command: 'remove',
    describe : 'Remove a note',
    builder: {                 
        title:{                             // for remove command , title property
             describe: 'Title of Note',     
             demandOption: true,            // title is required for add command
             type: 'string'                 // if value not given to title, boolean value true is returned so string type is set
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }

})

//Creating read command - Reads note of particular title
yargs.command({
    command: 'read',
    describe : 'Reading a note',
    builder: {                              // property to get data from command line
        title:{                             // for read command , title property
             describe: 'Title of Note',     
             demandOption: true,            // title is required for add command
             type: 'string'                 // if value not given to title, boolean value true is returned so string type is set
        }
    },
    handler(argv){
        notes.readNote(argv.title)         
    }

})

//Creating list command - It will list all the notes
yargs.command({
    command: 'list',
    describe : 'List of notes',
    handler(){                             // this function will execute when list command is given in command line
       notes.listNode()
    }

})

// This function required to parse the output of process.argv
 yargs.parse()