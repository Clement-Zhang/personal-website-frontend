import Cell from './cell'
import { Settings, Directions } from './constants'

class Grid {
    cells: (Cell | null)[][]
    new_cells: { [key: string]: Cell }
    constructor() {
        this.cells = []
        for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
            let row = []
            for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
                row.push(null)
            }
            this.cells.push(row)
        }
        this.new_cells = {}
    }
    display() {
        for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
            for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
                if (this.cells[y][x]) {
                    console.log(x, y, this.cells[y][x]!.time)
                }
            }
        }
    }
    coordsToString(x: number, y: number) {
        return (y * Settings.WIDTH + x).toString()
    }
    stringToCoords(str: string) {
        let n = parseInt(str)
        return [n % Settings.WIDTH, Math.floor(n / Settings.WIDTH)]
    }
    clear() {
        this.cells = this.cells.map(row => row.map(cell => null))
    }
    createCell(x: number, y: number, lifespan: number, divTime: number, divFailRate: number) {
        this.cells[y][x] = new Cell(lifespan, divTime, divFailRate)
    }
    deleteCell(x: number, y: number) {
        this.cells[y][x] = null
    }
    update(deltaTime: number) {
        for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
            for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
                if (this.cells[y][x]) {
                    let status = this.cells[y][x]!.update(deltaTime)
                    if (status === Settings.CELL_DEATH_SIGNAL) {
                        this.deleteCell(x, y)
                    } else if (status === Settings.CELL_DIVIDE_SIGNAL) {
                        let allowed = Directions.START
                        if (x > Settings.X_START && !this.cells[y][x - Settings.CELL_GROWTH_DISTANCE] && !(this.coordsToString(x - Settings.CELL_GROWTH_DISTANCE, y) in this.new_cells)) {
                            allowed += Directions.LEFT
                        }
                        if (x < Settings.WIDTH - 1 && !this.cells[y][x + Settings.CELL_GROWTH_DISTANCE] && !(this.coordsToString(x + Settings.CELL_GROWTH_DISTANCE, y) in this.new_cells)) {
                            allowed += Directions.RIGHT
                        }
                        if (y > Settings.X_START && !this.cells[y - Settings.CELL_GROWTH_DISTANCE][x] && !(this.coordsToString(x, y - Settings.CELL_GROWTH_DISTANCE) in this.new_cells)) {
                            allowed += Directions.UP
                        }
                        if (y < Settings.HEIGHT - 1 && !this.cells[y + Settings.CELL_GROWTH_DISTANCE][x] && !(this.coordsToString(x, y + Settings.CELL_GROWTH_DISTANCE) in this.new_cells)) {
                            allowed += Directions.DOWN
                        }
                        let spot = Directions.START
                        for (let tmp = allowed; tmp > Directions.START; tmp = Math.floor(tmp / Directions.EXTRACT)) {
                            spot += tmp % Directions.EXTRACT
                        }
                        if (spot > Directions.START) {
                            spot = Math.floor(Math.random() * spot)
                            let direction = Directions.START
                            while (spot > Directions.START || allowed % Directions.EXTRACT === Directions.NOT_ALLOWED) {
                                spot -= allowed % Directions.EXTRACT
                                allowed = Math.floor(allowed / Directions.EXTRACT)
                                direction++
                            }
                            let directionX = Math.abs(direction - Directions.HORI_FUNC_POINT_X) + Directions.HORI_FUNC_POINT_Y
                            let directionY = Math.abs(direction - Directions.VERT_FUNC_POINT_X) + Directions.VERT_FUNC_POINT_Y
                            this.new_cells[this.coordsToString(x + directionX, y + directionY)] = new Cell(this.cells[y][x]!.lifespan, this.cells[y][x]!.divTime, this.cells[y][x]!.divFailRate)
                        }
                    }
                }
            }
        }
        for (let key in this.new_cells) {
            let [x, y] = this.stringToCoords(key)
            this.cells[y][x] = this.new_cells[key]
            delete this.new_cells[key]
        }
    }
}

export default Grid