import Default from "../templates/default";
import styles from "../styles/ama.module.css";
import override_styles from "../styles/ama.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ChatBot from "react-chatbotify";
import { usePaths, ChatBotProvider } from 'react-chatbotify';
import { useState, useEffect } from "react";

const Wrapper = () => {
    const { goToPath } = usePaths();
    const [index, setIndex] = useState(0);
    const [nextPath, setNextPath] = useState(null);
    const [flow, setFlow] = useState({
        start: {
            message: "",
            path: "sync",
        },
        sync: {
            message: "",
            path: "sync",
        }
    });
    async function submit(e) {
        console.log("sending");
        const res = await fetch("/deepseek", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: e.data.inputText })
        });
        const result = await res.json();
        const newPath = "interact" + index;
        setFlow((prev) => ({
            ...prev,
            [newPath]: {
                message: result.response,
                path: "sync",
            },
        }));
        setNextPath(newPath);
        console.log("flow changed");
    }
    function grow(e) {
        const elem = document.querySelector(".rcb-chat-input-textarea");
        elem.style.height = "auto";
        const scrollHeight = elem.scrollHeight;
        if (scrollHeight > 200) {
            elem.style.height = "200px";
        } else {
            elem.style.height = scrollHeight + "px";
        }
    }
    useEffect(() => {
        if (nextPath && flow[nextPath]) {
            goToPath(nextPath);
            setIndex((prev) => prev + 1);
            setNextPath(null); // reset so this effect doesn't run again unnecessarily
        }
    }, [flow, nextPath]);
    useEffect(() => {
        localStorage.removeItem('rcb-history');
        sessionStorage.removeItem('rcb-history');
        window.addEventListener("rcb-user-submit-text", submit);
        window.addEventListener("rcb-text-area-change-value", grow);
        return () => {
            window.removeEventListener("rcb-user-submit-text", submit);
            window.removeEventListener("rcb-text-area-change-value", grow);
        };
    }, []);
    return (
        <Default>
            <p>This is a chatbot for you to ask me for my opinions on things so that I don't have to
                personally answer everyone's questions. Or, if you will, this is a glorified
                compressed automated FAQ.
            </p>
            <ChatBot
                flow={flow}
                settings={{
                    event: {
                        rcbUserSubmitText: true,
                        rcbTextAreaChangeValue: true,
                    },
                    general: {
                        embedded: true,
                        showHeader: false,
                        showFooter: false,
                    },
                    chatHistory: {
                        disabled: true,
                    }
                }}
            />
        </Default>
    );
}

const Ama = () => {
    return (
        <ChatBotProvider>
            <Wrapper />
        </ChatBotProvider>
    );
}
export default Ama