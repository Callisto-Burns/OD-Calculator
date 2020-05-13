const Step = require('./js/step') // "./" refers to the directory in which the index.html is placed
const lengthBox = document.querySelector('#length')
const smallDiameterBox = document.querySelector('#smallDiameter')
const bigDiameterBox = document.querySelector('#bigDiameter')
const angleBox = document.querySelector('#angle')
const clearButton = document.querySelector('#clearButton')
const helpButton = document.querySelector('#helpButton')
const L_clearButton = document.querySelector('#L_clearButton')
const D_clearButton = document.querySelector('#D_clearButton')
const d_clearButton = document.querySelector('#d_clearButton')
const T_clearButton = document.querySelector('#T_clearButton')
const submitButton = document.querySelector('#submitButton')
const electron = require('electron')
const {ipcRenderer} = electron

var step = new Step()
var answerBox = null

/* Grouping of input fields for simple indexing */
const menuInputs = [
    lengthBox,
    bigDiameterBox,
    smallDiameterBox,
    angleBox
]

/* Keyboard Listener */
var isSecondEnter = false
window.addEventListener('keydown', (event) => {
    if (document.activeElement.className.includes('input-numeric')){
        switch(event.keyCode){
            case 13: //Enter key pressed
                submit()
                menuInputs.forEach(element => {
                    validateContents(element)
                })
                if (document.activeElement == answerBox) break
                if (answerBox){
                    if (!isSecondEnter){
                        isSecondEnter = !isSecondEnter
                        break
                    }
                    isSecondEnter = !isSecondEnter
                }
                focusNext(document.activeElement, menuInputs)
                break;
            case 38: //Up arrow key pressed
                focusPrevious(document.activeElement, menuInputs)
                break;
            case 40: //Down arrow key pressed
                focusNext(document.activeElement, menuInputs)
            break;
        }
    }     
})

/* Event listeners for each of the input objects (text boxes) */
document.addEventListener('input', (event) => {
    if (event.target.className.includes('input-numeric')) {
        event.target.value = event.target.value.split(' ').join('')
    }
    menuInputs.forEach(element => {
        validateContents(element)
    })
    answerBox = null
})
document.addEventListener('focusin', (event) => {
    if (event.target.className.includes('input-numeric')) {
        //event.target.select() //highlight with cursor the contents of textbox 
        if (event.target != answerBox) {
            answerBox = null
        }
        menuInputs.forEach(element => {
            validateContents(element)
        })
    }
})
document.addEventListener('focusout', (event) => {
    if (event.target.className.includes('input-numeric')) {
        if (event.target == answerBox){
            answerBox = null //remove green color when deselecting answer box
        }
        menuInputs.forEach(element => {
            validateContents(element)
        })
    }
})

/* Refresh-button listener */
clearButton.addEventListener('click', (event) => {
    clearTextBoxes()
    step.reset()
})

/* Individual clear-button listeners */
L_clearButton.addEventListener('click', (event) => {
    step.reset()
    lengthBox.value = null
})
D_clearButton.addEventListener('click', (event) => {
    step.reset()
    bigDiameterBox.value = null
})
d_clearButton.addEventListener('click', (event) => {
    step.reset()
    smallDiameterBox.value = null
})
T_clearButton.addEventListener('click', (event) => {
    step.reset()
    angleBox.value = null
})

/* Open help dialogue */
helpButton.addEventListener('click', () => {
    if(!ipcRenderer.sendSync('is-help-open')){ // Only open if there is no other help dialogue currently open
        ipcRenderer.send('show-help-dialogue')
    }
})

/* Handles text coloring for text boxes based on validity of the input */
function validateContents(input){
    if (isNaN(input.value)) {
        input.style.color = "red"
    }
    else {
        input.style.color = "#9F9F9F"
    }
    if(answerBox){
        answerBox.style.color = "green"
    }
}

/* Shift the focus (current selection) to the next one in a given array of objects so long as the current one resides somewhere 
in it also. Possible exception behavior could be focusing the first in the list */
function focusNext(activeElement, collection){
     for (var i = 0; i < collection.length; i++){
         if (activeElement == collection[i]) {
             if ((i + 1) < (collection.length)) {
                 collection[i+1].focus()
             }
             else {
                 collection[0].focus()
             }
             break
         }
     }
 }
 /* Shifts focus to the previous object in an array */
 function focusPrevious(activeElement, collection){
    for (var i = 0; i < collection.length; i++){
        if (activeElement == collection[i]) {
            if ((i - 1) >= 0) {
                collection[i-1].focus()
            }
            else {
                collection[collection.length - 1].focus()
            }
            break
        }
    }
}

/* Empties the contents of each of the text boxes on the window */
function clearTextBoxes(){
    menuInputs.forEach(element => {
        element.value = null
    })
}

/* Test contents of inputs and trigger calculation */
function submit(){
    let validInputs = 0
    menuInputs.forEach(element => {
        let id = element.getAttribute('id')
        if (isNaN(element.value) || (element.value == "") || (element.value == null) || (element.value == undefined)) {
            step[id] = undefined
        }
        else if (element.value == 0) {
            step[id] = undefined
        }
        else {
            validInputs++
            if (validInputs <= 3) step[id] = element.value
        }
    })
    if (validInputs == 3){
        step.update()
    }
}

step.on('calculate', (calculatedValue, result) => {
    document.getElementById(calculatedValue).value = result
    answerBox = document.getElementById(calculatedValue)
})








