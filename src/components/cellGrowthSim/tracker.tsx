import { Settings, Graph } from "./constants"

class Tracker {
    cellData: [number, number][]
    timeElapsed: number
    timeCapacity: number
    topCells: number
    extend: boolean
    constructor() {
        this.cellData = []
        this.timeElapsed = 0
        this.timeCapacity = Graph.INITIAL_X_SIZE
        this.topCells = Graph.INITIAL_Y_SIZE
        this.extend = false
    }
    updateCellCount(deltaTime: number, CellCount: number) {
        this.timeElapsed += deltaTime
        this.cellData.push([this.timeElapsed, CellCount])
        if (CellCount > this.topCells) {
            this.extend = true
            this.topCells = Math.min(this.topCells * Graph.GROWTH_FACTOR, Settings.WIDTH * Settings.HEIGHT)
        }
        if (this.timeElapsed > this.timeCapacity) {
            this.extend = true
            this.timeCapacity *= Graph.GROWTH_FACTOR
        }
    }
    clear() {
        this.cellData = []
        this.timeElapsed = 0
        this.timeCapacity = Graph.INITIAL_X_SIZE
        this.topCells = Graph.INITIAL_Y_SIZE
        this.extend = false
    }
    get gridData(): [[number, number][], boolean, number, number] {
        let extend = this.extend
        this.extend = false
        return [this.cellData, extend, this.timeCapacity, this.topCells]
    }
}

export default Tracker