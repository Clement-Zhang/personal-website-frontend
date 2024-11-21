import { SyntheticEvent, useState, useRef } from "react";
require("../styles/cell_growth_sim.module.css");

const play = require("../assets/play_button.jpg")
const pause = require("../assets/pause_button.jpg")
const reset = require("../assets/reset_button.jpg")

const Sim = () => {
    const [controls, change_controls] = useState({ "div_time": 1, "div_fail_rate": 0, "cell_life": 1 });
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
    const [mouse, move_mouse] = useState([0, 0]);
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
    function update_mouse(e: React.MouseEvent<HTMLCanvasElement>) {
        move_mouse([e.clientX - (canvas_ref.current as HTMLCanvasElement).getBoundingClientRect().left, e.clientY - (canvas_ref.current as HTMLCanvasElement).getBoundingClientRect().top])
    }
    function interact(e: React.MouseEvent<HTMLCanvasElement>) {
        e.preventDefault()
        let ctx = (canvas_ref.current as HTMLCanvasElement).getContext("2d") as CanvasRenderingContext2D
        let x = mouse[0] - (mouse[0] % 2)
        let y = mouse[1] - (mouse[1] % 2)
        if (e.button === 0) {
            put_cell(x, y, ctx)
        } else {
            ctx.clearRect(x, y, 2, 2)
        }
    }
    function put_cell(x: number, y: number, ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "green"
        ctx.fillRect(x, y, 2, 2)
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
                <canvas ref={canvas_ref} width={400} height={400} onMouseMove={update_mouse} onClick={interact} onContextMenu={interact}>

                </canvas>
            </div>
        </div>
    );
}

export default Sim;