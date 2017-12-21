import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import ProductInfo from './ProductInfo';
import {FormattedMessage} from 'react-intl';
import {createProduct} from '../../../actions/product_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreateProduct extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newProduct = () => {
        let productInfo = this.productInfoNode.getInfo();
        let flag = checkValid(productInfo);
        if (flag) {
            productInfo = getDataInfo(productInfo);
            this.props.dispatch(createProduct(productInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {unit} = this.props;
        return (
            <div className="model-main-container">
                <Button className="create-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='createProduct'
                        defaultMessage='Create Product'
                    />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header className="modal-title-border">
                        <FormattedMessage
                            id='createProduct'
                            defaultMessage='Create Product'
                        />
                    </Modal.Header>
                    <ProductInfo ref={(node) => this.productInfoNode = node} unit={unit}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newProduct()}>
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

export default CreateProduct;
