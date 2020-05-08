class RenderController {

    renderElements = [] // array of objects to be rendered each draw call
    scale = 3 // px per 'milimeter'
    gridSpacing = 5 // 'mm' per grid division
    origin = {
        x: null,
        y: null
    }

    constructor(canvas){
        this.canvas = canvas
        this.origin.x = Math.floor(canvas.clientWidth / 2) - 150
        this.origin.y = Math.floor(canvas.clientHeight / 2)
        this.ctx = canvas.getContext('2d')
    }

    render(){
        this.ctx.clearRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight)
        drawGrid(this.ctx, this.origin, this.gridSpacing, this.scale)
        drawAxis(this.ctx, this.origin)
        this.renderElements.forEach(element => {
            element.draw(this)
        })
    }
    
} module.exports = RenderController

function drawGrid(ctx, origin, gridSpacing, scale){
    gridSpacing = gridSpacing * scale
    ctx.setLineDash([]);
    ctx.strokeStyle = "#bfbfbf";
    ctx.lineWidth = 0.3;
    ctx.beginPath();
    var offsetX = origin.x - Math.floor(origin.x / gridSpacing) * gridSpacing;
    var offsetY = origin.y - Math.floor(origin.y / gridSpacing) * gridSpacing;
    for (var i = 0; i < Math.floor(canvas.width / gridSpacing); i++) {
        ctx.moveTo(i * gridSpacing + offsetX, 0);
        ctx.lineTo(i * gridSpacing + offsetX, canvas.height);
    }
    for (i = 0; i < Math.floor(canvas.height / gridSpacing); i++) {
        ctx.moveTo(0, i * gridSpacing + offsetY);
        ctx.lineTo(canvas.width, i * gridSpacing + offsetY);
    }
    ctx.stroke();
}

function drawAxis(ctx, origin){
  ctx.setLineDash([3, 2]);
  ctx.strokeStyle = "#bfbfbf";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(10, origin.y);
  ctx.lineTo(ctx.canvas.width - 10, origin.y);
  ctx.moveTo(origin.x, 10);
  ctx.lineTo(origin.x, ctx.canvas.height - 10);
  ctx.stroke();
}