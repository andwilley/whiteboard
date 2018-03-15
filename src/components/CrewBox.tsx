import * as React from 'react';

interface ICrewBoxProps {
    crewPilot: string;
    crewWso: string;
}

const CrewBox: React.SFC<ICrewBoxProps> = ({ crewPilot, crewWso }) => (
    <div>
        <input
            type="text"
            placeholder="Pilot"
            name="crew"
            value={crewPilot}
        />
        <input
            type="text"
            placeholder="WSO"
            name="crew"
            value={crewWso}
        />
    </div>
);

export default CrewBox;
