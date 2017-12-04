import {connect} from 'react-redux';
import OrganizationInfo from '../components/HR/organization/OrganizationInfo';

const mapStateToProps = (state) => {
    return {
        employee: state.employee
    }
};

export default connect(mapStateToProps)(OrganizationInfo);