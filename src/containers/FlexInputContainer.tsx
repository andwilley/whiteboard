import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, IFlightTimes, IAircrew } from '../types/State';
import { IAction } from '../actions';
import FlexInput from '../components/FlexInput';
import validator from '../util/validator';
const { updateFlightTime } = actions;

interface IFlexInputContainerProps {
    placeHolder: string;
    name: string;
    value: string;
    onChange: (e: any) => any;
    validators?: string[];
    addNameIdTo: string;
}

const getAircrewById = (state: IState): IAircrew[] => {
    return state.aircrew.allIds.map(id => state.aircrew.byId[id])
};

const getAircrewRefIds = (state) => {
    /**
     * @param {IState} state The application state
     * @returns {object} keyed by aircrewId with values set to an array of the timespans associated with each ref
     */
    
};

const getOnChangeWithNameMatch = (dispatch: any, ownProps: IFlexInputContainerProps) => {
    /** 
     * @param {function} dispatch
     * @param {IFlexInputContainerProps} ownProps Props passed to this container
     * @returns {function} If addNameIdTo is specified, returns updated onChange function. If not specified, returns
     * the same onChange function.
     */
    if (!addNameIdTo) {
        return ownProps.onChange;
    }
    getAircrewRefIds(); // right now, this won't work, state isn't available here...
    switch (addNameIdTo) {
        case 'frontSeat':
            return (e) => {
                
            };
        case 'backSeat':
        case 'note':
        default:
            
    }
};

const mapStateToProps = (state: IState, ownProps: IFlexInputContainerProps) => {
    return {
        placeHolder: ownProps.placeHolder,
        name: ownProps.name,
        value: ownProps.value,
        errors,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: IFlexInputContainerProps) => {
    return {
        onChange: getOnChangeWithNameMatch(dispatch, ownProps),
    };
};

const FlexInputContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlexInput);

export default FlexInputContainer;
