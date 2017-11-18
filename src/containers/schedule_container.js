import {connect} from 'react-redux';
import Schedule from '../components/schedule/Schedule';

const mapStateToProps = (state) => {
    return {
        schedule: state.schedule
    }
};

export default connect(mapStateToProps)(Schedule);