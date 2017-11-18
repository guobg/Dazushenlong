import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import ScheduleInfo from './ScheduleInfo';
import {updateSchedule} from '../../actions/schedule_action';

class EditSchedule extends Component {
    state = {modalOpen: false, scheduleInfo: {}};

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

    openModal = (schedule) => {
        this.setState({
            modalOpen: true,
            scheduleInfo: schedule
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateScheduleInfo = () => {
        let scheduleInfo = this.scheduleInfoNode.getInfo();
        this.props.dispatch(updateSchedule(scheduleInfo, this.closeModal));
    };

    render() {
        const {modalOpen, scheduleInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editSchedule'
                            defaultMessage='Edit Schedule'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <ScheduleInfo
                            info={scheduleInfo}
                            ref={node => this.scheduleInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateScheduleInfo()}>
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

export default EditSchedule;