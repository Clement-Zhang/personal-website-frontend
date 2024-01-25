import Header from "../components/header";

const Default = ({children}) => {
    return (
        <div>
            <Header />
            {children}
        </div>
    );
}

export default Default;