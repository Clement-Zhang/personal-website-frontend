import { getSettings, getPrograms } from '@/configs/calculators/hackers.config';
import { topLevel } from '@/data/calculators/hackers';
import { lowLevels } from '../../../data/calculators/hackers';
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
    const [attacker, setAttacker] = useState(topLevel[0].value);
    const [attackerLevel, setAttackerLevel] = useState(
        lowLevels[attacker][0].value,
    );
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
                <div className="flex justify-center gap-x-3">
                    <div className="flex flex-col items-center">
                        <p>Node Type</p>
                        <ImageSelect
                            value={attacker}
                            onChange={(attacker) => {
                                setAttacker(attacker);
                                setAttackerLevel(lowLevels[attacker][0].value)
                            }}
                            options={topLevel}
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <p>Node Level</p>
                        <ImageSelect
                            key={attacker}
                            value={attackerLevel}
                            onChange={(level) => {
                                setAttackerLevel(level);
                            }}
                            options={lowLevels[attacker]}
                        />
                    </div>
                </div>
            </Section>
            <Section title="Defender Nodes"></Section>
        </div>
    );
}
