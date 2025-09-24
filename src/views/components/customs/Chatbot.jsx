import send from '../../../assets/images/send.jpg';
import { useState, useRef, useEffect } from 'react';

export default function Chatbot({ inputs = { text: 'Enter your prompt' } }) {
    const [inputData, setInputData] = useState(
        Object.entries(inputs).reduce((acc, input) => {
            if (input[0] === 'text') {
                acc[input[0]] = '';
            }
            return acc;
        }, {})
    );
    const [messages, setMessages] = useState([]);
    const textInputRef = useRef(null);
    const windowRef = useRef(null);
    useEffect(() => {
        windowRef.current?.scrollIntoView();
    }, [messages]);
    return (
        <>
            <div className="h-96 overflow-auto p-4">
                {messages.map((message, index) => (
                    <p
                        className={
                            'bg-chatbot-message rounded-3xl w-fit max-w-5xl break-words px-3 py-2 mb-4 min-h-8 ' +
                            (message.position === 'right'
                                ? 'ml-auto'
                                : 'mr-auto')
                        }
                        key={index}
                    >
                        {message.content}
                    </p>
                ))}
                <div ref={windowRef} />
            </div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    setMessages((prev) => [
                        ...prev,
                        {
                            position: 'right',
                            content: inputData.text,
                        },
                    ]);
                    setInputData(
                        Object.entries(inputs).reduce((acc, input) => {
                            if (input[0] === 'text') {
                                acc[input[0]] = '';
                            }
                            return acc;
                        }, {})
                    );
                    const response = await inputs.submit(inputData.text);
                    setMessages((prev) => [
                        ...prev,
                        {
                            position: 'left',
                            content: response,
                        },
                    ]);
                }}
                className="p-4"
            >
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
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    e.target.form.requestSubmit();
                                }
                            }}
                        />
                    )}
                    {inputs.submit && (
                        <button type="submit" className="w-10 h-10">
                            <img src={send} alt="Send" />
                        </button>
                    )}
                </div>
                {inputs.reset && (
                    <button
                        type="button"
                        className="bg-red-500 w-16 h-8 rounded-full px-1 m-2"
                        onClick={async () => {
                            await inputs.reset();
                            setMessages((prev) => [
                                ...prev,
                                {
                                    position: 'left',
                                    content: 'Chatbot has been reset.',
                                },
                            ]);
                        }}
                    >
                        Reset
                    </button>
                )}
            </form>
        </>
    );
}
