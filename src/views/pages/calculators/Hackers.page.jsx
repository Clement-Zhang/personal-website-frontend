import {
    getSettings,
    getPrograms,
    sides,
} from '@/configs/calculators/hackers.config';
import { topLevel, levels, programs } from '@/data/calculators/hackers';
import program_tree from '@/assets/images/calculators/hackers/program tree.jpg';
import { useOptions } from '../../components/customs/Options';
import Section from '../../components/customs/Section';
import Settings from '../../components/calculators/Settings';
import Characters from '../../components/calculators/Characters';
import ImageSelect from '../../components/customs/ImageSelect';
import List from '../../components/calculators/List';
import { useState, useEffect } from 'react';

function bias(side) {
    return sides[side].tags.includes('defenders') ? 'high' : 'low';
}

function resetNode(side, type) {
    return { type, level: levels[type][bias(side)][0].value };
}

export default function Hackers() {
    const [settingsData, setSettingsData] = useState(getSettings);
    const [programsData, setProgramsData] = useState(getPrograms);
    const [state, setState] = useState(() =>
        Object.fromEntries(
            Object.entries(topLevel).map(([side, nodes]) => [
                side,
                [resetNode(side, nodes[0].value)],
            ]),
        ),
    );
    const [loadout, setLoadout] = useState(['beam']);
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
        <div className="flex lg:flex-row flex-col">
            {Object.entries(state).map(([side, nodes]) => (
                <Section title={side}>
                    <List
                        items={nodes.map((node, index) => (
                            <div className="flex w-fit p-1 gap-x-3 border">
                                <div className="flex flex-col items-center">
                                    <p>Node Type</p>
                                    <ImageSelect
                                        value={node.type}
                                        onChange={(type) => {
                                            state[side][index] = resetNode(
                                                side,
                                                type,
                                            );
                                            setState({ ...state });
                                        }}
                                        options={topLevel[side]}
                                    />
                                </div>
                                <div className="flex flex-col items-center">
                                    <p>Node Level</p>
                                    <ImageSelect
                                        key={node.type}
                                        value={node.level}
                                        onChange={(level) => {
                                            state[side][index].level = level;
                                            setState({ ...state });
                                        }}
                                        options={levels[node.type][bias(side)]}
                                    />
                                </div>
                            </div>
                        ))}
                        append={{
                            condition: () =>
                                sides[side].tags.includes('defenders'),
                            operation: () => {
                                state[side].push(
                                    resetNode(side, topLevel[side][0].value),
                                );
                                setState({ ...state });
                            },
                        }}
                        remove={{
                            condition: () =>
                                sides[side].tags.includes('defenders'),
                            operation: (index) => {
                                state[side].splice(index, 1);
                                setState({ ...state });
                            },
                        }}
                    />
                    {sides[side].tags.includes('attacker') && (
                        <div className="flex items-center m-2">
                            <h6 className="m-1">Loadout:</h6>
                            <List
                                items={loadout.map((program, index) => (
                                    <ImageSelect
                                        value={program}
                                        onChange={(value) => {
                                            loadout[index] = value;
                                            setLoadout([...loadout]);
                                        }}
                                        options={programs}
                                        imgWidth="w-9"
                                        arrowWidth="w-2"
                                    />
                                ))}
                                append={{
                                    condition: () => true,
                                    operation: () => {
                                        loadout.push(programs[0].value);
                                        setLoadout([...loadout]);
                                    },
                                }}
                                remove={{
                                    condition: () => true,
                                    operation: (index) => {
                                        loadout.splice(index, 1);
                                        setLoadout([...loadout]);
                                    },
                                }}
                            />
                        </div>
                    )}
                </Section>
            ))}
        </div>
    );
}
