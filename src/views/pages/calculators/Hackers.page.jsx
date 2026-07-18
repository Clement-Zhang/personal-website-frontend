import { settings, programs } from '@/configs/calculators/hackers.config';
import { useOptions } from '../../components/customs/Options';
import Section from '../../components/customs/Section';
import Settings from '../../components/calculators/Settings';
import program_tree from '@/assets/images/calculators/hackers/program tree.jpg';
import { useState, useEffect } from 'react';

export default function Hackers() {
    const [settingsData, setSettingsData] = useState(
        settings.reduce((acc, setting) => {
            if (setting.default) {
                setting.value = setting.default;
                delete setting.default;
            }
            acc.push(setting);
            return acc;
        }, []),
    );
    const [programsData, setProgramsData] = useState(
        programs.reduce((acc, program) => {
            acc[Object.keys(program)[0]] = 0;
            return acc;
        }, {}),
    );
    const { setOptions } = useOptions();
    useEffect(() => {
        setOptions(
            <div className="flex flex-col lg:flex-row">
                <Section title="Select Program Levels">
                    <img
                        src={program_tree}
                        className="w-10/12 flex justify-center"
                        alt="program tree"
                    ></img>
                </Section>
                <Section title="Settings">
                    <Settings
                        data={settingsData}
                        onChange={(input) => {
                            let setting = settingsData.find(
                                (setting) => setting.name == input.name,
                            );
                            setting.value = input.value;
                            setSettingsData([...settingsData]);
                        }}
                    />
                </Section>
            </div>,
            () => 0,
        );
    }, [settingsData]);
    return <h1 className="text-8xl!">Hackers</h1>;
}
