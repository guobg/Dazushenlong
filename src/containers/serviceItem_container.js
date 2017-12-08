import {connect} from 'react-redux';
import ServiceItem from '../components/serviceItem/ServiceItem';

const mapStateToProps = (state) => {
    return {
        serviceItem: state.serviceItem
    }
};

export default connect(mapStateToProps)(ServiceItem);