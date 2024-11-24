import Header from "../components/header"
import styles from "../styles/default.module.css"

const Default = ({children}) => {
    return (
        <div className={styles.all}>
            <Header />
            <div className={styles.surface_spaced}>
                {children}
            </div>
        </div>
    );
}

export default Default