import {connect} from 'react-redux';
import Position from '../components/HR/position/Position';

const mapStateToProps = (state) => {
    return {
        position: state.position
    }
};

export default connect(mapStateToProps)(Position);