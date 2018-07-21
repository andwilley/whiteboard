import { connect } from 'react-redux';
import { errorLocs } from '../errors';
import Day from '../components/Day';
import { IState } from '../types/State';
import { getEntityErrors } from '../reducers/errorReducer';
import { getCurrentDayId } from '../reducers';

const mapStateToProps = (state: IState) => {
    const dayId = getCurrentDayId(state);
    return {
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
