import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import {updateMateriel} from '../../../actions/materiel_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';
import Display from '../../common/Display';
import Input from '../../common/Input';

class StorageMateriel extends Component {
    state = {modalOpen: false, materielInfo: {}};

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

    openModal = (materiel) => {
        this.setState({
            modalOpen: true,
            materielInfo: materiel
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateMaterielInfo = () => {
        let storageInfo = {storageNumber: this.storageQuantityNode.getWrappedInstance().getValue()};
        let flag = checkValid(storageInfo);
        if (flag) {
            storageInfo = getDataInfo(storageInfo);
            this.state.materielInfo.quantity = this.state.materielInfo.quantity + Number(storageInfo.storageNumber);
            this.props.dispatch(updateMateriel(this.state.materielInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, materielInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='storageMateriel'
                            defaultMessage='Storage Materiel'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <div className="model-container">
                            <Display
                                label="Materiel Name"
                                value={materielInfo.materielName}/>
                            <Display
                                label="Quantity"
                                value={materielInfo.quantity}/>
                            <Input label="Storage Quantity"
                                   ref={node => this.storageQuantityNode = node}/>
                        </div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateMaterielInfo()}>
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

export default StorageMateriel;