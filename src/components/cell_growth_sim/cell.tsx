class Cell {
    create_time: number
    cycle: number
    lifetime: number | undefined
    div_time: number | undefined
    div_fail_rate: number | undefined
    constructor(create_time: number, lifetime: number, div_time: number, div_fail_rate: number) {
        this.lifetime = lifetime
        this.div_time = div_time
        this.div_fail_rate = div_fail_rate
        this.create_time = create_time
        this.cycle = 0
    }
}

export default Cell