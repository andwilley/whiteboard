import * as React from 'react';
import { ISnivs } from '../types/State';

interface SnivListProps {
    snivs: ISnivs[];
    onSubmitClick: () => null;
}

const SnivList: React.SFC<SnivListProps> = ({snivs, onSubmitClick}) => {
    const snivList = snivs.map(sniv => (<div key={sniv.id}>{`${sniv.aircrewIds} ${sniv.message}`}</div>));
    return (
        <div>
            {snivList}
        </div>
    );
};

export default SnivList;
