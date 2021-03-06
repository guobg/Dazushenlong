import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import EditMemberInfo from './EditMemberInfo';
import {updateMember} from '../../actions/member_action';

class EditMember extends Component {
    state = {modalOpen: false, memberInfo: {}};

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

    openModal = (member) => {
        this.setState({
            modalOpen: true,
            memberInfo: member
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateMemberInfo = () => {
        let memberInfo = this.memberInfoNode.getInfo();
        this.props.dispatch(updateMember(memberInfo, this.closeModal));
    };

    render() {
        const {modalOpen, memberInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editMember'
                            defaultMessage='Edit Member'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <EditMemberInfo
                            info={memberInfo}
                            ref={node => this.memberInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateMemberInfo()}>
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

export default EditMember;