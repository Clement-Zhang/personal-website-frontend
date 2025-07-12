import Default from '../templates/Default';
import img from '../../assets/images/underConstruction.jpg';
import styles from '../../assets/css/nothing.module.css';

export default function Nothing() {
    return (
        <Default>
            <img src={img} alt="Under Construction" className={styles.img} />
        </Default>
    );
}
