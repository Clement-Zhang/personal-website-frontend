import Default from "../templates/default";
import styles from "../styles/ama.module.css";
import override_styles from "../styles/ama.css";
import ChatBot from "react-chatbotify";
import { usePaths, ChatBotProvider } from 'react-chatbotify';
import { useState, useEffect } from "react";
import MarkdownRenderer from "@rcb-plugins/markdown-renderer";

const Wrapper = () => {
    const { goToPath } = usePaths();
    const [change, setChange] = useState(null);
    const [flow, setFlow] = useState({
        start: addMarkdown({
            message: "",
            path: "sync",
        }),
        sync: addMarkdown({
            message: "",
            path: "sync",
        })
    });
    function addMarkdown(block) {
        return {
            ...block,
            renderMarkdown: ["BOT", "USER"],
        }
    }
    async function submit(e) {
        const res = await fetch("/deepseek", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: e.data.inputText })
        });
        const result = await res.json();
        setFlow((prev) => {
            const block = {
                "interact": addMarkdown({
                    message: result.response,
                    path: "sync",
                })
            };
            if (prev.filler) {
                const { filler, ...next } = prev;
                return ({
                    ...next,
                    ...block,
                });
            } else {
                return ({
                    ...prev,
                    "filler": {},
                    ...block,
                });
            }
        });
        setChange((prev) => prev === null ? true : !prev);
        console.log(result.response);
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
        if (change !== null) {
            if (change && flow.filler || !change && !flow.filler) {
                goToPath("interact");
            }
        }
    }, [flow, change]);
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
                plugins={[MarkdownRenderer()]}
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