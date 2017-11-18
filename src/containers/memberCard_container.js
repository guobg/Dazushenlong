import {connect} from 'react-redux';
import MemberCard from '../components/memberCard/MemberCard';

const mapStateToProps = (state) => {
    return {
        memberCard: state.memberCard
    }
};

export default connect(mapStateToProps)(MemberCard);