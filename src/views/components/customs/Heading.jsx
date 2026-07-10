export default function Heading({ children, styles = '' }) {
    return <h1 className={'text-xl text-center ' + styles}>{children}</h1>;
}
