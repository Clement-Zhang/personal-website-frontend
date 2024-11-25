class Cell {
    time: number
    cycle: number
    lifetime: number | undefined
    div_time: number | undefined
    div_fail_rate: number | undefined
    constructor(lifetime: number, div_time: number, div_fail_rate: number) {
        this.lifetime = lifetime
        this.div_time = div_time
        this.div_fail_rate = div_fail_rate
        this.time = 0
        this.cycle = 0
    }
    update(delta_time: number) {
        this.time += delta_time
        if (this.time >= this.lifetime!) {
            return "die"
        } else if (Math.floor(this.time / this.div_time!) > this.cycle) {
            console.log("cycle")
            this.cycle++
            if (Math.random() >= this.div_fail_rate!) {
                console.log("divide")
                return "divide"
            }
        }
        return 0
    }
}

export default Cell