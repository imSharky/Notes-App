// const fs = require('fs')  //fs-file system module
// //fs.writeFileSync('notes.txt','this file was created by node.js')

// fs.appendFileSync('notes.txt',' by sharik') 
// const firstname = require('./utils.js')    
// console.log(firstname)   //module.exports=name in utils.js file & there something assigned to this variable like const name = 'sharik'


// const add = require('./utils.js') 
// const sum = add(4,-2)
// console.log(sum)


// const validator = require('validator')
// const getNotes = require('./notes.js')
// const msg = getNotes()
// console.log(msg)
// console.log(validator.isEmail('andshary@exampr.com'))
// console.log(validator.isURL('https://mead.io'))

// const chalk = require('chalk')
// const getNotes = require('./notes.js')
// const msg = getNotes()
// console.log(msg)
// const greenMsg = chalk.blue.bold('success!') //print success in green & bold
// const greenMsg = chalk.blue.inverse.bold('success!')
// console.log(greenMsg)  // console.log(chalk.blue('hello world'))


// const chalk = require('chalk')
// console.log(process.argv) //argv-argument vector just array that nodejs provided
// const command = process.argv[2]
// if (command === 'add'){
//     console.log('this is added')
// }
// else if (command === 'remove'){
//     console.log('this is removed')
// }

const chalk = require('chalk')
//const { demandOption } = require('yargs')
const yargs = require('yargs')
const notes = require('./notes.js')
//const getNotes = require('./notes.js')
const Notes = require('./notes.js')
//customise yargs version
yargs.version('1.1.0')
//add, remove, read, list

//create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: 'true',
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: 'true',
            type: 'string'
        }
    },
    // handler: function() {   
    //     console.log("adding a note")
    // }
    handler(argv){   //handler: function(argv)
        notes.addNote(argv.title, argv.body)
    }
})
//create remove command
yargs.command({
    command: 'remove',
    describe: 'remove a note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
//create list command
yargs.command({
    command: 'list',
    describe: 'List your note',
    handler(){
        notes.listNotes()    //console.log('List out all note')
    }
})
//create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})

yargs.parse()         //console.log(yargs.argv) it print two times