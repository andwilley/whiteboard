import * as React from 'react';
import IconButton from './IconButton';

interface IDayHeaderProps {
    dayId: string;
    totalFlightHours: number;
    totalSorties: number;
}

const DayHeader: React.SFC<IDayHeaderProps> = ({ dayId, totalFlightHours, totalSorties }) => {
    return (
        <div
            className={`d-flex justify-content-between flex-wrap
            flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom`}
        >
        <h1 className="h2">{dayId}</h1>
            <div className="btn-toolbar mb-2 mb-md-0">
                <div className="btn-group mr-2">
                    <IconButton
                        icon="plane"
                        viewBox="0 0 21 22"
                        pointer={false}
                        size={18}
                        className="h5"
                        style={{
                            margin: '.5rem .1rem 0 0',
                        }}
                    >
                        {totalSorties}
                    </IconButton>
                    <IconButton
                        icon="clock"
                        pointer={false}
                        size={18}
                        className="h5"
                        style={{
                            margin: '.5rem .1rem 0 .6rem',
                        }}
                    >
                        {totalFlightHours}
                    </IconButton>
                    {/* <button className="btn btn-sm btn-outline-secondary">{totalFlightTime}</button>
                        <button className="btn btn-sm btn-outline-secondary">{totalSorties}</button> */}
                </div>
            </div>
        </div>
    );
};

export default DayHeader;
