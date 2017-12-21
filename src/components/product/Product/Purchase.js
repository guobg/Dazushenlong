import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {updateProduct} from '../../../actions/product_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';
import Display from '../../common/Display';
import Input from '../../common/Input';

class Purchase extends Component {
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
        let purchaseInfo = {purchaseNumber: this.purchaseQuantityNode.getWrappedInstance().getValue()};
        let flag = checkValid(purchaseInfo);
        if (flag) {
            purchaseInfo = getDataInfo(purchaseInfo);
            this.state.productInfo.quantity = this.state.productInfo.quantity + Number(purchaseInfo.purchaseNumber);
            this.props.dispatch(updateProduct(this.state.productInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, productInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='purchaseProduct'
                            defaultMessage='Storage Product'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <div className="model-container">
                            <Display
                                label="Product Name"
                                value={productInfo.productName}/>
                            <Display
                                label="Quantity"
                                value={productInfo.quantity}/>
                            <Input label="Storage Quantity"
                                   ref={node => this.purchaseQuantityNode = node}/>
                        </div>
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

export default Purchase;