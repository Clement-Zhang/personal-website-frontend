import { getSettings, getPrograms } from '@/configs/calculators/hackers.config';
import { topLevel, lowLevels } from '@/data/calculators/hackers';
import program_tree from '@/assets/images/calculators/hackers/program tree.jpg';
import { useOptions } from '../../components/customs/Options';
import Section from '../../components/customs/Section';
import Settings from '../../components/calculators/Settings';
import Characters from '../../components/calculators/Characters';
import ImageSelect from '../../components/customs/ImageSelect';
import { useState, useEffect } from 'react';

export default function Hackers() {
    const [settingsData, setSettingsData] = useState(getSettings);
    const [programsData, setProgramsData] = useState(getPrograms);
    const [attacker, setAttacker] = useState({
        node: topLevel[0].value,
        level: lowLevels[topLevel[0].value][0].value,
    });
    const { setOptions } = useOptions();
    useEffect(() => {
        setOptions(
            <div className="flex flex-col lg:flex-row">
                <Section title="Select Program Levels">
                    <Characters
                        img={{ src: program_tree, alt: 'program_tree' }}
                        characters={programsData}
                        onChange={(input) => {
                            programsData[input.name].value = input.value;
                            setProgramsData({ ...programsData });
                        }}
                    />
                </Section>
                <Section title="Settings">
                    <Settings
                        settings={settingsData}
                        onChange={(input) => {
                            const setting = settingsData.find(
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
    return (
        <div className="flex">
            <Section title="Attacker Node">
                <div className="flex justify-center">
                    <div className="flex w-fit p-1 gap-x-3 border">
                        <div className="flex flex-col items-center">
                            <p>Node Type</p>
                            <ImageSelect
                                value={attacker.node}
                                onChange={(attacker) => {
                                    setAttacker((prev) => ({
                                        ...prev,
                                        node: attacker,
                                        level: lowLevels[attacker][0].value,
                                    }));
                                }}
                                options={topLevel}
                            />
                        </div>
                        <div className="flex flex-col items-center">
                            <p>Node Level</p>
                            <ImageSelect
                                key={attacker.node}
                                value={attacker.level}
                                onChange={(level) => {
                                    setAttacker((prev) => ({
                                        ...prev,
                                        level: level,
                                    }));
                                }}
                                options={lowLevels[attacker.node]}
                            />
                        </div>
                    </div>
                </div>
            </Section>
            <Section title="Defender Nodes"></Section>
        </div>
    );
}
