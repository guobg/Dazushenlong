import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deletePosition, getPositionList} from '../../../actions/position_action';
import EditPosition from './EditPosition';

const header = ["ID", "Position Name", "Position Level", "Action"];
const checklistKey = ["id", "name", "levels"];

class PositionList extends Component {
    componentDidMount() {
        this.props.dispatch(getPositionList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getPositionList(page, pageSize));
    }

    getChecklistDesc = (result, key) => {
        if (key === "levels") {
            if (result[key] && result[key].length > 0) {
                let tempStr = "";
                result[key].map((item) => {
                    tempStr += item.name + "/ ";
                });
                return tempStr.substr(0, tempStr.length - 2);
            } else {
                return 'N/A';
            }
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    remove = (result) => {
        this.props.dispatch(deletePosition(result))
    };

    edit = (result) => {
        this.editPositionNode.openModal(result)
    };

    render() {
        const {position, dispatch} = this.props;
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
                            position.positions.map((result, i) => {
                                return <Table.Row key={i}>
                                    {
                                        checklistKey.map((key, j) => {
                                            return <Table.Cell
                                                key={i + "_" + j}>
                                                {this.getChecklistDesc(result, key)}
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
                                <Pagination defaultCurrent={1} total={position.totalElements}
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditPosition dispatch={dispatch} ref={node => this.editPositionNode = node}/>
            </div>
        );
    }
}

export default PositionList;
