import {connect} from 'react-redux';
import Commission from '../components/serviceItem/Commission';

const mapStateToProps = (state) => {
    return {
        commission: state.commission
    }
};

export default connect(mapStateToProps)(Commission);