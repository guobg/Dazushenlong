import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import ScheduleInfo from './ScheduleInfo';
import {FormattedMessage} from 'react-intl';
import {createSchedule} from '../../actions/schedule_action';

class CreateSchedule extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newSchedule = () => {
        let scheduleInfo = this.scheduleInfoNode.getInfo();
        this.props.dispatch(createSchedule(scheduleInfo, this.closeModal));
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="project-content">
                <div>
                    <Button color='blue' onClick={() => this.openModal()}>
                        <FormattedMessage
                            id='createSchedule'
                            defaultMessage='Create Schedule'
                        />
                    </Button>
                    <Modal
                        closeOnEscape={false}
                        closeOnRootNodeClick={false}
                        open={modalOpen}
                        size='large'>
                        <Modal.Header className="modal-title-border">
                            <FormattedMessage
                                id='createSchedule'
                                defaultMessage='Create Schedule'
                            />
                        </Modal.Header>
                        <ScheduleInfo ref={(node) => this.scheduleInfoNode = node}/>
                        <Modal.Actions>
                            <Button className="cancel-button" onClick={() => this.closeModal()}>
                                <FormattedMessage
                                    id='cancel'
                                    defaultMessage='Cancel'
                                />
                            </Button>
                            <Button className="confirm-button" onClick={() => this.newSchedule()}>
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

export default CreateSchedule;
