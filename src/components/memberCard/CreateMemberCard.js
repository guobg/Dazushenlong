import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import MemberCardInfo from './MemberCardInfo';
import {FormattedMessage} from 'react-intl';
import {createMemberCard} from '../../actions/memberCard_action';

class CreateMemberCard extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newMemberCard = () => {
        let memberCardInfo = this.memberCardInfoNode.getInfo();
        this.props.dispatch(createMemberCard(memberCardInfo, this.closeModal));
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="project-content">
                <div>
                    <Button color='blue' onClick={() => this.openModal()}>
                        <FormattedMessage
                            id='createMemberCard'
                            defaultMessage='Create Membership Card'
                        />
                    </Button>
                    <Modal
                        closeOnEscape={false}
                        closeOnRootNodeClick={false}
                        open={modalOpen}
                        size='large'>
                        <Modal.Header>
                            <FormattedMessage
                                id='createMemberCard'
                                defaultMessage='Create MemberCard'
                            />
                        </Modal.Header>
                        <MemberCardInfo ref={(node) => this.memberCardInfoNode = node}/>
                        <Modal.Actions>
                            <Button className="cancel-button" onClick={() => this.closeModal()}>
                                <FormattedMessage
                                    id='cancel'
                                    defaultMessage='Cancel'
                                />
                            </Button>
                            <Button className="confirm-button" onClick={() => this.newMemberCard()}>
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

export default CreateMemberCard;
