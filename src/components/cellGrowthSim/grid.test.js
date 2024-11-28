import Cell from "./cell"
import Grid from "./grid"
import { Settings, Test } from "./constants"

let grid
let func

beforeEach(() => {
    grid = new Grid()
    func = Math.random
})

afterEach(() => {
    Math.random = func
})

test("initialize", () => {
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            expect(grid.cells[y][x]).toBe(null)
        }
    }
})

test("create_cell", () => {
    grid.createCell(Settings.X_START, Settings.Y_START, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (x === Settings.X_START && y === Settings.Y_START) {
                expect(grid.cells[y][x]).toEqual(new Cell(Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED))
            } else {
                expect(grid.cells[y][x]).toBe(null)
            }
        }
    }
})

test("delete_cell", () => {
    grid.createCell(Settings.X_START, Settings.Y_START, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.deleteCell(Settings.X_START, Settings.Y_START)
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            expect(grid.cells[y][x]).toBe(null)
        }
    }
})

test("update_no_divide", () => {
    grid.createCell(Settings.X_START, Settings.Y_START, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.TIME_PASSED_MIN)
    let count = 0
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x]) {
                count++
            }
        }
    }
    expect(count).toBe(1)
})

test("update_divide_all_right", () => {
    Math.random = () => 0
    let x = Settings.X_START + 1
    let y = Settings.Y_START + 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_all_up", () => {
    Math.random = () => 0.26
    let x = Settings.X_START + 1
    let y = Settings.Y_START + 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y - 1][x].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_all_left", () => {
    Math.random = () => 0.51
    let x = Settings.X_START + 1
    let y = Settings.Y_START + 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x - 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_all_down", () => {
    Math.random = () => 0.76
    let x = Settings.X_START + 1
    let y = Settings.Y_START + 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y + 1][x].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_right_disallowed", () => {
    Math.random = () => 0
    let x = Settings.WIDTH - 1
    let y = Settings.Y_START + 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y - 1][x].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_up_disallowed", () => {
    Math.random = () => 0
    let x = Settings.X_START + 1
    let y = Settings.Y_START
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_left_disallowed", () => {
    Math.random = () => 0
    let x = Settings.X_START
    let y = Settings.Y_START + 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_left_disallowed", () => {
    Math.random = () => 0
    let x = Settings.X_START
    let y = Settings.Y_START + 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_down_disallowed", () => {
    Math.random = () => 0
    let x = Settings.X_START + 1
    let y = Settings.HEIGHT - 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_top_right_disallowed", () => {
    Math.random = () => 0
    let x = Settings.WIDTH - 1
    let y = Settings.Y_START
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x - 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_top_left_disallowed", () => {
    Math.random = () => 0
    let x = Settings.X_START
    let y = Settings.Y_START
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_bottom_left_disallowed", () => {
    Math.random = () => 0
    let x = Settings.X_START
    let y = Settings.HEIGHT - 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_bottom_right_disallowed", () => {
    Math.random = () => 0
    let x = Settings.WIDTH - 1
    let y = Settings.HEIGHT - 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y - 1][x].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_left_allowed", () => {
    Math.random = () => 0
    let x = Settings.WIDTH - 1
    let y = Settings.Y_START
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.createCell(x, y + 1, Test.CELL_LIFESPAN_IMMORTAL, Test.CELL_DIV_TIME_CELIBATE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x - 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    if (grid.cells[y + 1][x].lifespan === Test.CELL_LIFESPAN_IMMORTAL) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_down_allowed", () => {
    Math.random = () => 0
    let x = Settings.X_START
    let y = Settings.Y_START
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.createCell(x + 1, y, Test.CELL_LIFESPAN_IMMORTAL, Test.CELL_DIV_TIME_CELIBATE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y + 1][x].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    if (grid.cells[y][x + 1].lifespan === Test.CELL_LIFESPAN_IMMORTAL) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_right_allowed", () => {
    Math.random = () => 0
    let x = Settings.X_START
    let y = Settings.HEIGHT - 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.createCell(x, y - 1, Test.CELL_LIFESPAN_IMMORTAL, Test.CELL_DIV_TIME_CELIBATE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y][x + 1].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    if (grid.cells[y - 1][x].lifespan === Test.CELL_LIFESPAN_IMMORTAL) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_divide_up_allowed", () => {
    Math.random = () => 0
    let x = Settings.WIDTH - 1
    let y = Settings.HEIGHT - 1
    grid.createCell(x, y, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.createCell(x - 1, y, Test.CELL_LIFESPAN_IMMORTAL, Test.CELL_DIV_TIME_CELIBATE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_DIV_TIME_BASE)
    let count = 0
    if (grid.cells[y - 1][x].time === Settings.CELL_START_TIME) {
        count++
    }
    if (grid.cells[y][x].lifespan === Test.CELL_LIFESPAN_BASE) {
        count++
    }
    if (grid.cells[y][x - 1].lifespan === Test.CELL_LIFESPAN_IMMORTAL) {
        count++
    }
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (grid.cells[y][x] == null) {
                count++
            }
        }
    }
    expect(count).toBe(Settings.HEIGHT * Settings.WIDTH)
})

test("update_fail_divide", () => {
    grid.createCell(Settings.X_START, Settings.Y_START, Test.CELL_LIFESPAN_BASE, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_FAIL)
    grid.update(Test.CELL_DIV_TIME_BASE)
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            if (x == Settings.X_START && y == Settings.Y_START) {
                expect(grid.cells[y][x].time).toBe(Test.CELL_DIV_TIME_BASE)
            } else {
                expect(grid.cells[y][x]).toBe(null)
            }
        }
    }
})

test("update_die", () => {
    grid.createCell(Settings.X_START, Settings.Y_START, Test.CELL_LIFESPAN_MIN, Test.CELL_DIV_TIME_BASE, Test.CELL_DIV_FAIL_RATE_SUCCEED)
    grid.update(Test.CELL_LIFESPAN_MIN)
    for (let y = Settings.Y_START; y < Settings.HEIGHT; y++) {
        for (let x = Settings.X_START; x < Settings.WIDTH; x++) {
            expect(grid.cells[y][x]).toBe(null)
        }
    }
})