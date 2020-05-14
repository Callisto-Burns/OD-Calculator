
const EventEmmitter = require('events')

class Step extends EventEmmitter{

    length
    smallDiameter
    bigDiameter
    angle

    constructor(){
        super()
    }

    reset () {
        this.length = undefined
        this.smallDiameter = undefined
        this.bigDiameter = undefined
        this.angle = undefined
    }

    update () {
        
        //Determine which variable needs to be calculated
        let decisionKey = 0
        if (this.bigDiameter) { 
            // decision: 15
            decisionKey += 1
        }
        if (this.smallDiameter){
            // decision: 13
            decisionKey += 3
        }
        if (this.angle){
            // decision: 11
            decisionKey += 5
        }
        if (this.length){
            // decision: 9
            decisionKey += 7
        }

        switch(decisionKey){
            case 15:
                //big diameter
                this.bigDiameter = Number.parseFloat(this.smallDiameter) + (2 * (Math.tan(this.angle * (Math.PI/180))) * this.length)
                this.emit('calculate', 'bigDiameter', Number.parseFloat(this.bigDiameter).toFixed(3))
                break;
            case 13:
                //small diameter
                this.smallDiameter = (this.bigDiameter - (this.length * 2 * Math.tan(this.angle * Math.PI / 180)))
                this.emit('calculate', 'smallDiameter', Number.parseFloat(this.smallDiameter).toFixed(3))
                break;
            case 11:
                //angle
                this.angle = ((180 / Math.PI) * Math.atan((this.bigDiameter - this.smallDiameter) / (this.length * 2)))
                this.emit('calculate', 'angle', Number.parseFloat(this.angle).toFixed(3))
                break;
            case 9:
                //length
                this.length = ((this.bigDiameter - this.smallDiameter) / (2 * Math.tan(this.angle * Math.PI / 180)))
                this.emit('calculate', 'length', Number.parseFloat(this.length).toFixed(3))
                break;
            default:
                console.log('default')
                break;
        }
    }

} module.exports = Step




