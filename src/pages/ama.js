import Default from "../templates/default"
import styles from "../styles/ama.module.css"
import { useState } from "react";
const Ama = () => {
    const [prompt, changePrompt] = useState("");
    const [chatlog, updateChatlog] = useState([]);
    async function submitPrompt() {
        const res = await fetch("http://localhost:3001/deepseek", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const result = await res.json();
        updateChatlog((chatlog) => [
            ...chatlog,
            result.response
        ]);
        console.log("chatlog update", chatlog);
    }
    return (
        <Default>
            <p>This is a chatbot for you to ask me for my opinions on things so that I don't have to
                personally answer everyone's questions. Or, if you will, this is a glorified
                compressed automated FAQ.
            </p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    console.log(submitPrompt());
                    changePrompt("");
                }}>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => changePrompt(e.target.value)}
                />
            </form>
            {chatlog.map((msg) => (
                <p>{msg}</p>
            ))}
        </Default>
    );
}
export default Ama