
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
                this.bigDiameter = ((2 * Math.tan(this.angle * Math.PI / 180) * this.length) + this.smallDiameter)
                this.emit('calculate', 'bigDiameter', this.bigDiameter.toFixed(3))
                break;
            case 13:
                //small diameter
                this.smallDiameter = (this.bigDiameter - (this.length * 2 * Math.tan(this.angle * Math.PI / 180)))
                this.emit('calculate', 'smallDiameter', this.smallDiameter.toFixed(3))
                break;
            case 11:
                //angle
                this.angle = ((180 / Math.PI) * Math.atan((this.bigDiameter - this.smallDiameter) / (this.length * 2)))
                this.emit('calculate', 'angle', this.angle.toFixed(3))
                break;
            case 9:
                //length
                this.length = ((this.bigDiameter - this.smallDiameter) / (2 * Math.tan(this.angle * Math.PI / 180)))
                this.emit('calculate', 'length', this.length.toFixed(3))
                break;
            default:
                console.log('default')
                break;
        }
    }

} module.exports = Step




