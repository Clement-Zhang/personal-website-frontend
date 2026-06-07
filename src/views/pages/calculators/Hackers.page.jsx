import { useOptions } from '../../components/customs/Options';
import program_tree from '../../../assets/images/calculators/hackers/program tree.jpg';
import { useEffect } from 'react';

export default function Hackers() {
    const { toggleOptions, setOptions } = useOptions();
    useEffect(() => {
        setOptions(
            <div className="flex">
                <div className="flex-1">
                    <h1 className="flex mb-2 justify-center">
                        Select Program Levels
                    </h1>
                    <img
                        src={program_tree}
                        alt="program tree"
                    ></img>
                </div>
                <h1 className="flex flex-1 mb-2 justify-center">
                    Select User Capabilities
                </h1>
            </div>,
        );
    });
    return <h1 className="text-8xl">Hackers</h1>;
}
