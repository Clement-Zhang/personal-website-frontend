import Default from "../templates/default"
import styles from "../styles/ama.module.css";
import library_styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { ChatContainer, MessageList, Message } from '@chatscope/chat-ui-kit-react';
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
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
            [prompt, result.response]
        ]);
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
                        {chatlog.flatMap(([prompt, response], i) => [
                            <Message
                                key={i * 2}
                                model={{
                                    message: prompt,
                                    sender: "User",
                                    direction: "outgoing",
                                }}
                            />,
                            <Message
                                key={i * 2 + 1}
                                model={{
                                    message: response,
                                    sender: "Chatbot",
                                    direction: "incoming",
                                }}
                            />
                        ])}
                    </MessageList>
                </ChatContainer>
            </div>
            <div className={styles.input}>
                <Form
                    onSubmit={(e) => (submit(e))}>
                    <Row>
                        <Col>
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