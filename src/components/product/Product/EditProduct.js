import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import ProductInfo from './ProductInfo';
import {updateProduct} from '../../../actions/product_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class EditProduct extends Component {
    state = {modalOpen: false, productInfo: {}};

    componentWillUpdate() {
        this.fixBody();
    }

    componentDidUpdate() {
        this.fixBody();
    }

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    openModal = (product) => {
        this.setState({
            modalOpen: true,
            productInfo: product
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateProductInfo = () => {
        let productInfo = this.productInfoNode.getInfo();
        let flag = checkValid(productInfo);
        if (flag) {
            productInfo = getDataInfo(productInfo);
            this.props.dispatch(updateProduct(productInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, productInfo} = this.state;
        const {unit} = this.props;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editProduct'
                            defaultMessage='Edit Product'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <ProductInfo
                            unit={unit}
                            info={productInfo}
                            ref={node => this.productInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateProductInfo()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditProduct;