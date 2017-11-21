import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteEmployee, getEmployeeList} from '../../../actions/employee_action';
import {genderOptions, staffStatusOptions} from '../../../res/data/dataOptions';
import EditEmployee from './EditEmployee';

const header = ["Employee ID", "Employee Name", "Gender", "Birthday", "Phone", "Entry Time", "Working age", "Department", "Post", "Address", "Emergency Contact Name", "Emergency Contact Phone", "Status", "Action"];
const checklistKey = ["staffId", "name", "gender", "birthday", "phone", "entryTime", "workingAge", "department", "post", "address", "emergencyName", "emergencyPhone", "status"];

class EmployeeList extends Component {
    componentDidMount() {
        this.props.dispatch(getEmployeeList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getEmployeeList(page, pageSize));
    }

    getListDesc = (result, key) => {
        if (key === "gender" && !isEmpty(result[key])) {
            return getDesc(genderOptions, result[key]);
        }

        if (key === 'status' && !isEmpty(result[key])) {
            return getDesc(staffStatusOptions, result[key]);
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    getPositionDesc = (deptId, positionId) => {
        const {department} = this.props;
        let desc = 'N/A';
        department.some((item) => {
            if (item.value === deptId) {
                item.positions.some((position) => {
                    if (position.value === positionId) {
                        desc = position.text;
                        return true;
                    }
                });
                return true;
            }
        });
        return desc;
    };

    remove = (result) => {
        this.props.dispatch(deleteEmployee(result))
    };

    edit = (result) => {
        this.editEmployeeNode.openModal(result.staffId)
    };

    render() {
        const {employee, dispatch, department} = this.props;
        return (
            <div>
                <Table textAlign="center">
                    <Table.Header>
                        <Table.Row>
                            {
                                header.map((result, i) => {
                                    return <Table.HeaderCell key={i}>
                                        {result ? <FormattedMessage
                                            id={result}
                                        /> : ""}
                                    </Table.HeaderCell>
                                })
                            }
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {
                            employee.employees.map((result, i) => {
                                return <Table.Row key={i}>
                                    {
                                        checklistKey.map((key, j) => {
                                            return <Table.Cell
                                                key={i + "_" + j}>
                                                {this.getListDesc(result, key)}
                                            </Table.Cell>
                                        })
                                    }
                                    <Table.Cell className="table-action-cell">
                                        <div className="table-action-edit" onClick={() => this.edit(result)}>
                                            <FormattedMessage
                                                id='edit'
                                                defaultMessage='Edit'
                                            />
                                        </div>
                                        <div className="table-action-delete" onClick={() => this.remove(result)}>
                                            <FormattedMessage
                                                id='delete'
                                                defaultMessage='Delete'
                                            />
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            })
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={header.length}>
                                <Pagination defaultCurrent={1} total={employee.totalElements}
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditEmployee dispatch={dispatch} ref={node => this.editEmployeeNode = node} department={department}/>
            </div>
        );
    }
}

export default EmployeeList;
