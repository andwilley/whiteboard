import { connect } from 'react-redux';
import { IState, UErrorLocs } from '../types/State';
import { getEntityErrors } from '../reducers';
import ErrorList from '../components/ErrorList';

interface IErrorListContainerProps {
    className?: string;
    errorLoc: UErrorLocs;
    errorLocId: string;
}

const mapStateToProps = (state: IState, ownProps: IErrorListContainerProps) => {
    return {
        errors: getEntityErrors(state, ownProps.errorLoc)[ownProps.errorLocId],
    };
};

const ErrorListContainer = connect(
    mapStateToProps
)(ErrorList);

export default ErrorListContainer;
