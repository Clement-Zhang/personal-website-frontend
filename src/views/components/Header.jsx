import Navbar from './Navbar';
import styles from '../../assets/css/default.module.css';

export default function Header() {
    return (
        <div className={styles.allSpaced}>
            <h3>Clement</h3>
            <Navbar />
        </div>
    );
}
