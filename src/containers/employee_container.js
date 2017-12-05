import {connect} from 'react-redux';
import Employee from '../components/HR/employee/Employee';

const mapStateToProps = (state) => {
    return {
        employee: state.employee,
        organization: state.organization,
        position: state.position
    }
};

export default connect(mapStateToProps)(Employee);