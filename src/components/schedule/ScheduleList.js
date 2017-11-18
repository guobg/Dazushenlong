import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteSchedule, getScheduleList} from '../../actions/schedule_action';
import EditSchedule from './EditSchedule';

const header = ["ID", "Name", "Phone", "Schedule Time", "Remark", "Status", "Member Level", "Action"];
const checklistKey = ["scheduleId", "name", "phone", "scheduleTime", "remark", "status", "memberLevel"];

class ScheduleList extends Component {
    componentDidMount() {
        this.props.dispatch(getScheduleList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getScheduleList(page, pageSize));
    }

    remove = (result) => {
        this.props.dispatch(deleteSchedule(result))
    };

    edit = (schedule) => {
        this.editScheduleNode.openModal(schedule)
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
        const {schedule, dispatch} = this.props;
        return (
            <div>
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
                            schedule.schedules.map((result, i) => {
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
                                                id='cancel'
                                                defaultMessage='Cancel'
                                            />
                                        </Button>
                                        <Button color='green' onClick={() => this.remove(result)}>
                                            <FormattedMessage
                                                id='resume'
                                                defaultMessage='Resume'
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
                                <Pagination defaultCurrent={1} total={schedule.totalElements}
                                            showQuickJumper
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditSchedule ref={node => this.editScheduleNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default ScheduleList;
