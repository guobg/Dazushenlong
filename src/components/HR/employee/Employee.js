import React, {Component} from 'react';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';
import {getAllDepartment} from '../../../util/Service';
import Image from '../../common/Image';

import {FormattedMessage} from 'react-intl';

class Employee extends Component {
    state = {department: []};

    componentWillMount() {
        /*getAllDepartment((department) => {
            this.setState({
                department: department
            })
        })*/
    }

    render() {
        const {dispatch, employee} = this.props;
        const {department} = this.state;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='employeeTitle'
                        defaultMessage='Employee'
                    />
                </div>
                <EmployeeList dispatch={dispatch} employee={employee} department={department}/>
                <CreateEmployee dispatch={dispatch} department={department}/>
            </div>
        );
    }
}

export default Employee;
