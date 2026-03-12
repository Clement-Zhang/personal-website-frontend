import Navbar from '../statics/Navbar';

export default function Default({ children }) {
    return (
        <div className="font-comic">
            <Navbar />
            <div className="m-2">{children}</div>
        </div>
    );
}
