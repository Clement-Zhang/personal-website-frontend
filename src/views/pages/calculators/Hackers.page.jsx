import { settings, programs } from '@/configs/calculators/hackers.config';
import program_tree from '@/assets/images/calculators/hackers/program tree.jpg';
import { useOptions } from '../../components/customs/Options';
import Section from '../../components/customs/Section';
import Settings from '../../components/calculators/Settings';
import Characters from '../../components/calculators/Characters';
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
        Object.keys(programs).reduce((acc, program) => {
            acc[program] = 0;
            return acc;
        }, {}),
    );
    const { setOptions } = useOptions();
    useEffect(() => {
        setOptions(
            <div className="flex flex-col lg:flex-row">
                <Section title="Select Program Levels">
                    <Characters
                        img={{ src: program_tree, alt: 'program_tree' }}
                        characters={programsData}
                        inputs={programs}
                        onChange={(input) =>
                            setProgramsData((prev) => ({
                                ...prev,
                                [input.name]: input.value,
                            }))
                        }
                    />
                </Section>
                <Section title="Settings">
                    <Settings
                        settings={settingsData}
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
    }, [settingsData, programsData]);
    return <h1 className="text-8xl!">Hackers</h1>;
}
