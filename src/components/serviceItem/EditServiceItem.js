import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import ServiceItemInfo from './ServiceItemInfo';
import {updateServiceItem} from '../../actions/serviceItem_action';

class EditServiceItem extends Component {
    state = {modalOpen: false, serviceItemInfo: {}};

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

    openModal = (serviceItem) => {
        this.setState({
            modalOpen: true,
            serviceItemInfo: serviceItem
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateServiceItemInfo = () => {
        let serviceItemInfo = this.serviceItemInfoNode.getInfo();
        this.props.dispatch(updateServiceItem(serviceItemInfo, this.closeModal));
    };

    render() {
        const {modalOpen, serviceItemInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editServiceItem'
                            defaultMessage='Edit ServiceItem'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <ServiceItemInfo
                            info={serviceItemInfo}
                            ref={node => this.serviceItemInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateServiceItemInfo()}>
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

export default EditServiceItem;