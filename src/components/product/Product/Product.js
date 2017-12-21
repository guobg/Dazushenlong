import React, {Component} from 'react';
import ProductList from './ProductList';
import CreateProduct from './CreateProduct';
import Image from '../../common/Image';
import {getUnitList} from '../../../actions/unit_action';
import {FormattedMessage} from 'react-intl';

class Product extends Component {

    componentDidMount() {
        this.props.dispatch(getUnitList());
    };

    render() {
        const {dispatch, product, unit} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='product'
                        defaultMessage='Product'
                    />
                </div>
                <CreateProduct dispatch={dispatch} unit={unit}/>
                <ProductList dispatch={dispatch} product={product} unit={unit}/>
            </div>
        );
    }
}

export default Product;
