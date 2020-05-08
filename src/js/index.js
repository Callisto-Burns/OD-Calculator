const Step = require('./js/step') // "./" refers to the directory in which the index.html is placed
const RenderController = require('./js/render-controller')

const canvas = document.querySelector('.tool-render')
const lengthBox = document.querySelector('#length')
const smallDiameterBox = document.querySelector('#smallDiameter')
const bigDiameterBox = document.querySelector('#bigDiameter')
const angleBox = document.querySelector('#angle')
const clearButton = document.querySelector('#clearButton')
const renderContainer = document.querySelector('.render-container')

//const toolRenderController = new RenderController(canvas)

var step = new Step()
//toolRenderController.renderElements.push(step)

//Grouping of the sidebar input elements for indexing 
//Would like to make this less hacked together in the future, possibly pass the sidebar as an argument
//and group the children automatically
const sideBarInputs = [
    lengthBox,
    bigDiameterBox,
    smallDiameterBox,
    angleBox
]

/* Keyboard Listener */
document.addEventListener('keydown', (event) => {
    if (document.activeElement.className.includes('input-numeric')){
        switch(event.keyCode){
            case 13: //Enter key pressed
                submit()
                focusNext(document.activeElement, sideBarInputs)
                break;
            case 38: //Up arrow key pressed
                focusPrevious(document.activeElement, sideBarInputs)
                break;
            case 40: //Down arrow key pressed
                focusNext(document.activeElement, sideBarInputs)
            break;
        }
    }     
})

/* Event listeners for each of the input objects */
document.addEventListener('input', (event) => {
    if (event.target.className.includes('input-numeric')) {
        event.target.value = event.target.value.split(' ').join('')
    }
    sideBarInputs.forEach(element => {
        validateInput(element)
    })
})
document.addEventListener('focusin', (event) => {
    if (event.target.className.includes('input-numeric')) {
        event.target.select()
    }
})
document.addEventListener('focusout', (event) => {
    if (event.target.className.includes('input-numeric')) {

    }
})

/* Refresh button listener */
clearButton.addEventListener('click', (event) => {
    clearTextBoxes()
    step.reset()
})

/* Handles text highlighting for text boxes based on validity of the input */
function validateInput(input){
    if (isNaN(input.value)) {
        input.style.color = "red"
    }
    else {
        input.style.color = "#9F9F9F"
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
    sideBarInputs.forEach(element => {
        element.value = null
    })
}

/*  */
function submit(){
    let validInputs = 0
    sideBarInputs.forEach(element => {
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
    document.getElementById(calculatedValue).style.color = 'green'
})

/* Animation Loop for Tool Render */
/*
let timeZero = 0
function renderLoop(timeStamp){
    let deltaTime = timeStamp - timeZero
    timeZero = timeStamp

    toolRenderController.render()
    requestAnimationFrame(renderLoop)
}
requestAnimationFrame(renderLoop)*/





