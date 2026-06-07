import { useOptions } from '../../components/customs/Options';
import program_tree from '../../../assets/images/calculators/hackers/program tree.jpg';
import { useEffect } from 'react';

export default function Hackers() {
    const { toggleOptions, setOptions } = useOptions();
    useEffect(() => {
        setOptions(
            <div className="flex flex-col">
                <h1 className="text-2xl mb-4 justify-center">Select Program Levels</h1>
                <img src={program_tree} alt="program tree"></img>
            </div>,
        );
    });
    return <h1 className="text-8xl">Hackers</h1>;
}
