import { SyntheticEvent, useState, useRef, useEffect} from "react";
require("../styles/cell_growth_sim.module.css");

const play = require("../assets/play_button.jpg")
const pause = require("../assets/pause_button.jpg")
const reset = require("../assets/reset_button.jpg")

const Sim = () => {
    class Cell {
        x: number
        y: number
        constructor(x: number, y: number) {
            this.x = x
            this.y = y
        }
    }
    class Dish {
        cells: (Cell | null)[][]
        ctx: CanvasRenderingContext2D
        constructor(ctx: CanvasRenderingContext2D) {
            let tmp: (Cell | null)[][] = []
            for (let i = 0; i < 200; i++) {
                let row = []
                for (let i = 0; i < 200; i++) {
                    row.push(null)
                }
                tmp.push(row)
            }
            this.cells = tmp
            this.ctx = ctx
        }
        interact(e: React.MouseEvent<HTMLCanvasElement>, mouse: number[]) {
            e.preventDefault()
            let x = Math.floor(mouse[0] / 2)
            let y = Math.floor(mouse[1] / 2)
            if (e.button === 0) {
                this.create_cell(x, y)
            } else {
                this.delete_cell(x, y)
            }
            for (let i = 0; i < 200; i++) {
                for (let j = 0; j < 200; j++) {
                    if (this.cells[i][j] !== null) {
                        console.log(i, j, this.cells[i][j])
                    }
                }
            }
        }
        create_cell(x: number, y: number) {
            this.cells[x][y] = new Cell(x, y)
            this.ctx.fillStyle = "green"
            this.ctx.fillRect(x * 2, y * 2, 2, 2)
        }
        delete_cell(x: number, y: number) {
            this.cells[x][y] = null
            this.ctx.clearRect(x * 2, y * 2, 2, 2)
        }
    }
    const [controls, change_controls] = useState({
        "div_time": 1,
        "div_fail_rate": 0,
        "cell_life": 1
    });
    const adjust = (e: SyntheticEvent) => {
        const target = e.target as typeof e.target & {
            name: string,
            value: number
        }
        const name = target.name;
        const value = target.value;
        change_controls(values => ({ ...values, [name]: value }))
    }
    const canvas_ref = useRef<HTMLCanvasElement | null>(null);
    const [mouse, update_mouse] = useState([0, 0]);
    const cells = useRef<Dish | null>(null);
    useEffect(() => {
        if (canvas_ref.current) {
            const ctx = canvas_ref.current.getContext("2d");
            if (ctx) {
                cells.current = new Dish(ctx);
            }
        }
    }, []);
    function change_button(e: SyntheticEvent) {
        let element = e.target as HTMLImageElement
        if (element.getAttribute("data-active-button") === "play") {
            element.setAttribute("data-active-button", "pause")
            element.src = pause
        } else {
            element.setAttribute("data-active-button", "play")
            element.src = play
        }
    }
    function reset_button(e: SyntheticEvent) {
        let element = document.getElementById("play_pause") as HTMLImageElement
        element.setAttribute("data-active-button", "play")
        element.src = play
    }
    function move_mouse(e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvas_ref.current) {
            update_mouse([e.clientX - canvas_ref.current.getBoundingClientRect().left, e.clientY - canvas_ref.current.getBoundingClientRect().top])
        }
    }
    function interact(e: React.MouseEvent<HTMLCanvasElement>) {
        if (cells.current) {
            cells.current.interact(e, mouse)
        }
    }
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: "50%" }}>
                <ul>
                    <li>
                        <img id="play_pause" src={play} alt="play button" data-active-button="play" onClick={change_button} />
                    </li>
                    <li>
                        <img src={reset} alt="reset button" onClick={reset_button} />
                    </li>
                </ul>
                <form>
                    <label>
                        Division Time (seconds)
                    </label>
                    <input type="number" name="div_time" min={1} value={controls.div_time || 1} onChange={adjust} />
                    <label>
                        Division Failure Rate (0-1)
                    </label>
                    <input type="number" name="div_fail_rate" min={0} max={1} step={.0001} value={controls.div_fail_rate || 0} onChange={adjust} />
                    <label>
                        Cell Lifespan (seconds)
                    </label>
                    <input type="number" name="cell_life" min={1} value={controls.cell_life || 1} onChange={adjust} />
                </form>
            </div>
            <div style={{ flex: "50%" }}>
                <canvas ref={canvas_ref} width={400} height={400} onMouseMove={move_mouse} onClick={interact} onContextMenu={interact}>
                </canvas>
            </div>
        </div>
    );
}

export default Sim;