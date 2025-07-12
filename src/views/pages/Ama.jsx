import Ama from '../components/Ama';
import { ChatBotProvider } from 'react-chatbotify';

export default function Wrapper() {
    return (
        <ChatBotProvider>
            <Ama />
        </ChatBotProvider>
    );
}
