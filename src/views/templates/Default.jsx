import Header from '../components/Header';
import styles from '../../assets/css/default.module.css';

export default function Default({ children }) {
    return (
        <div className={styles.all}>
            <Header />
            <div className={styles.surfaceSpaced}>{children}</div>
        </div>
    );
}
