import Cell from "./cell"
import Grid from "./grid"

let grid

beforeEach(() => {
    grid = new Grid()
})

test("initialize", () => {
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 200; j++) {
            expect(grid.cells[i][j]).toBe(null)
        }
    }
})

test("add_cell", () => {
    grid.create_cell(0, 0, 100, 100, 0)
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 200; j++) {
            if (i == 0 && j == 0) {
                expect(grid.cells[i][j]).toEqual(new Cell(100, 100, 0))
            } else {
                expect(grid.cells[i][j]).toBe(null)
            }
        }
    }
})

test("update_no_divide", () => {
    grid.create_cell(0, 0, 1000, 500, 0)
    grid.update(100)
    for (let i = 0; i < 200; i++) {
        for (let j = 0; j < 200; j++) {
            if (i == 0 && j == 0) {
                let cell = new Cell(1000, 500, 0)
                cell.update(100)
                expect(grid.cells[i][j]).toEqual(cell)
            } else {
                expect(grid.cells[i][j]).toBe(null)
            }
        }
    }
})