import img from '../../assets/images/underConstruction.jpg';

export default function Nothing() {
    return (
        <img
            src={img}
            alt="Under Construction"
            className="m-auto block w-1/4"
        />
    );
}
