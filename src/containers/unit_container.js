import {connect} from 'react-redux';
import Unit from '../components/product/Unit/Unit';

const mapStateToProps = (state) => {
    return {
        unit: state.unit
    }
};

export default connect(mapStateToProps)(Unit);