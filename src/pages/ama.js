import Default from "../templates/default";
import styles from "../styles/ama.module.css";
import override_styles from "../styles/ama.css";
import Button from 'react-bootstrap/Button';
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
    function replaceBlock(message) {
        setFlow((prev) => {
            const block = addMarkdown({
                message: message,
                path: "sync",
            });
            if (prev.filler) {
                const { filler, ...next } = prev;
                return ({
                    ...next,
                    interact: block,
                });
            } else {
                return ({
                    ...prev,
                    "filler": {},
                    interact: block,
                });
            }
        });
    }
    async function submit(e) {
        const res = await fetch("/deepseek", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: e.data.inputText }),
        });
        const result = await res.json();
        const response = result.response;
        if (response === "fail") {
            replaceBlock("You need to provide more information for me to generate matches. Start with your gender and sexuality. Providing likes and dislikes will allow me to generate better matches.");
        } else {
            const res = await fetch("/match", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ profile: response }),
            });
            const result = await res.json();
            const profiles = result.matches;
            console.log("Received profiles:", profiles);
            replaceBlock(JSON.stringify(profiles, null, "\t"));
        }
        setChange((prev) => prev === null ? true : !prev);
    }
    async function reset() {
        await fetch("/reset", {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        });
        replaceBlock("Chatbot has been reset.");
        setChange((prev) => prev === null ? true : !prev);
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
        console.log("Flow changed", flow, change);
        if (change !== null) {
            if (change && flow.filler || !change && !flow.filler) {
                console.log("executed");
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
            <p>This is a proof of concept for a dating app. 
                First, click the reset button to ensure the chatbot has demo data loaded correctly.
                Then, give it a profile with at minimum your name, gender, and the gender you want to be matched with, in first person.
                Providing likes and dislikes will allow the chatbot to generate better matches.
                Matches are generated in JSON format to demonstrate the api's ability to integrate with a frontend.
                Please do <i>not</i> input too many messages, as the chatbot uses free AI APIs that have a limit on the number of free requests.
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
            <Button variant="danger" onClick={reset}>Reset</Button>
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