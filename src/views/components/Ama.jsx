import { submit, reset } from '../../services/ama';
import Default from '../templates/Default';
import styles from '../../assets/css/ama.module.css';
import override_styles from '../../assets/css/ama.css';
import Button from 'react-bootstrap/Button';
import ChatBot from 'react-chatbotify';
import { usePaths } from 'react-chatbotify';
import { useState, useEffect } from 'react';
import MarkdownRenderer from '@rcb-plugins/markdown-renderer';

export default function Ama() {
    const { goToPath } = usePaths();
    const [change, setChange] = useState(null);
    const [flow, setFlow] = useState({
        start: addMarkdown({
            message: '',
            path: 'sync',
        }),
        sync: addMarkdown({
            message: '',
            path: 'sync',
        }),
    });
    useEffect(() => {
        if (change !== null) {
            if ((change && flow.filler) || (!change && !flow.filler)) {
                goToPath('interact');
            }
        }
    }, [flow, change]);
    useEffect(() => {
        localStorage.removeItem('rcb-history');
        sessionStorage.removeItem('rcb-history');
        async function submitter(e) {
            replaceBlock(await submit(e));
            setChange((prev) => (prev === null ? true : !prev));
        }
        const grower = (e) => grow(e);
        window.addEventListener('rcb-user-submit-text', submitter);
        window.addEventListener('rcb-text-area-change-value', grower);
        return () => {
            window.removeEventListener('rcb-user-submit-text', submitter);
            window.removeEventListener('rcb-text-area-change-value', grower);
        };
    }, []);
    function addMarkdown(block) {
        return {
            ...block,
            renderMarkdown: ['BOT', 'USER'],
        };
    }
    function replaceBlock(message) {
        setFlow((prev) => {
            const block = addMarkdown({
                message: message,
                path: 'sync',
            });
            if (prev.filler) {
                const { filler, ...next } = prev;
                return {
                    ...next,
                    interact: block,
                };
            } else {
                return {
                    ...prev,
                    filler: {},
                    interact: block,
                };
            }
        });
    }
    function grow(e) {
        const elem = document.querySelector('.rcb-chat-input-textarea');
        elem.style.height = 'auto';
        const scrollHeight = elem.scrollHeight;
        if (scrollHeight > 200) {
            elem.style.height = '200px';
        } else {
            elem.style.height = scrollHeight + 'px';
        }
    }
    return (
        <Default>
            <p>
                This is a proof of concept for a dating app. First, click the
                reset button to ensure the chatbot has demo data loaded
                correctly. Then, give it a profile with at minimum your name,
                gender, and the gender you want to be matched with, in first
                person. Providing likes and dislikes will allow the chatbot to
                generate better matches. Matches are generated in JSON format to
                demonstrate the api's ability to integrate with a frontend.
                Please do <i>not</i> input too many messages, as the chatbot
                uses free AI APIs that have a limit on the number of free
                requests.
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
                    },
                }}
            />
            <Button
                variant="danger"
                onClick={() => {
                    reset();
                    replaceBlock('Chatbot has been reset.');
                    setChange((prev) => (prev === null ? true : !prev));
                }}
            >
                Reset
            </Button>
        </Default>
    );
}
