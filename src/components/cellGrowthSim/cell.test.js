import Cell from "./cell"
import { Settings, Test } from "./constants"

test("initialize_min", () => {
    let cell = new Cell(Test.CELL_LIFESPAN_MIN, Test.CELL_DIV_TIME_MIN, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    expect(cell.time).toBe(Settings.CELL_START_TIME)
    expect(cell.cycle).toBe(Settings.CELL_START_CYCLE)
    expect(cell.lifetime).toBe(Test.CELL_LIFESPAN_MIN)
    expect(cell.divTime).toBe(Test.CELL_DIV_TIME_MIN)
    expect(cell.divFailRate).toBe(Test.CELL_DIV_FAIL_RATE_SUCCEED)
})

test("initialize_not_min", () => {
    let cell = new Cell(Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_MIDDLE)
    expect(cell.time).toBe(Settings.CELL_START_TIME)
    expect(cell.cycle).toBe(Settings.CELL_START_CYCLE)
    expect(cell.lifetime).toBe(Test.CELL_LIFESPAN_BASE)
    expect(cell.divTime).toBe(Test.CELL_DIV_TIME_BASE)
    expect(cell.divFailRate).toBe(Test.CELL_DIV_FAIL_RATE_MIDDLE)
})

test("update_no_divide", () => {
    let cell = new Cell(Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    expect(cell.update(Test.TIME_PASSED_MIN)).toBe(Settings.CELL_NO_SIGNAL)
})

test("update_divide", () => {
    let cell = new Cell(Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    expect(cell.update(Test.CELL_DIV_TIME_BASE)).toBe(Settings.CELL_DIVIDE_SIGNAL)
})

test("update_fail_divide", () => {
    let cell = new Cell(Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_FAIL)
    expect(cell.update(Test.CELL_DIV_TIME_BASE)).toBe(Settings.CELL_NO_SIGNAL)
})

test("update_die", () => {
    let cell = new Cell(Test.CELL_LIFESPAN_MIN, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    expect(cell.update(Test.CELL_LIFESPAN_MIN)).toBe(Settings.CELL_DEATH_SIGNAL)
})