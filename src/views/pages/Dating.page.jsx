import Chatbot from '../components/customs/Chatbot';
import Default from '../components/layouts/Default';
import { dating } from '../../configs/chatbots/dating';

export default function Wrapper() {
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
            <Chatbot inputs={dating} />
        </Default>
    );
}
