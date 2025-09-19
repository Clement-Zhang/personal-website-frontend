import Default from '../components/layouts/Default';
import img from '../../assets/images/underConstruction.jpg';

export default function Nothing() {
    return (
        <Default>
            <img src={img} alt="Under Construction" className="m-auto block w-1/4" />
        </Default>
    );
}
