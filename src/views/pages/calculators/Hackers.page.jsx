import {
    getSettings,
    getPrograms,
    sides,
} from '@/configs/calculators/hackers.config';
import { topLevel, levels } from '@/data/calculators/hackers';
import program_tree from '@/assets/images/calculators/hackers/program tree.jpg';
import add from '@/assets/images/calculators/add.jpg';
import remove from '@/assets/images/calculators/remove.jpg';
import { useOptions } from '../../components/customs/Options';
import Section from '../../components/customs/Section';
import Settings from '../../components/calculators/Settings';
import Characters from '../../components/calculators/Characters';
import ImageSelect from '../../components/customs/ImageSelect';
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
                    <div className="flex justify-center">
                        {nodes.map((node, index) => (
                            <div className="grid grid-cols-[auto_auto] grid-rows-[1fr_auto]">
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
                                                state[side][index].level =
                                                    level;
                                                setState({ ...state });
                                            }}
                                            options={
                                                levels[node.type][bias(side)]
                                            }
                                        />
                                    </div>
                                </div>
                                {sides[side].tags.includes('defenders') &&
                                    node == nodes.at(-1) && (
                                        <button
                                            className="bg-blue-500 flex items-center"
                                            type="button"
                                            onClick={() => {
                                                state[side].push(
                                                    resetNode(
                                                        side,
                                                        topLevel[side][0].value,
                                                    ),
                                                );
                                                setState({ ...state });
                                            }}
                                        >
                                            <img
                                                src={add}
                                                alt="add another node"
                                            />
                                        </button>
                                    )}
                                {sides[side].tags.includes('defenders') &&
                                    nodes.length > 1 && (
                                        <button
                                            className="bg-red-500 flex items-center justify-self-center row-start-2"
                                            type="button"
                                            onClick={() => {
                                                state[side].splice(index, 1);
                                                setState({ ...state });
                                            }}
                                        >
                                            <img
                                                src={remove}
                                                alt="add another node"
                                            />
                                        </button>
                                    )}
                            </div>
                        ))}
                    </div>
                </Section>
            ))}
        </div>
    );
}
