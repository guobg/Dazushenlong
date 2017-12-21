import {connect} from 'react-redux';
import Product from '../components/product/Product/Product';

const mapStateToProps = (state) => {
    return {
        product: state.product,
        unit: state.unit
    }
};

export default connect(mapStateToProps)(Product);