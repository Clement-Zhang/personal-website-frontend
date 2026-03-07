export default function Text({ children, position }) {
    return <p className={'max-w-4xl ' + position}>{children}</p>;
}
