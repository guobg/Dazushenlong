import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import EmployeeInfo from './EmployeeInfo';
import {FormattedMessage} from 'react-intl';
import {saveEmployee} from '../../../actions/employee_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreateEmployee extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newEmployee = () => {
        let employeeInfo = this.employeeInfoNode.getInfo();
        let flag = checkValid(employeeInfo);
        if (flag) {
            employeeInfo = getDataInfo(employeeInfo);
            this.props.dispatch(saveEmployee(employeeInfo, this.closeModal));
        }
    };

    render() {
        const {position, organization} = this.props;
        const {modalOpen} = this.state;
        return (
            <div className="model-main-container">
                <Button className="create-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='createEmployee'
                        defaultMessage='Create Employee'
                    />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header>
                        <FormattedMessage
                            id='createEmployee'
                            defaultMessage='Create Employee'
                        />
                    </Modal.Header>
                    <EmployeeInfo ref={(node) => this.employeeInfoNode = node} position={position}
                                  organization={organization}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newEmployee()}>
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

export default CreateEmployee;
