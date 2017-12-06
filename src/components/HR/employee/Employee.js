import React, {Component} from 'react';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';
import Image from '../../common/Image';
import {getOrganization} from '../../../actions/organization_action';
import {getPositionList} from '../../../actions/position_action';
import {FormattedMessage} from 'react-intl';

class Employee extends Component {

    componentWillMount() {
        this.props.dispatch(getPositionList());
        this.props.dispatch(getOrganization());
    }

    render() {
        const {dispatch, employee, position, organization} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="employee"/>
                    <FormattedMessage
                        id='employeeTitle'
                        defaultMessage='Employee'
                    />
                </div>
                <CreateEmployee dispatch={dispatch} position={position.positions} organization={organization}/>
                <EmployeeList dispatch={dispatch} employee={employee} position={position.positions}
                              organization={organization}/>
            </div>
        );
    }
}

export default Employee;
