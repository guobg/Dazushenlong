import {connect} from 'react-redux';
import Member from '../components/member/Member';

const mapStateToProps = (state) => {
    return {
        member: state.member
    }
};

export default connect(mapStateToProps)(Member);