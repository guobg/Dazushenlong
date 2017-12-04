import React, {Component} from 'react';
import EmployeeList from './EmployeeList';
import CreateEmployee from './CreateEmployee';
import {getAllPosition} from '../../../util/Service';
import Image from '../../common/Image';

import {FormattedMessage} from 'react-intl';

class Employee extends Component {
    state = {position: []};

    componentWillMount() {
        getAllPosition((position) => {
            this.setState({
                position: position
            })
        })
    }

    render() {
        const {dispatch, employee} = this.props;
        const {position} = this.state;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="employee"/>
                    <FormattedMessage
                        id='employeeTitle'
                        defaultMessage='Employee'
                    />
                </div>
                <CreateEmployee dispatch={dispatch} position={position}/>
                <EmployeeList dispatch={dispatch} employee={employee} position={position}/>
            </div>
        );
    }
}

export default Employee;
