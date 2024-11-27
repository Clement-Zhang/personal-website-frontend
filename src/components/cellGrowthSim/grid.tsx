import Cell from './cell'
import { Settings, Directions } from './constants'

class Grid {
    cells: (Cell | null)[][]
    constructor() {
        this.cells = []
        for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
            let row = []
            for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
                row.push(null)
            }
            this.cells.push(row)
        }
    }
    clear() {
        this.cells = this.cells.map(row => row.map(cell => null))
    }
    createCell(x: number, y: number, lifetime: number, divTime: number, divFailRate: number) {
        this.cells[y][x] = new Cell(lifetime, divTime, divFailRate)
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
                        if (x > Settings.X_START && !this.cells[y][x - Settings.CELL_GROWTH_DISTANCE]) {
                            allowed += Directions.LEFT
                        }
                        if (x < Settings.WIDTH - 1 && !this.cells[y][x + Settings.CELL_GROWTH_DISTANCE]) {
                            allowed += Directions.RIGHT
                        }
                        if (y > Settings.X_START && !this.cells[y - Settings.CELL_GROWTH_DISTANCE][x]) {
                            allowed += Directions.UP
                        }
                        if (y < Settings.HEIGHT - 1 && !this.cells[y + Settings.CELL_GROWTH_DISTANCE][x]) {
                            allowed += Directions.DOWN
                        }
                        let spot = Directions.START
                        for (let tmp = allowed; tmp > Directions.START; tmp = Math.floor(tmp / Directions.EXTRACT)) {
                            spot += tmp % Directions.EXTRACT
                        }
                        if (spot > Directions.START) {
                            spot = Math.floor(Math.random() * spot)
                            let direction = Directions.START
                            while (spot !== Directions.START || allowed % Directions.EXTRACT === Directions.NOT_ALLOWED) {
                                spot -= allowed % Directions.EXTRACT
                                allowed = Math.floor(allowed / Directions.EXTRACT)
                                direction++
                            }
                            let directionX = Math.abs(direction - Directions.HORI_FUNC_POINT_X) + Directions.HORI_FUNC_POINT_Y
                            let directionY = Math.abs(direction - Directions.VERT_FUNC_POINT_X) + Directions.VERT_FUNC_POINT_Y
                            this.createCell(x + directionX, y + directionY, this.cells[y][x]!.lifetime, this.cells[y][x]!.divTime, this.cells[y][x]!.divFailRate)
                        }
                    }
                }
            }
        }
    }
}

export default Grid