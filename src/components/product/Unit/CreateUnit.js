import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import UnitInfo from './UnitInfo';
import {FormattedMessage} from 'react-intl';
import {createUnit} from '../../../actions/unit_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreateUnit extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newUnit = () => {
        let unitInfo = this.unitInfoNode.getInfo();
        let flag = checkValid(unitInfo);
        if (flag) {
            unitInfo = getDataInfo(unitInfo);
            this.props.dispatch(createUnit(unitInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="model-main-container">
                <Button className="create-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='createUnit'
                        defaultMessage='Create Unit'
                    />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header className="modal-title-border">
                        <FormattedMessage
                            id='createUnit'
                            defaultMessage='Create Unit'
                        />
                    </Modal.Header>
                    <UnitInfo ref={(node) => this.unitInfoNode = node}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newUnit()}>
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

export default CreateUnit;
