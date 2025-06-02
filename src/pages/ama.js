import Default from "../templates/default";
import styles from "../styles/ama.module.css";
import library_styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { ChatContainer, MessageList, Message } from "@chatscope/chat-ui-kit-react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
const Ama = () => {
    const [prompt, changePrompt] = useState("");
    const [chatlog, updateChatlog] = useState([]);
    async function submitPrompt() {
        updateChatlog((chatlog) => [
            ...chatlog,
            prompt
        ]);
        const res = await fetch("/deepseek", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt })
        });
        const result = await res.json();
        updateChatlog((chatlog) => [
            ...chatlog,
            result.response
        ]);
        console.log(chatlog);
    }
    function submit(e) {
        e.preventDefault();
        submitPrompt();
        changePrompt("");
    }
    return (
        <Default>
            <p>This is a chatbot for you to ask me for my opinions on things so that I don't have to
                personally answer everyone's questions. Or, if you will, this is a glorified
                compressed automated FAQ.
            </p>
            <div className={styles.output}>
                <ChatContainer>
                    <MessageList>
                        {chatlog.map((message, i) => (
                            <Message
                                key={i}
                                model={{
                                    message: message,
                                    sender: i % 2 === 0 ? "User" : "Bot",
                                    direction: i % 2 === 0 ? "outgoing" : "incoming",
                                }} />
                        ))}
                    </MessageList>
                </ChatContainer>
            </div>
            <div className={styles.input}>
                <Form
                    onSubmit={(e) => (submit(e))}>
                    <Row>
                        <Col className="col-lg-11 col-sm-10 col-9">
                            <div className={styles.box}>
                                <Form.Control
                                    className={styles.text}
                                    as="textarea"
                                    value={prompt}
                                    onChange={(e) => {
                                        changePrompt(e.target.value);
                                        let elem = e.target;
                                        elem.style.height = "auto";
                                        elem.style.height = elem.scrollHeight + "px";
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !e.shiftKey) {
                                            submit(e);
                                        }
                                    }}
                                />
                            </div>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Default>
    );
}
export default Ama