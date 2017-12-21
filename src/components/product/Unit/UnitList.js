import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteUnit, getUnitList} from '../../../actions/unit_action';
import EditUnit from './EditUnit';

const header = ["ID", "Unit Name", "Decimal Digits", "Action"];
const checklistKey = ["id", "name", "unit_decimal"];

class UnitList extends Component {
    componentDidMount() {
        this.props.dispatch(getUnitList());
    };

    remove = (result) => {
        this.props.dispatch(deleteUnit(result))
    };

    edit = (unit) => {
        this.editUnitNode.openModal(unit)
    };

    getListDesc = (result, key) => {
        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    render() {
        const {unit, dispatch} = this.props;
        return (
            <div className="comm-list">
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
                            unit.map((result, i) => {
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
                </Table>
                <EditUnit ref={node => this.editUnitNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default UnitList;
