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
        pilotSymbols: sortie.front.symbols,
        wso: sortie.back.inputName,
        wsoCodes: sortie.back.codes.join(' '),
        wsoSymbols: sortie.back.symbols,
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
            onPilotNameChange: (inputValue: string) => {
                dispatch(actions.updatePuckName({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'front',
                    name: inputValue,
                }));
            },
            onPilotCodeChange: (inputValue: string) => {
                dispatch(actions.updatePuckCode({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'front',
                    codes: inputValue,
                }));
            },
            onPilotSymbolChange: (inputValue: string) => {
                dispatch(actions.updatePuckSymbol({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'front',
                    symbols: inputValue,
                }));
            },
            onWSONameChange: (inputValue: string) => {
                dispatch(actions.updatePuckName({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'back',
                    name: inputValue,
                }));
            },
            onWSOCodeChange: (inputValue: string) => {
                dispatch(actions.updatePuckCode({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'back',
                    codes: inputValue,
                }));
            },
            onWSOSymbolChange: (inputValue: string) => {
                dispatch(actions.updatePuckSymbol({
                    sortieId: ownProps.sortieId,
                    crewPosition: 'back',
                    symbols: inputValue,
                }));
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
