import { SyntheticEvent, useState, useRef, useEffect } from "react";
require("../styles/cell_growth_sim.module.css");

const play = require("../assets/play_button.jpg")
const pause = require("../assets/pause_button.jpg")
const reset = require("../assets/reset_button.jpg")

const Sim = () => {
    class Cell {
        create_time: number
        constructor() {
            this.create_time = Date.now()
        }
    }
    class Dish {
        cells: (Cell | null)[][]
        ctx: CanvasRenderingContext2D
        lifetime: number | undefined
        div_time: number | undefined
        div_fail_rate: number | undefined
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
        set(lifetime: number, div_time: number, div_fail_rate: number) {
            this.lifetime = lifetime
            this.div_time = div_time
            this.div_fail_rate = div_fail_rate
            console.log("lifetime: " + this.lifetime, "div_time: " + this.div_time, "div_fail_rate: " + this.div_fail_rate)
        }
        interact(e: React.MouseEvent<HTMLCanvasElement>, mouse: number[]) {
            e.preventDefault()
            let x = Math.floor(mouse[0] / 2)
            let y = Math.floor(mouse[1] / 2)
            if (!this.cells[y][x]) {
                if (e.button === 0) {
                    this.create_cell(x, y)
                    this.ctx.fillRect(x * 2, y * 2, 2, 2)
                } else {
                    this.delete_cell(x, y)
                    this.ctx.clearRect(x * 2, y * 2, 2, 2)
                }
            }
        }
        create_cell(x: number, y: number) {
            this.cells[y][x] = new Cell()
        }
        delete_cell(x: number, y: number) {
            this.cells[y][x] = null
        }
        frame(timestamp: number) {
            let time = Date.now()
            for (let y = 0; y < 200; y++) {
                for (let x = 0; x < 200; x++) {
                    if (this.cells[y][x]) {
                        if (time - this.cells[y][x]!.create_time >= this.lifetime!) {
                            this.delete_cell(x, y)
                        } else if (time - this.cells[y][x]!.create_time >= this.div_time! && Math.random() > this.div_fail_rate!) {
                            let squares = []
                            if (x > 0 && !this.cells[x - 1][y]) {
                                squares.push([x - 1, y])
                            }
                            if (x < 199 && !this.cells[x + 1][y]) {
                                squares.push([x + 1, y])
                            }
                            if (y > 0 && !this.cells[x][y - 1]) {
                                squares.push([x, y - 1])
                            }
                            if (y < 199 && !this.cells[x][y + 1]) {
                                squares.push([x, y + 1])
                            }
                            if (squares.length > 0) {
                                let [new_x, new_y] = squares[Math.floor(Math.random() * squares.length)]
                                this.create_cell(new_x, new_y)
                            }
                        }
                    }
                }
            }
            this.ctx.clearRect(0, 0, 400, 400)
            for (let y = 0; y < 200; y++) {
                for (let x = 0; x < 200; x++) {
                    if (this.cells[y][x]) {
                        let begin = x
                        while (x < 200 && this.cells[y][x]) {
                            x++
                        }
                        this.ctx.fillRect(begin * 2, y * 2, (x - begin) * 2, 2)
                    }
                }
            }
            requestAnimationFrame(this.frame.bind(this))
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
    let cells = useRef<Dish | null>(null);
    useEffect(() => {
        let ctx = canvas_ref.current!.getContext("2d")
        ctx!.fillStyle = "green"
        cells.current = new Dish(ctx!);
    }, [canvas_ref])
    function change_button(e: SyntheticEvent) {
        let element = e.target as HTMLImageElement
        if (element.getAttribute("data-active-button") === "play") {
            element.setAttribute("data-active-button", "pause")
            element.src = pause
            cells.current!.set(controls.cell_life!, controls.div_time!, controls.div_fail_rate!)
            requestAnimationFrame(cells.current!.frame.bind(cells.current!))
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
        cells.current!.interact(e, mouse)
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