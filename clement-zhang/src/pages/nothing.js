import Default from "../templates/default";
import img from "../assets/under_construction.jpg";
import styles from "../styles/nothing.module.css";

const Nothing = () => {
    return (
        <div>
            <Default>
                <img src={img} alt="Under Construction" className={styles.img}/>
            </Default>
        </div>
    );
}

export default Nothing;