import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import MemberCardInfo from './MemberCardInfo';
import {updateMemberCard} from '../../actions/memberCard_action';
import {checkValid, getDataInfo} from '../../util/CommUtil';

class EditMemberCard extends Component {
    state = {modalOpen: false, memberCardInfo: {}};

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

    openModal = (memberCard) => {
        this.setState({
            modalOpen: true,
            memberCardInfo: memberCard
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateMemberCardInfo = () => {
        let memberCardInfo = this.memberCardInfoNode.getInfo();
        let flag = checkValid(memberCardInfo);
        if (flag) {
            memberCardInfo = getDataInfo(memberCardInfo);
            this.props.dispatch(updateMemberCard(memberCardInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, memberCardInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editMemberCard'
                            defaultMessage='Edit MemberCard'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <MemberCardInfo
                            info={memberCardInfo}
                            ref={node => this.memberCardInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateMemberCardInfo()}>
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

export default EditMemberCard;