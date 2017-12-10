import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import ServiceItemInfo from './ServiceItemInfo';
import {FormattedMessage} from 'react-intl';
import {createServiceItem} from '../../actions/serviceItem_action';
import {checkValid, getDataInfo} from '../../util/CommUtil';

class CreateServiceItem extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newServiceItem = () => {
        let serviceItemInfo = this.serviceItemInfoNode.getInfo();
        let flag = checkValid(serviceItemInfo);
        if (flag) {
            serviceItemInfo = getDataInfo(serviceItemInfo);
            this.props.dispatch(createServiceItem(serviceItemInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="project-content">
                <div>
                    <Button color='blue' onClick={() => this.openModal()}>
                        <FormattedMessage
                            id='createServiceItem'
                            defaultMessage='Create ServiceItem'
                        />
                    </Button>
                    <Modal
                        closeOnEscape={false}
                        closeOnRootNodeClick={false}
                        open={modalOpen}
                        size='large'>
                        <Modal.Header className="modal-title-border">
                            <FormattedMessage
                                id='createServiceItem'
                                defaultMessage='Create ServiceItem'
                            />
                        </Modal.Header>
                        <ServiceItemInfo ref={(node) => this.serviceItemInfoNode = node}/>
                        <Modal.Actions>
                            <Button className="cancel-button" onClick={() => this.closeModal()}>
                                <FormattedMessage
                                    id='cancel'
                                    defaultMessage='Cancel'
                                />
                            </Button>
                            <Button className="confirm-button" onClick={() => this.newServiceItem()}>
                                <FormattedMessage
                                    id='confirm'
                                    defaultMessage='Confirm'
                                />
                            </Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default CreateServiceItem;
