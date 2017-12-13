import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import PositionInfo from './PositionInfo';
import {FormattedMessage} from 'react-intl';
import {createPosition} from '../../../actions/position_action';
import MVImage from "../../common/Image";
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreatePosition extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newPosition = () => {
        let positionInfo = this.positionInfoNode.getInfo();
        let flag = checkValid(positionInfo);
        if (flag) {
            positionInfo = getDataInfo(positionInfo);
            this.props.dispatch(createPosition(positionInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="model-main-container">
                <Button className="create-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='createPosition'
                        defaultMessage='Create Position'
                    />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header className="modal-title-border">
                        <MVImage name="project"/>
                        <FormattedMessage
                            id='createPosition'
                            defaultMessage='Create Position'
                        />
                    </Modal.Header>
                    <PositionInfo ref={(node) => this.positionInfoNode = node}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newPosition()}>
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

export default CreatePosition;
