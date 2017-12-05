import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteEmployee, getEmployeeList} from '../../../actions/employee_action';
import {genderOptions, staffStatusOptions} from '../../../res/data/dataOptions';
import StaticDialog from '../../common/Dialog';
import Confirm from '../../common/Confirm';

const header = ["Employee ID", "Employee Name", "Gender", "Phone", "Post", "Status", "Action"];
const checklistKey = ["staffId", "name", "gender", "phone", "post", "status"];

class OrgEmployeeList extends Component {
    /*componentDidMount() {
        const {orgName} = this.props;
        this.props.dispatch(getEmployeeList(orgName, 1, 10));
    }
*/
    componentWillReceiveProps(nextProps) {
        const {org = {}} = this.props;
        if (nextProps.org.name === org.name) return;
        this.props.dispatch(getEmployeeList(org.name, 1, 10));
    }

    pageChange(page, pageSize) {
        const {orgName} = this.props;
        this.props.dispatch(getEmployeeList(orgName, page, pageSize));
    }

    getListDesc = (result, key) => {
        if (key === "gender" && !isEmpty(result[key])) {
            return getDesc(genderOptions, result[key]);
        }

        if (key === 'status' && !isEmpty(result[key])) {
            return getDesc(staffStatusOptions, result[key]);
        }

        if (key === 'post' && !isEmpty(result.department) && !isEmpty(result[key])) {
            return this.getPositionDesc(result.department, result[key]);
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    getPositionDesc = (deptId, positionId) => {
        let desc = 'N/A';
        return desc;
    };

    remove = (result) => {
        this.props.dispatch(deleteEmployee(result))
    };

    removeOrg = (org) => {
        if (org.id === 0) return;
        const {employee, removeOrg} = this.props;
        if (employee.employees && employee.employees.length > 0) {
            StaticDialog.show("removeOrg-error", '', '该组织内有成员');
            return;
        }
        if (org.items && org.items.length > 0) {
            StaticDialog.show("removeOrg-error", '', '该组织下有组织');
            return;
        }
        let param = {
            id: "removeOrg-confirm",
            message: <FormattedMessage
                id='delete'
                defaultMessage='Delete'
            />,
            confirmHandle: () => {
                removeOrg && removeOrg(org);
            }
        };
        Confirm.show(param);
    };

    render() {
        const {employee, org} = this.props;
        return (
            <div>
                {org.id === 0 ? null : <div className="org-navigator display-flex">
                    <div className="org-nav-button">权限设置</div>
                    <div className="org-nav-button" onClick={() => {
                        this.removeOrg(org)
                    }}>删除组织
                    </div>
                </div>}
                <div className="org-info-detail">
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
                                            {/*<div className="table-action-edit" onClick={() => this.edit(result)}>
                                            <FormattedMessage
                                                id='edit'
                                                defaultMessage='Edit'
                                            />
                                        </div>*/}
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
                </div>
            </div>
        );
    }
}

export default OrgEmployeeList;
