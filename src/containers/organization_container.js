import {connect} from 'react-redux';
import Organization from '../components/HR/organization/Organization';

const mapStateToProps = (state) => {
    return {
        organization: state.organization
    }
};

export default connect(mapStateToProps)(Organization);