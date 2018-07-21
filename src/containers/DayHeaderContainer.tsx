import { connect } from 'react-redux';
import { IState } from '../types/State';
import { getTotalFlightTimeAndSorties } from '../reducers/flightsReducer';
import { getCurrentDayId } from '../reducers';
import DayHeader from '../components/DayHeader';

const mapStateToProps = (state: IState) => {
    const currentDayId = getCurrentDayId(state);
    const totalFlightTimeAndSorties = getTotalFlightTimeAndSorties(state.flights, currentDayId);
    return {
        dayId: currentDayId,
        totalFlightHours: totalFlightTimeAndSorties.totalFlightTime,
        totalSorties: totalFlightTimeAndSorties.totalSorties,
    };
};

const DayHeaderContainer = connect(
    mapStateToProps
)(DayHeader);

export default DayHeaderContainer;
