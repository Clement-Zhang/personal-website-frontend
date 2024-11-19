import { SyntheticEvent, useState } from "react";
let styles = require("../styles/cell_growth_sim.module.css");

const play = require("../assets/play_button.jpg")
const pause = require("../assets/pause_button.jpg")
const reset = require("../assets/reset_button.jpg")

const Sim = () => {
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
    return (
        <div className={styles.row}>
            <div className={styles.left}>
                <ul>
                    <li>
                        <img src={play} alt="play button" data-active-button="play" onClick={change_button}/>
                    </li>
                    <li>
                        <img src={reset} alt="reset button"/>
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
            <div className={styles.right}>
                <p>test</p>
            </div>
        </div>
    );
}

export default Sim;