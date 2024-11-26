import Cell from "./cell"

test("initialize_min", () => {
    let cell = new Cell(.1, .1, 0)
    expect(cell.time).toBe(0)
    expect(cell.cycle).toBe(0)
    expect(cell.lifetime).toBe(.1)
    expect(cell.div_time).toBe(.1)
    expect(cell.div_fail_rate).toBe(0)
})

test("initialize_not_min", () => {
    let cell = new Cell(1, 1, .5)
    expect(cell.time).toBe(0)
    expect(cell.cycle).toBe(0)
    expect(cell.lifetime).toBe(1)
    expect(cell.div_time).toBe(1)
    expect(cell.div_fail_rate).toBe(.5)
})

test("update_no_divide", () => {
    let cell = new Cell(1, 1, 0)
    expect(cell.update(0)).toBe(0)
})

test("update_divide", () => {
    let cell = new Cell(1, 1, 0)
    expect(cell.update(1000)).toBe("divide")
})

test("update_fail_divide", () => {
    let cell = new Cell(1, 1, 1)
    expect(cell.update(1000)).toBe(0)
})

test("update_die", () => {
    let cell = new Cell(.1, 1, 0)
    expect(cell.update(100)).toBe("die")
})