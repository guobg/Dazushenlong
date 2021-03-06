import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import EmployeeInfo from './EmployeeInfo';
import {updateEmployee} from '../../../actions/employee_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class EditEmployee extends Component {
    state = {modalOpen: false, employeeInfo: {}};

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

    openModal = (staff) => {
        /*this.props.dispatch(rtrvStaffDetail(staffId, function (employee) {
            this.setState({modalOpen: true, employeeInfo: employee});
        }.bind(this)));*/
        this.setState({modalOpen: true, employeeInfo: staff});
    };

    closeModal = () => this.setState({modalOpen: false});

    updateEmployeeInfo = () => {
        let employeeInfo = this.employeeInfoNode.getInfo();
        let flag = checkValid(employeeInfo);
        if (flag) {
            employeeInfo = getDataInfo(employeeInfo);
            employeeInfo.id = this.state.employeeInfo.id;
            this.props.dispatch(updateEmployee(employeeInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, employeeInfo} = this.state;
        const {position, organization} = this.props;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editEmployee'
                            defaultMessage='Edit Employee'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <EmployeeInfo isEdit={true} info={employeeInfo} ref={node => this.employeeInfoNode = node}
                                      position={position} organization={organization}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateEmployeeInfo()}>
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

export default EditEmployee;