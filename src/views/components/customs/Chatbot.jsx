import send from '../../../assets/images/send.jpg';
import { useState, useRef } from 'react';

export default function Chatbot({
    inputs = { text: 'Enter your prompt' },
    submit = null,
}) {
    const [inputData, setInputData] = useState(
        Object.entries(inputs).reduce((acc, input) => {
            acc[input[0]] = '';
            return acc;
        }, {})
    );
    const [messages, setMessages] = useState([
        { content: 'textsadfasdf'.repeat(100), position: 'right' },
        { content: 'textsadfasdf'.repeat(100), position: 'left' },
    ]);
    const textInputRef = useRef(null);
    return (
        <>
            <div className="h-96 overflow-auto p-4">
                {messages.map((message) => (
                    <p
                        className={
                            'bg-chatbot-message rounded-3xl max-w-5xl break-words px-3 py-2 mb-4 min-h-8 ' +
                            (message.position === 'right'
                                ? 'ml-auto'
                                : 'mr-auto')
                        }
                    >
                        {message.content}
                    </p>
                ))}
            </div>
            <div className="flex gap-2 items-end *:rounded-3xl">
                {Object.keys(inputs).includes('text') && (
                    <textarea
                        ref={textInputRef}
                        value={inputData.text}
                        placeholder={inputs.text}
                        className="w-full outline-none resize-none overflow-y-auto overflow-x-hidden px-3 py-2 min-h-4"
                        rows={1}
                        onChange={(e) => {
                            setInputData((prev) => ({
                                ...prev,
                                text: e.target.value,
                            }));
                            const textInput = textInputRef.current;
                            textInput.style.height = 'auto';
                            const scrollHeight = textInput.scrollHeight;
                            textInput.style.height =
                                scrollHeight > 180
                                    ? '180px'
                                    : scrollHeight + 'px';
                        }}
                    />
                )}
                {submit && (
                    <button className="w-10 h-10">
                        <img
                            src={send}
                            alt="Send"
                            onClick={() => {
                                submit(inputData);
                                setInputData(
                                    Object.entries(inputs).reduce(
                                        (acc, input) => {
                                            acc[input[0]] = '';
                                            return acc;
                                        },
                                        {}
                                    )
                                );
                            }}
                        />
                    </button>
                )}
            </div>
        </>
    );
}
