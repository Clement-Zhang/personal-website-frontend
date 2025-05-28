import Default from "../templates/default"
import styles from "../styles/ama.module.css"
import { useState } from "react";
const Ama = () => {
    const [prompt, changePrompt] = useState("");
    async function submitPrompt(){
    }
    return (
        <Default>
            <p>This is a chatbot for you to ask me for my opinions on things so that I don't have to
                personally answer everyone's questions. Or, if you will, this is a glorified
                compressed automated FAQ.
            </p>
            <form>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => changePrompt(e.target.value)}
                    onSubmit={(e) => {
                        e.preventDefault();
                        console.log(submitPrompt());
                        changePrompt("");
                    }}
                />
            </form>
        </Default>
    );
}
export default Ama