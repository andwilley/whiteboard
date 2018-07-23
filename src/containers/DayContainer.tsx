import { connect } from 'react-redux';
import Day from '../components/Day';
import { IState } from '../types/State';
import { getCurrentDayId } from '../reducers';

const mapStateToProps = (state: IState) => {
    const dayId = getCurrentDayId(state);
    return {
        dayId,
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
