import { SyntheticEvent, useState, useRef, useEffect } from "react";
require("../styles/cell_growth_sim.module.css");

const play = require("../assets/play_button.jpg")
const pause = require("../assets/pause_button.jpg")
const reset = require("../assets/reset_button.jpg")

const Sim = () => {
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
    class Dish {
        cells: (Cell | null)[][]
        ctx: CanvasRenderingContext2D
        elapsed_time: number
        prev_frame_time: number | undefined
        prev_frame_id: number | undefined
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
            this.elapsed_time = 0
        }
        play() {
            this.prev_frame_time = Date.now()
            this.prev_frame_id = requestAnimationFrame(this.frame.bind(this))
        }
        pause() {
            this.elapsed_time += Date.now() - this.prev_frame_time!
            cancelAnimationFrame(this.prev_frame_id!)
        }
        resume() {
            this.prev_frame_time = Date.now()
            this.prev_frame_id = requestAnimationFrame(this.frame.bind(this))
        }
        reset() {
            cancelAnimationFrame(this.prev_frame_id!)
            this.elapsed_time = 0
            this.cells = this.cells.map(row => row.map(cell => null))
            this.ctx.clearRect(0, 0, 400, 400)
        }
        interact(e: React.MouseEvent<HTMLCanvasElement>, mouse: number[], lifetime: number, div_time: number, div_fail_rate: number) {
            e.preventDefault()
            let x = Math.floor(mouse[0] / 2)
            let y = Math.floor(mouse[1] / 2)
            if (!this.cells[y][x]) {
                if (e.button === 0) {
                    this.create_cell(x, y, lifetime, div_time, div_fail_rate)
                    this.ctx.fillRect(x * 2, y * 2, 2, 2)
                } else {
                    this.delete_cell(x, y)
                    this.ctx.clearRect(x * 2, y * 2, 2, 2)
                }
            }
        }
        create_cell(x: number, y: number, lifetime: number, div_time: number, div_fail_rate: number) {
            this.cells[y][x] = new Cell(this.elapsed_time, lifetime, div_time, div_fail_rate)
        }
        delete_cell(x: number, y: number) {
            this.cells[y][x] = null
        }
        frame(timestamp: number) {
            this.elapsed_time += Date.now() - this.prev_frame_time!
            for (let y = 0; y < 200; y++) {
                for (let x = 0; x < 200; x++) {
                    if (this.cells[y][x]) {
                        if (this.elapsed_time - this.cells[y][x]!.create_time >= this.cells[y][x]!.lifetime!) {
                            this.delete_cell(x, y)
                        } else if (Math.floor((this.elapsed_time - this.cells[y][x]!.create_time) / this.cells[y][x]!.div_time!) > this.cells[y][x]!.cycle && Math.random() > this.cells[y][x]!.div_fail_rate!) {
                            let squares = []
                            if (x > 0 && !this.cells[y][x - 1]) {
                                squares.push([x - 1, y])
                            }
                            if (x < 199 && !this.cells[y][x + 1]) {
                                squares.push([x + 1, y])
                            }
                            if (y > 0 && !this.cells[y - 1][x]) {
                                squares.push([x, y - 1])
                            }
                            if (y < 199 && !this.cells[y + 1][x]) {
                                squares.push([x, y + 1])
                            }
                            if (squares.length > 0) {
                                let [new_x, new_y] = squares[Math.floor(Math.random() * squares.length)]
                                this.create_cell(new_x, new_y, this.cells[y][x]!.lifetime!, this.cells[y][x]!.div_time!, this.cells[y][x]!.div_fail_rate!)
                            }
                            this.cells[y][x]!.cycle = Math.floor((this.elapsed_time - this.cells[y][x]!.create_time) / this.cells[y][x]!.div_time!)
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
            this.prev_frame_time = Date.now()
            this.prev_frame_id = requestAnimationFrame(this.frame.bind(this))
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
    let canvas_ref = useRef<HTMLCanvasElement | null>(null);
    let mouse = useRef<[number, number]>([0, 0]);
    let animation = useRef<boolean>(false);
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
            if (animation.current) {
                cells.current!.resume()
            } else {
                cells.current!.play()
                animation.current = true
            }
        } else {
            element.setAttribute("data-active-button", "play")
            element.src = play
            cells.current!.pause()
        }
    }
    function reset_button(e: SyntheticEvent) {
        let element = document.getElementById("play_pause") as HTMLImageElement
        element.setAttribute("data-active-button", "play")
        element.src = play
        animation.current = false
        cells.current!.reset()
    }
    function move_mouse(e: React.MouseEvent<HTMLCanvasElement>) {
        if (canvas_ref.current) {
            mouse.current = [e.clientX - canvas_ref.current.getBoundingClientRect().left, e.clientY - canvas_ref.current.getBoundingClientRect().top]
        }
    }
    function interact(e: React.MouseEvent<HTMLCanvasElement>) {
        cells.current!.interact(e, mouse.current, controls.cell_life! * 1000, controls.div_time! * 1000, controls.div_fail_rate!)
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