import { connect } from 'react-redux';
import { IState } from '../types/State';
import SnivList from '../components/SnivList';

const mapStateToProps = (state: IState) => {
    return {
        snivs: ['sniv 1', 'sniv 2', 'sniv 3'],
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
