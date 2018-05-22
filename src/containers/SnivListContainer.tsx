import { connect } from 'react-redux';
import { IState } from '../types/State';
import SnivList from '../components/SnivList';

const mapStateToProps = (state: IState) => {
    return {
        snivs: state.snivs.allIds.map(snivId => state.snivs.byId[snivId]),
    };
};

const mapDispatchToProps = () => {
    return {
        onSubmitClick: () => null,
    };
};

const SnivListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SnivList);

export default SnivListContainer;
