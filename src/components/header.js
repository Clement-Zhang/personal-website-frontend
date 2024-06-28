import MyNavbar from "./navbar";
import styles from "../styles/default.module.css";

const Header = () => {
    return (
        <div className={styles.all_spaced}>
            <h3>Clement</h3>
            <MyNavbar />
        </div>
    );
}

export default Header;