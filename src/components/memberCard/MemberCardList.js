import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteMemberCard, getMemberCardList} from '../../actions/memberCard_action';
import EditMemberCard from './EditMemberCard';

const header = ["Membership Card ID", "Membership Card Name", "Discount", "Action"];
const checklistKey = ["memberCardId", "memberCardName", "discount"];

class MemberCardList extends Component {
    componentDidMount() {
        this.props.dispatch(getMemberCardList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getMemberCardList(page, pageSize));
    }

    remove = (result) => {
        this.props.dispatch(deleteMemberCard(result))
    };

    edit = (memberCard) => {
        this.editMemberCardNode.openModal(memberCard)
    };

    getListDesc = (result, key) => {
        if (key === "discount") {
            if (!result[key]) return 'N/A';
            return result[key] + "%";
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    render() {
        const {memberCard, dispatch} = this.props;
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
                            memberCard.memberCards.map((result, i) => {
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
                                        <Button primary onClick={() => this.edit(result)}>
                                            <FormattedMessage
                                                id='edit'
                                                defaultMessage='Edit'
                                            />
                                        </Button>
                                        <Button color='red' onClick={() => this.remove(result)}>
                                            <FormattedMessage
                                                id='delete'
                                                defaultMessage='Delete'
                                            />
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>

                            })
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={header.length}>
                                <Pagination defaultCurrent={1} total={memberCard.totalElements}
                                            showQuickJumper
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditMemberCard ref={node => this.editMemberCardNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default MemberCardList;
