import Default from "../templates/default"
import ecommerce from "../assets/ecommerce.jpg"
import aope from "../assets/AoPE.jpg"
import styles from "../styles/projects.module.css"
import { Link } from "react-router-dom"

const Projects = () => {
    return (
        <Default>
            <p>
                Here you can take a look at some of the projects I do in my spare time. For <b>all</b> of the projects that I have sole ownership over, <a href="https://github.com/Clement-Zhang?tab=repositories">click here</a>.
            </p>
            <p>
                I have contributed to many other projects, but I am not listing them here due to lack of group permission.
            </p>
            <h3>
                <a href="https://github.com/Clement-Zhang/ecommerce-system">Ecommerce Website</a>
            </h3>
            <img src={ecommerce} alt="Screenshot of an online shopping website" className={styles.img}/>
            <p>
                This is a generic e-commerce website that can be extended and customized for specific businesses. Since it is generic, I didn't give it a name. The two product images are identical, that is intentional.
            </p>
            <h3>
                <a href="https://github.com/Clement-Zhang/Attack-on-Planet-Earth">Attack on Planet Earth</a>
            </h3>
            <img src={aope} alt="Screenshot of gameplay of a Space Invaders style game" className={styles.img}/>
            <p>
                Attack on Planet Earth is a remake of Space Invaders, the well known arcade game.
            </p>
            <h3>
                <Link to="/sim">Cell Growth Simulator</Link>
            </h3>
            <p>
                This is a simulation of cell growth in a petri dish. The cells divide and cover the dish, and the user can control a number of parameters.
            </p>
        </Default>
    );
}

export default Projects