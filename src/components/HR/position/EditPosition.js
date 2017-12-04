import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import PositionInfo from './PositionInfo';
import {updatePosition} from '../../../actions/position_action';
import Image from '../../common/Image';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class EditPosition extends Component {
    state = {modalOpen: false, positionInfo: {}};

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

    openModal = (positionInfo) => this.setState({modalOpen: true, positionInfo: positionInfo});

    closeModal = () => this.setState({modalOpen: false});

    updatePositionDetail = () => {
        let positionInfo = this.positionInfoNode.getInfo();
        let flag = checkValid(positionInfo);
        if (flag) {
            positionInfo = getDataInfo(positionInfo);
            positionInfo.id = this.state.positionInfo.id;
            this.props.dispatch(updatePosition(positionInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, positionInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header className="modal-title-border">
                        <Image name="project"/>
                        <FormattedMessage
                            id='editPosition'
                            defaultMessage='Edit Position'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <PositionInfo info={positionInfo} ref={node => this.positionInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updatePositionDetail()}>
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

export default EditPosition;