import { SyntheticEvent, useState, useRef, useEffect } from "react"
import Grid from "../components/cell_growth_sim/grid"
import Renderer from "../components/cell_growth_sim/renderer"
require("../styles/cell_growth_sim.module.css")

const play = require("../assets/play_button.jpg")
const pause = require("../assets/pause_button.jpg")
const reset = require("../assets/reset_button.jpg")

const Sim = () => {
    let [mouse, update_mouse] = useState([0, 0]);
    let renderer = useRef<Renderer | null>(null);
    let grid = useRef(new Grid())
    const [controls, change_controls] = useState({
        "div_time": 1,
        "div_fail_rate": 0,
        "cell_life": 1
    });
    let canvas_ref = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        let ctx = canvas_ref.current!.getContext("2d")
        ctx!.fillStyle = "green"
        renderer.current = new Renderer(ctx!, grid.current)
    }, [canvas_ref])
    const adjust = (e: SyntheticEvent) => {
        const target = e.target as typeof e.target & {
            name: string,
            value: number
        }
        const name = target.name;
        const value = target.value;
        change_controls(values => ({ ...values, [name]: value }))
    }
    function move_mouse(e: React.MouseEvent<HTMLCanvasElement>) {
        update_mouse([
            e.clientX-canvas_ref.current!.getBoundingClientRect().left,
            e.clientY-canvas_ref.current!.getBoundingClientRect().top
        ])
    }
    function interact(e: React.MouseEvent<HTMLCanvasElement>, grid: React.MutableRefObject<Grid>) {
        grid.current.interact(e, mouse, controls.cell_life! * 1000, controls.div_time! * 1000, controls.div_fail_rate!)
        renderer.current!.frame()
    }
    function change_button(e: SyntheticEvent) {
        let element = e.target as HTMLImageElement
        if (element.getAttribute("data-active-button") === "play") {
            element.setAttribute("data-active-button", "pause")
            element.src = pause
            renderer.current!.play()
        } else {
            element.setAttribute("data-active-button", "play")
            element.src = play
            renderer.current!.pause()
        }
    }
    function reset_button(e: SyntheticEvent) {
        let element = document.getElementById("play_pause") as HTMLImageElement
        element.setAttribute("data-active-button", "play")
        element.src = play
        renderer.current!.reset()
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
                    <input type="number" name="div_time" min={.1} step={.1} value={controls.div_time || 1} onChange={adjust} />
                    <label>
                        Division Failure Rate (0-1)
                    </label>
                    <input type="number" name="div_fail_rate" min={0} max={1} step={.0001} value={controls.div_fail_rate || 0} onChange={adjust} />
                    <label>
                        Cell Lifespan (seconds)
                    </label>
                    <input type="number" name="cell_life" min={.1} step={.1} value={controls.cell_life || 1} onChange={adjust} />
                </form>
            </div>
            <div style={{ flex: "50%" }}>
                <canvas
                    ref={canvas_ref}
                    width={400}
                    height={400}
                    onMouseMove={move_mouse}
                    onMouseDown={(e) => interact(e, grid)}
                />
            </div>
        </div>
    );
}

export default Sim