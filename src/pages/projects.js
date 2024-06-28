import Default from "../templates/default";
import ecommerce_img from "../assets/ecommerce.jpg";
import aope_img from "../assets/AoPE.jpg";
import styles from "../styles/projects.module.css";

const Projects = () => {
    return (
        <Default>
            <p>
                Here you can take a look at some of the projects I do in my spare time. For <b>all</b> of the projects that I have sole ownership over, <a href="https://github.com/Clement-Zhang?tab=repositories">click here</a>.
            </p>
            <p>
                I have contributed to many other projects, but I am not listing them here due to lack of group permission.
            </p>
            <h>
                <a href="https://github.com/Clement-Zhang/ecommerce-system">Ecommerce Website</a>
            </h>
            <img src={ecommerce_img} alt="Screenshot of an online shopping website" className={styles.img}/>
            <p>
                This is a generic e-commerce website that can be extended and customized for specific businesses. Since it is generic, I didn't give it a name. The two product images are identical, that is intentional.
            </p>
            <h>
                <a href="https://github.com/Clement-Zhang/Attack-on-Planet-Earth">Attack on Planet Earth</a>
            </h>
            <img src={aope_img} alt="Screenshot of gameplay of a Space Invaders style game" className={styles.img}/>
            <p>
                Attack on Planet Earth is a remake of Space Invaders, the well known arcade game.
            </p>
        </Default>
    );
}

export default Projects;