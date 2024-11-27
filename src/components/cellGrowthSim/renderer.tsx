import Grid from "./grid"
import { Settings } from "./constants"

class Renderer {
    prevFrameTime: number | null
    prevFrameId: number | null
    context: CanvasRenderingContext2D | null
    grid: Grid
    constructor(context: CanvasRenderingContext2D, grid: Grid) {
        this.prevFrameTime = null
        this.prevFrameId = null
        this.context = context
        this.grid = grid
    }
    animate(timestamp: number) {
        let deltaTime = Date.now() - this.prevFrameTime!
        this.grid.update(deltaTime)
        this.frame()
        this.prevFrameTime = Date.now()
        this.prevFrameId = requestAnimationFrame(this.animate.bind(this))
    }
    frame() {
        this.context!.clearRect(0, 0, Settings.WIDTH * Settings.CANVAS_SIZE_MULTIPLIER, Settings.HEIGHT * Settings.CANVAS_SIZE_MULTIPLIER)
        for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
            for (let x = Settings.Y_START; x < Settings.WIDTH; x++) {
                if (this.grid.cells[y][x]) {
                    let begin = x
                    while (x < Settings.WIDTH && this.grid.cells[y][x]) {
                        x++
                    }
                    this.context!.fillRect(begin * Settings.CANVAS_SIZE_MULTIPLIER, y * Settings.CANVAS_SIZE_MULTIPLIER, (x - begin) * Settings.CANVAS_SIZE_MULTIPLIER, Settings.CANVAS_SIZE_MULTIPLIER)
                }
            }
        }
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
        this.context!.clearRect(0, 0, Settings.WIDTH * Settings.CANVAS_SIZE_MULTIPLIER, Settings.HEIGHT * Settings.CANVAS_SIZE_MULTIPLIER)
    }
}

export default Renderer