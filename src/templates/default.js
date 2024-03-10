import Header from "../components/header";
import styles from "../styles/default.module.css";

const Default = ({children}) => {
    return (
        <div className={styles.all}>
            <Header />
            {children}
        </div>
    );
}

export default Default;