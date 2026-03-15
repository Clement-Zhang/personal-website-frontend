import Navbar from '../statics/Navbar';

export default function Default({ children }) {
    return (
        <div className="font-comic">
            <Navbar />
            <div className={'max-w-4xl mx-auto my-2'}>{children}</div>
        </div>
    );
}
