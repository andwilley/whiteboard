import { connect } from 'react-redux';
import { errorLocs } from '../errors';
import Day from '../components/Day';
import { IState } from '../types/State';
import { getEntityErrors } from '../reducers/errorReducer';

const getDayId = (state: IState) => {
    return state.crewListUI.currentDay;
};

const mapStateToProps = (state: IState) => {
    const dayId = getDayId(state);
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
