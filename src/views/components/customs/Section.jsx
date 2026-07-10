import Heading from './Heading';

export default function Section({ title, children }) {
    return (
        <div className="flex-1">
            <Heading styles="mb-2">{title}</Heading>
            {children}
        </div>
    );
}
