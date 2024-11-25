import Grid from "./grid"

class Renderer {
    prev_frame_time: number | null
    prev_frame_id: number | null
    ctx: CanvasRenderingContext2D | null
    grid: Grid
    constructor(ctx: CanvasRenderingContext2D, grid: Grid) {
        this.prev_frame_time = null
        this.prev_frame_id = null
        this.ctx = ctx
        this.grid = grid
    }
    animate(timestamp: number) {
        let delta_time = Date.now() - this.prev_frame_time!
        this.grid.update(delta_time)
        this.frame()
        this.prev_frame_time = Date.now()
        this.prev_frame_id = requestAnimationFrame(this.animate.bind(this))
    }
    frame() {
        this.ctx!.clearRect(0, 0, 400, 400)
        for (let y = 0; y < 200; y++) {
            for (let x = 0; x < 200; x++) {
                if (this.grid.cells[y][x]) {
                    let begin = x
                    while (x < 200 && this.grid.cells[y][x]) {
                        x++
                    }
                    this.ctx!.fillRect(begin * 2, y * 2, (x - begin) * 2, 2)
                }
            }
        }
    }
    play() {
        this.prev_frame_time = Date.now()
        this.prev_frame_id = requestAnimationFrame(this.animate.bind(this))
    }
    pause() {
        cancelAnimationFrame(this.prev_frame_id!)
    }
    reset() {
        cancelAnimationFrame(this.prev_frame_id!)
        this.grid.clear()
        this.ctx!.clearRect(0, 0, 400, 400)
    }
}

export default Renderer