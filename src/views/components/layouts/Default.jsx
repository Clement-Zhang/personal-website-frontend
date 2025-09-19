import Header from '../statics/Header';

export default function Default({ children }) {
    return (
        <div className="font-comic">
            <Header />
            <div className="m-2">{children}</div>
        </div>
    );
}
