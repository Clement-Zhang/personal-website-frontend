import { useOptions } from '../../components/customs/Options';
import program_tree from '../../../assets/images/calculators/hackers/program tree.jpg';
import { useEffect } from 'react';

export default function Hackers() {
    const { toggleOptions, setOptions } = useOptions();
    useEffect(() => {
        setOptions(
            <div className="flex">
                <div>
                    <h1 className="flex mb-2 justify-center">
                        Select Program Levels
                    </h1>
                    <img
                        src={program_tree}
                        className="w-1/2"
                        alt="program tree"
                    ></img>
                </div>
            </div>,
        );
    });
    return <h1 className="text-8xl">Hackers</h1>;
}
