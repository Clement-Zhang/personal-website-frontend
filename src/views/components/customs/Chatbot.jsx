import send from '../../../assets/images/send.jpg';
import { stream } from '../../../services/socket.service';
import LoadBackend from '../layouts/LoadBackend';
import { defaults } from '../../../configs/chatbots/dating.config';
import { useState, useRef, useEffect } from 'react';

export default function Chatbot({
    config = { inputs: { text: 'Enter your prompt' } },
}) {
    const [inputData, setInputData] = useState(
        Object.entries(config.inputs).reduce((acc, input) => {
            acc[input[0]] = defaults[input[0]];
            return acc;
        }, {})
    );
    const [messages, setMessages] = useState([]);
    const [response, setResponse] = useState('');
    const textInputRef = useRef(null);
    const windowRef = useRef(null);

    useEffect(() => {
        windowRef.current?.scrollIntoView();
    }, [messages]);

    return (
        <LoadBackend>
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
                {response && (
                    <p className="bg-chatbot-message rounded-3xl w-fit max-w-5xl break-words px-3 py-2 mb-4 min-h-8 mr-auto">
                        Processing: {response}
                    </p>
                )}
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
                    let buffer = inputData.text;
                    setInputData(
                        Object.entries(config.inputs).reduce((acc, input) => {
                            acc[input[0]] = defaults[input[0]];
                            return acc;
                        }, {})
                    );
                    console.log('before pipeline', buffer);
                    config.submit.forEach(async (stage) => {
                        if (stage.type === 'proc') {
                            await stage.func(inputData.text);
                        } else if (stage.type === 'stream') {
                            setResponse('');
                            buffer = '';
                            console.log('before streaming', buffer);
                            const event = stage.event.split('.');
                            await stream(event[0], event[1], (data) => {
                                setResponse((prev) => prev + data.chunk);
                                buffer += data.chunk;
                            });
                            console.log('after streaming', buffer);
                        } else if (stage.type === 'func') {
                            buffer = await stage.func(buffer);
                            console.log('return value', buffer);
                        }
                    });
                    console.log('after pipeline', buffer);
                    setMessages((prev) => [
                        ...prev,
                        {
                            position: 'left',
                            content: buffer,
                        },
                    ]);
                    setResponse('');
                }}
                className="p-4"
            >
                <div className="flex gap-2 items-end *:rounded-3xl">
                    {Object.keys(config.inputs).includes('text') && (
                        <textarea
                            ref={textInputRef}
                            value={inputData.text}
                            placeholder={config.inputs.text}
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
                    {config.submit && (
                        <button type="submit" className="w-10 h-10">
                            <img src={send} alt="Send" />
                        </button>
                    )}
                </div>
                {config.reset && (
                    <button
                        type="button"
                        className="bg-red-500 w-16 h-8 rounded-full px-1 m-2"
                        onClick={async () => {
                            await config.reset();
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
        </LoadBackend>
    );
}
