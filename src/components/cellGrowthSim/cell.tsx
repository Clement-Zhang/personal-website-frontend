import { Settings } from "./constants"

class Cell {
    time: number
    cycle: number
    lifespan: number
    divTime: number
    divFailRate: number
    constructor(lifespan: number, divTime: number, divFailRate: number) {
        this.lifespan = lifespan
        this.divTime = divTime
        this.divFailRate = divFailRate
        this.time = Settings.CELL_START_TIME
        this.cycle = Settings.CELL_START_CYCLE
    }
    update(deltaTime: number) {
        this.time += deltaTime
        if (this.time >= this.lifespan) {
            return Settings.CELL_DEATH_SIGNAL
        } else if (Math.floor(this.time / this.divTime) > this.cycle) {
            this.cycle++
            if (Math.random() >= this.divFailRate) {
                return Settings.CELL_DIVIDE_SIGNAL
            }
        }
        return Settings.CELL_NO_SIGNAL
    }
}

export default Cell