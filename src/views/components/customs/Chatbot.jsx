import { useState } from 'react';

export default function Chatbot({
    messages,
    inputs = { text: 'Enter your prompt' },
}) {
    const [botData, setBotData] = useState(
        Object.entries(inputs).reduce((acc, input) => {
            acc[input[0]] = '';
            return acc;
        }, {})
    );
    return (
        <>
            <div className="h-96 overflow-auto p-4">
                {messages.map((message) => (
                    <p
                        className={
                            'bg-chatbot-message rounded-3xl max-w-5xl break-words px-3 py-2 mb-4 min-h-8 ' +
                            (message.position === 'right' ? 'ml-auto' : 'mr-auto')
                        }
                    >
                        {message.content}
                    </p>
                ))}
            </div>
            {Object.keys(inputs).includes('text') && (
                <input
                    type="text"
                    value={botData.text}
                    placeholder={inputs.text}
                    className="rounded-3xl w-full outline-none px-3 py-2 min-h-8"
                    onChange={(e) =>
                        setBotData((prev) => ({
                            ...prev,
                            text: e.target.value,
                        }))
                    }
                />
            )}
        </>
    );
}
