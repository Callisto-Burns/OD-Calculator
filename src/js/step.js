const FillPatterns = require('./fill-patterns')
const EventEmmitter = require('events')

class Step extends EventEmmitter{

    length
    smallDiameter
    bigDiameter
    angle

    constructor(){
        super()
        
        this.geometry = [[0,0],[0,20],[80,20],[80,0]]
    }

    reset () {
        this.length = undefined
        this.smallDiameter = undefined
        this.bigDiameter = undefined
        this.angle = undefined
        this.geometry = [[0,0],[0,20],[80,20],[80,0]]
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

        this.geometry = [
            [0,0],
            [0,this.smallDiameter/2],
            [(this.length * 2) + 20, this.smallDiameter/2],
            [(this.length * 3) + 20, this.bigDiameter/2],
            [(this.length* 5) + 40, this.bigDiameter/2],
            [(this.length * 5) + 40, 0]
        ]
    }

    /** draw the step on the context given by a render controller */
    draw(rend){

        let geometry = JSON.parse(JSON.stringify(this.geometry))
        //this.length ? rend.scale = rend.canvas.clientWidth / this.length / 50 : rend.scale = 3

        geometry.forEach(element => {
            element[0] = element[0] * rend.scale
            element[1] = element[1] * rend.scale
        })

        rend.ctx.setLineDash([])
        rend.ctx.strokeStyle = "white"
        rend.ctx.lineWidth = 2
        rend.ctx.beginPath()
        rend.ctx.moveTo(geometry[0][0] + rend.origin.x, geometry[0][1] + rend.origin.y)
        geometry.forEach(element => {
            rend.ctx.lineTo(element[0] + rend.origin.x, element[1] + rend.origin.y)
        })
        rend.ctx.moveTo(geometry[0][0] + rend.origin.x, geometry[0][1] + rend.origin.y)
        geometry.forEach(element => {
            rend.ctx.lineTo(element[0] + rend.origin.x, -element[1] + rend.origin.y)
        })
        rend.ctx.fillStyle = rend.ctx.createPattern(FillPatterns.crossHatching(15 ,"#9f9f9f", "white"), "repeat")
        rend.ctx.fill()
        rend.ctx.stroke()
    }
} module.exports = Step




