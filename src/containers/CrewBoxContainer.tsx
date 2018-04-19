import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, ISorties } from '../types/State';
import CrewBox from '../components/CrewBox';

interface ICrewBoxContainerProps {
    sortieId: string;
}

const getSortieStrings = (sortie: ISorties) => {
    return {
        pilot: sortie.front.inputName,
        pilotCodes: sortie.front.codes.join(' '),
        pilotSymbols: sortie.front.symbols.join(),
        wso: sortie.back.inputName,
        wsoCodes: sortie.back.codes.join(' '),
        wsoSymbols: sortie.back.symbols.join(),
    };
};

const mapStateToProps = (state: IState, ownProps: ICrewBoxContainerProps) => {
    return {
        sortieStrings: {
            sortieId: ownProps.sortieId,
            ...getSortieStrings(state.sorties.byId[ownProps.sortieId]),
        },
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: ICrewBoxContainerProps) => {
    return {
        onInputChange: {
            onPilotNameChange: (val: string) => {
                dispatch(actions.updatePuckName({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'front',
                    name: val,
                }));
            },
            onPilotCodeChange: (val: string) => {
                dispatch({type: 'NOTHING'});
            },
            onPilotSymbolChange: (val: string) => {
                dispatch({type: 'NOTHING'});
            },
            onWSONameChange: (val: string) => {
                dispatch(actions.updatePuckName({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'back',
                    name: val,
                }));
            },
            onWSOCodeChange: (val: string) => {
                dispatch({type: 'NOTHING'});
            },
            onWSOSymbolChange: (val: string) => {
                dispatch({type: 'NOTHING'});
            },
        },
        // onInputChange: (e: any) => {
        //     let inputSpecificAction;
        //     switch (e.target.name) {
        //         case 'pilot':
        //             inputSpecificAction = (value: string) => actions.updatePuckName({
        //                 sortieId: ownProps.sortieId,
        //                 crewPosition: 'front',
        //                 name: value,
        //             });
        //             break;
        //         case 'pilotCodes':
        //             inputSpecificAction = (value: string) => { return {}; };
        //             break;
        //         case 'pilotSymbols':
        //             inputSpecificAction = (value: string) => { return {}; };
        //             break;
        //         case 'wso':
        //             inputSpecificAction = (value: string) => actions.updatePuckName({
        //                 sortieId: ownProps.sortieId,
        //                 crewPosition: 'back',
        //                 name: value,
        //             });
        //             break;
        //         case 'wsoCodes':
        //             inputSpecificAction = (value: string) => { return {}; };
        //             break;
        //         case 'wsoSymbols':
        //             inputSpecificAction = (value: string) => { return {}; };
        //             break;
        //         default:
        //             inputSpecificAction = (value: string) => { return {}; };
        //             break;
        //     }
        //     dispatch(inputSpecificAction(e.target.value));
        // },
    };
};

const CrewBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CrewBox);

export default CrewBoxContainer;
