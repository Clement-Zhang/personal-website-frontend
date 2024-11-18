import { SyntheticEvent } from "react";
import { Navbar } from "react-bootstrap";
let styles = require("../styles/cell_growth_sim.module.css");

const play = require("../assets/play_button.jpg")
const pause = require("../assets/pause_button.jpg")
const reset = require("../assets/reset_button.jpg")

const Sim = () => {
    function change_button(e: SyntheticEvent) {
        let element=e.target as HTMLImageElement
        if (element.getAttribute("data-active-button") === "play") {
            element.setAttribute("data-active-button", "pause")
            element.src = pause
        } else {
            element.setAttribute("data-active-button", "play")
            element.src = play
        }
    }
    return (
        <Navbar className="justify-content-center">
            <img src={play} alt="play button" className={styles.img} data-active-button="play" onClick={(e) => {change_button(e)}}/>
            <img src={reset} alt="reset button" className={styles.img}/>
        </Navbar>
    );
}

export default Sim;