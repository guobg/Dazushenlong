import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteMember, getMemberList} from '../../actions/member_action';
import {genderOptions} from '../../res/data/dataOptions';
import EditMember from './EditMember';

const header = ["ID", "Member Level", "Name", "Phone", "Birthday", "Points", "Balance", "Recharge Record", "Consumption Record", "Stagnation Status", "Open Store"];
const checklistKey = ["memberId", "memberLevel", "name", "phone", "birthday", "points", "balance", "rechargeRecord", "consumptionRecord", "stagnationStatus", "openStore"];

class MemberList extends Component {
    componentDidMount() {
        this.props.dispatch(getMemberList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getMemberList(page, pageSize));
    }

    getListDesc = (result, key) => {
        if (key === "gender" && !isEmpty(result[key])) {
            return getDesc(genderOptions, result[key]);
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    render() {
        const {member, dispatch} = this.props;
        return (
            <Table striped>
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
                        member.members.map((result, i) => {
                            return <Table.Row key={i}>
                                {
                                    checklistKey.map((key, j) => {
                                        return <Table.Cell
                                            key={i + "_" + j}>
                                            {this.getListDesc(result, key)}
                                        </Table.Cell>
                                    })
                                }
                            </Table.Row>
                        })
                    }
                </Table.Body>
                <Table.Footer>
                    <Table.Row>
                        <Table.HeaderCell colSpan={header.length}>
                            <Pagination defaultCurrent={1} total={member.totalElements}
                                        showQuickJumper
                                        onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
        );
    }
}

export default MemberList;
