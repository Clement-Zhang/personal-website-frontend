import Cell from './cell'

class Grid {
    cells: (Cell | null)[][]
    constructor() {
        let tmp: (Cell | null)[][] = []
        for (let i = 0; i < 200; i++) {
            let row = []
            for (let i = 0; i < 200; i++) {
                row.push(null)
            }
            tmp.push(row)
        }
        this.cells = tmp
    }
    clear() {
        this.cells = this.cells.map(row => row.map(cell => null))
    }
    interact(
        e: React.MouseEvent<HTMLCanvasElement>,
        location: number[],
        lifetime: number,
        div_time: number,
        div_fail_rate: number
    ) {
        e.preventDefault()
        let x = Math.floor(location[0] / 2)
        let y = Math.floor(location[1] / 2)
        if (!this.cells[y][x]) {
            if (e.button === 0) {
                this.create_cell(x, y, lifetime, div_time, div_fail_rate)
            } else {
                this.delete_cell(x, y)
            }
        }
    }
    create_cell(x: number, y: number, lifetime: number, div_time: number, div_fail_rate: number) {
        this.cells[y][x] = new Cell(lifetime, div_time, div_fail_rate)
    }
    delete_cell(x: number, y: number) {
        this.cells[y][x] = null
    }
    update(delta_time: number) {
        for (let y = 0; y < 200; y++) {
            for (let x = 0; x < 200; x++) {
                if (this.cells[y][x]) {
                    let status = this.cells[y][x]!.update(delta_time)
                    if (status === "die") {
                        this.delete_cell(x, y)
                    } else if (status === "divide") {
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
                    }
                }
            }
        }
    }
}

export default Grid