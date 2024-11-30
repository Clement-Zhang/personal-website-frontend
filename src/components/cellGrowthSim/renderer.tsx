import Grid from "./grid"
import Tracker from "./tracker"
import { Settings, Graph } from "./constants"

class Renderer {
    prevFrameTime: number | null
    prevFrameId: number | null
    gridContext: CanvasRenderingContext2D | null
    trackerContext: CanvasRenderingContext2D | null
    grid: Grid
    tracker: Tracker
    constructor(gridContext: CanvasRenderingContext2D, grid: Grid, trackerContext: CanvasRenderingContext2D | null, tracker: Tracker) {
        this.prevFrameTime = null
        this.prevFrameId = null
        this.gridContext = gridContext
        this.trackerContext = trackerContext
        this.grid = grid
        this.tracker = tracker
    }
    animate(timestamp: number) {
        let deltaTime = Date.now() - this.prevFrameTime!
        this.grid.update(deltaTime)
        this.frame()
        this.prevFrameTime = Date.now()
        this.prevFrameId = requestAnimationFrame(this.animate.bind(this))
    }
    frame() {
        this.gridContext!.clearRect(Settings.X_START, Settings.Y_START, Settings.WIDTH * Settings.CANVAS_SIZE_MULTIPLIER, Settings.HEIGHT * Settings.CANVAS_SIZE_MULTIPLIER)
        for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
            for (let x = Settings.Y_START; x < Settings.WIDTH; x++) {
                if (this.grid.cells[y][x]) {
                    let begin = x
                    while (x < Settings.WIDTH && this.grid.cells[y][x]) {
                        x++
                    }
                    this.gridContext!.fillRect(begin * Settings.CANVAS_SIZE_MULTIPLIER, y * Settings.CANVAS_SIZE_MULTIPLIER, (x - begin) * Settings.CANVAS_SIZE_MULTIPLIER, Settings.CANVAS_SIZE_MULTIPLIER)
                }
            }
        }
        let [graph, extend, time, topCells] = this.tracker.gridData
        let leftBound = Graph.X_START + Graph.MARGIN + Graph.LINE_WIDTH
        let rightBound = Graph.WIDTH - Graph.ARROW_WIDTH
        let bottomBound = Graph.HEIGHT - Graph.MARGIN - Graph.LINE_WIDTH
        let topBound = Graph.Y_START + Graph.ARROW_WIDTH + Graph.LINE_WIDTH
        if (extend) {
            this.setGraph(time, topCells)
            for (let i = Graph.SINGLETON; i < graph.length; i++) {
                let datum = graph[i]
                let prevDatum = graph[i - 1]
                let x = datum[0] / time * (rightBound - leftBound) + leftBound
                let y = bottomBound - datum[1] / topCells * (bottomBound - topBound)
                let prevX = prevDatum[0] / time * (rightBound - leftBound) + leftBound
                let prevY = bottomBound - prevDatum[1] / topCells * (bottomBound - topBound)
                this.trackerContext!.beginPath()
                this.trackerContext!.moveTo(prevX, prevY)
                this.trackerContext!.lineTo(x, y)
                this.trackerContext!.stroke()
            }
        } else if (graph.length === Graph.SINGLETON) {
            let datum = graph[0]
            let x = datum[0] / time * (rightBound - leftBound) + leftBound
            let y = bottomBound - datum[1] / topCells * (bottomBound - topBound)
            this.trackerContext!.fillRect(x, y, Graph.LINE_WIDTH, Graph.LINE_WIDTH)
        } else if (graph.length > Graph.SINGLETON) {
            let datum = graph[graph.length - 1]
            let prevDatum = graph[graph.length - 2]
            this.line(leftBound, rightBound, bottomBound, topBound, time, topCells, datum, prevDatum)
        }
    }
    line(
        leftBound: number,
        rightBound: number,
        bottomBound: number,
        topBound: number,
        time: number,
        topCells: number,
        datum: [number, number],
        prevDatum: [number, number]
    ) {
        let x = datum[0] / time * (rightBound - leftBound) + leftBound
        let y = bottomBound - datum[1] / topCells * (bottomBound - topBound)
        let prevX = prevDatum[0] / time * (rightBound - leftBound) + leftBound
        let prevY = bottomBound - prevDatum[1] / topCells * (bottomBound - topBound)
        this.trackerContext!.beginPath()
        this.trackerContext!.moveTo(prevX, prevY)
        this.trackerContext!.lineTo(x, y)
        this.trackerContext!.stroke()
    }
    arrow(length: number) {
        let halfWidth = Math.ceil(Graph.ARROW_WIDTH / 2)
        this.trackerContext!.strokeStyle = Graph.ARROW_COLOUR
        this.trackerContext!.lineWidth = Graph.LINE_WIDTH
        this.trackerContext!.beginPath()
        this.trackerContext!.moveTo(Graph.ARROW_START, halfWidth)
        this.trackerContext!.lineTo(length, halfWidth)
        this.trackerContext!.lineTo(length - halfWidth, Graph.ARROW_START)
        this.trackerContext!.moveTo(length, halfWidth)
        this.trackerContext!.lineTo(length - halfWidth, Graph.ARROW_WIDTH)
        this.trackerContext!.moveTo(length - Graph.ARROW_WIDTH, Graph.ARROW_START)
        this.trackerContext!.lineTo(length - Graph.ARROW_WIDTH, Graph.ARROW_WIDTH)
        this.trackerContext!.stroke()
    }
    setGraph(time: number, topCells: number) {
        let xTitleLocation = Graph.WIDTH - Graph.X_TITLE_LOCATION
        let xUnit: string
        let yAdjust = 0
        if (time < Graph.MS_TO_S_THRESHOLD) {
            xUnit = "s"
            time /= Graph.MS_TO_S_CONVERSION
        } else {
            xUnit = "m"
            time /= Graph.MS_TO_M_CONVERSION
        }
        if (topCells >= Graph.Y_ADJUST_5_THRESHOLD) {
            yAdjust = Graph.Y_ADJUST_5
        } else if (topCells >= Graph.Y_ADJUST_4_THRESHOLD) {
            yAdjust = Graph.Y_ADJUST_4
        } else if (topCells >= Graph.Y_ADJUST_3_THRESHOLD) {
            yAdjust = Graph.Y_ADJUST_3
        }
        let yTitleLocation = -(Graph.Y_TITLE_LOCATION + yAdjust)
        let radian90 = -Math.PI / 2
        this.trackerContext!.clearRect(Graph.X_START, Graph.Y_START, Graph.WIDTH, Graph.HEIGHT)
        this.trackerContext!.translate(Graph.X_START, Graph.HEIGHT - Graph.MARGIN - Graph.ARROW_WIDTH)
        this.arrow(Graph.WIDTH)
        this.trackerContext!.translate(-Graph.X_START, -(Graph.HEIGHT - Graph.MARGIN - Graph.ARROW_WIDTH))
        this.trackerContext!.rotate(radian90)
        this.trackerContext!.translate(-Graph.HEIGHT, Graph.X_START + Graph.MARGIN)
        this.arrow(Graph.WIDTH)
        this.trackerContext!.translate(Graph.HEIGHT, -(Graph.X_START + Graph.MARGIN))
        this.trackerContext!.rotate(-radian90)
        this.trackerContext!.font = Graph.TITLE_SIZE + Graph.TITLE_FONT
        this.trackerContext!.fillStyle = Graph.TITLE_COLOUR
        this.trackerContext!.fillText("Time (" + xUnit + ")", xTitleLocation, Graph.HEIGHT)
        this.trackerContext!.fillText(time.toString(), xTitleLocation + Graph.X_BIGGEST_SPACE, Graph.HEIGHT)
        this.trackerContext!.fillText("0", Graph.X_START + Graph.ARROW_WIDTH, Graph.HEIGHT)
        this.trackerContext!.rotate(radian90)
        this.trackerContext!.fillText("Cells (Count)", yTitleLocation, Graph.Y_START + Graph.MARGIN)
        this.trackerContext!.fillText(topCells.toString(), yTitleLocation + Graph.Y_BIGGEST_SPACE, Graph.Y_START + Graph.MARGIN)
        this.trackerContext!.rotate(-radian90)
        this.trackerContext!.fillStyle = Graph.DATA_COLOUR
        this.trackerContext!.strokeStyle = Graph.DATA_COLOUR
    }
    play() {
        this.prevFrameTime = Date.now()
        this.prevFrameId = requestAnimationFrame(this.animate.bind(this))
    }
    pause() {
        cancelAnimationFrame(this.prevFrameId!)
    }
    reset() {
        cancelAnimationFrame(this.prevFrameId!)
        this.grid.clear()
        this.gridContext!.clearRect(0, 0, Settings.WIDTH * Settings.CANVAS_SIZE_MULTIPLIER, Settings.HEIGHT * Settings.CANVAS_SIZE_MULTIPLIER)
        this.tracker.clear()
        this.trackerContext!.clearRect(0, 0, Graph.WIDTH, Graph.HEIGHT)
        let [, , time, topCells] = this.tracker.gridData
        this.setGraph(time, topCells)
    }
}

export default Renderer