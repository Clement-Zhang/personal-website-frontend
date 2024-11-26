import Cell from './cell'

class Grid {
    cells: (Cell | null)[][]
    ctx: CanvasRenderingContext2D | undefined
    elapsed_time: number
    prev_frame_time: number | undefined
    prev_frame_id: number | undefined
    constructor() {
        this.cells = []
        for (let i = 0; i < 200; i++) {
            let row = []
            for (let i = 0; i < 200; i++) {
                row.push(null)
            }
            this.cells.push(row)
        }
        this.elapsed_time = 0
    }
    set_ctx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }
    play() {
        this.prev_frame_time = Date.now()
        this.prev_frame_id = requestAnimationFrame(this.frame.bind(this))
    }
    pause() {
        this.elapsed_time += Date.now() - this.prev_frame_time!
        cancelAnimationFrame(this.prev_frame_id!)
    }
    resume() {
        this.prev_frame_time = Date.now()
        this.prev_frame_id = requestAnimationFrame(this.frame.bind(this))
    }
    reset() {
        cancelAnimationFrame(this.prev_frame_id!)
        this.elapsed_time = 0
        this.cells = this.cells.map(row => row.map(cell => null))
        this.ctx!.clearRect(0, 0, 400, 400)
    }
    interact(
        e: React.MouseEvent<HTMLCanvasElement>,
        location: number[],
        lifetime: number,
        div_time: number,
        div_fail_rate: number
    ) {
        e.preventDefault()
        console.log(location)
        let x = Math.floor(location[0] / 2)
        let y = Math.floor(location[1] / 2)
        if (!this.cells[y][x]) {
            if (e.button === 0) {
                this.create_cell(x, y, lifetime, div_time, div_fail_rate)
                this.ctx!.fillRect(x * 2, y * 2, 2, 2)
            } else {
                this.delete_cell(x, y)
                this.ctx!.clearRect(x * 2, y * 2, 2, 2)
            }
        }
    }
    create_cell(x: number, y: number, lifetime: number, div_time: number, div_fail_rate: number) {
        this.cells[y][x] = new Cell(this.elapsed_time, lifetime, div_time, div_fail_rate)
    }
    delete_cell(x: number, y: number) {
        this.cells[y][x] = null
    }
    frame(timestamp: number) {
        this.elapsed_time += Date.now() - this.prev_frame_time!
        for (let y = 0; y < 200; y++) {
            for (let x = 0; x < 200; x++) {
                if (this.cells[y][x]) {
                    if (this.elapsed_time - this.cells[y][x]!.create_time >= this.cells[y][x]!.lifetime!) {
                        this.delete_cell(x, y)
                    } else if (Math.floor((this.elapsed_time - this.cells[y][x]!.create_time) / this.cells[y][x]!.div_time!) > this.cells[y][x]!.cycle && Math.random() > this.cells[y][x]!.div_fail_rate!) {
                        let squares = []
                        if (x > 0 && !this.cells[y][x - 1]) {
                            squares.push([x - 1, y])
                        }
                        if (x < 199 && !this.cells[y][x + 1]) {
                            squares.push([x + 1, y])
                        }
                        if (y > 0 && !this.cells[y - 1][x]) {
                            squares.push([x, y - 1])
                        }
                        if (y < 199 && !this.cells[y + 1][x]) {
                            squares.push([x, y + 1])
                        }
                        if (squares.length > 0) {
                            let [new_x, new_y] = squares[Math.floor(Math.random() * squares.length)]
                            this.create_cell(new_x, new_y, this.cells[y][x]!.lifetime!, this.cells[y][x]!.div_time!, this.cells[y][x]!.div_fail_rate!)
                        }
                        this.cells[y][x]!.cycle = Math.floor((this.elapsed_time - this.cells[y][x]!.create_time) / this.cells[y][x]!.div_time!)
                    }
                }
            }
        }
        this.ctx!.clearRect(0, 0, 400, 400)
        for (let y = 0; y < 200; y++) {
            for (let x = 0; x < 200; x++) {
                if (this.cells[y][x]) {
                    let begin = x
                    while (x < 200 && this.cells[y][x]) {
                        x++
                    }
                    this.ctx!.fillRect(begin * 2, y * 2, (x - begin) * 2, 2)
                }
            }
        }
        this.prev_frame_time = Date.now()
        this.prev_frame_id = requestAnimationFrame(this.frame.bind(this))
    }
}

export default Grid