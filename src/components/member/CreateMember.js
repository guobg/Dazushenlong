import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import CreateMemberInfo from './CreateMemberInfo';
import {FormattedMessage} from 'react-intl';
import {createMember} from '../../actions/member_action';

class CreateMember extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newMember = () => {
        let memberInfo = this.memberInfoNode.getInfo();
        this.props.dispatch(createMember(memberInfo, this.closeModal));
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="project-content">
                <div>
                    <Button color='blue' onClick={() => this.openModal()}>
                        <FormattedMessage
                            id='createMember'
                            defaultMessage='Create Member'
                        />
                    </Button>
                    <Modal
                        closeOnEscape={false}
                        closeOnRootNodeClick={false}
                        open={modalOpen}
                        size='large'>
                        <Modal.Header>
                            <FormattedMessage
                                id='createMember'
                                defaultMessage='Create Member'
                            />
                        </Modal.Header>
                        <CreateMemberInfo ref={(node) => this.memberInfoNode = node}/>
                        <Modal.Actions>
                            <Button className="cancel-button" onClick={() => this.closeModal()}>
                                <FormattedMessage
                                    id='cancel'
                                    defaultMessage='Cancel'
                                />
                            </Button>
                            <Button className="confirm-button" onClick={() => this.newMember()}>
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

export default CreateMember;
