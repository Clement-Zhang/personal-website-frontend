import {
    settings,
    programs,
} from '../../../configs/calculators/hackers.config';
import { useOptions } from '../../components/customs/Options';
import Section from '../../components/customs/Section';
import Settings from '../../components/calculators/Settings';
import program_tree from '../../../assets/images/calculators/hackers/program tree.jpg';
import { useState, useEffect } from 'react';

export default function Hackers() {
    const [programsData, setProgramsData] = useState(
        programs.reduce((acc, program) => {
            acc[program] = 1;
            return acc;
        }, {}),
    );
    const { setOptions } = useOptions();
    useEffect(() => {
        setOptions(
            <div className="flex">
                <Section title="Select Program Levels">
                    <img
                        src={program_tree}
                        className="w-10/12 flex justify-center"
                        alt="program tree"
                    ></img>
                </Section>
                <Section title="Settings">
                    <Settings
                        data={settings}
                        onChange={(input) =>
                            (settings.find(
                                (setting) => setting.name == input.name,
                            ).value = input.value)
                        }
                    />
                </Section>
            </div>,
            () => 0,
        );
    }, []);
    return <h1 className="text-8xl">Hackers</h1>;
}
