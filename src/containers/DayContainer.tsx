import { connect } from 'react-redux';
import { errorLocs } from '../errors';
import Day from '../components/Day';
import { IState, IFlights, IEntity } from '../types/State';
import { getEntityErrors } from '../reducers/errorReducer';
import { conv24HrTimeToMoment } from '../types/utilFunctions';
import * as Moment from 'moment';

const getDayId = (state: IState) => {
    return state.crewListUI.currentDay;
};

interface ITotalFlightTimeAndSortiesAcc {
    totalFlightTime: number;
    totalSorties: number;
}

const getTotalFlightTimeAndSorties = (flights: IEntity<IFlights>, dayId: string): ITotalFlightTimeAndSortiesAcc => {
    return flights.allIds.reduce((totalFlightTimeAndSorties: ITotalFlightTimeAndSortiesAcc, flightId) => {
        const takeoff = conv24HrTimeToMoment(flights.byId[flightId].times.takeoff, dayId);
        const land = conv24HrTimeToMoment(flights.byId[flightId].times.land, dayId);
        if (flights.byId[flightId].sim) {
            return totalFlightTimeAndSorties;
        }
        if (!takeoff.isValid() || !land.isValid()) {
            return {
                totalFlightTime: totalFlightTimeAndSorties.totalFlightTime,
                totalSorties: totalFlightTimeAndSorties.totalSorties + flights.byId[flightId].sorties.length,
            };
        }
        return {
            totalFlightTime: totalFlightTimeAndSorties.totalFlightTime +
                (Moment.duration(land.diff(takeoff)).asHours()) * flights.byId[flightId].sorties.length,
            totalSorties: totalFlightTimeAndSorties.totalSorties + flights.byId[flightId].sorties.length,
        };
    }, {totalFlightTime: 0, totalSorties: 0});
};

const mapStateToProps = (state: IState, ownProps: any) => {
    const dayId = getDayId(state);
    const totalFlightTimeAndSorties = getTotalFlightTimeAndSorties(state.flights, state.crewListUI.currentDay);
    return {
        children: ownProps.children,
        totalFlightTime: totalFlightTimeAndSorties.totalFlightTime.toFixed(1),
        totalSorties: totalFlightTimeAndSorties.totalSorties.toFixed(0),
        dayId,
        dayErrors: getEntityErrors(state.errors.byId, state.days.byId[dayId].errors, errorLocs.DAY),
        noteErrors: getEntityErrors(state.errors.byId, state.days.byId[dayId].errors, errorLocs.DAY_NOTE),
    };
};

// const mapDispatchToProps = (dispatch: any) => {
//     return {
//     };
// };

const DayContainer = connect(
    mapStateToProps
)(Day);

export default DayContainer;
