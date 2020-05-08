class FillPatterns{
    static crossHatching(lineSpacing, backgroundColor, lineColor){

        // create the off-screen canvas
        var patternCanvas = document.createElement("canvas");
        patternCanvas.width = lineSpacing;
        patternCanvas.height = lineSpacing;
        var ctx = patternCanvas.getContext("2d");

        // draw pattern to offscreen canvas
        ctx.beginPath();
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0,0,lineSpacing,lineSpacing)
        ctx.strokeStyle = lineColor
        ctx.lineWidth = 0.4
        ctx.moveTo(0,lineSpacing)
        ctx.lineTo(lineSpacing,0)
        ctx.stroke();

        return patternCanvas
    }
} module.exports = FillPatterns