import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteMaterielUnit, getMaterielUnitList} from '../../../actions/materielUnit_action';
import EditMaterielUnit from './EditMaterielUnit';

const header = ["ID", "Unit Name", "Decimal Digits", "Action"];
const checklistKey = ["materielUnitId", "unitName", "decimalDigit"];

class MaterielUnitList extends Component {
    componentDidMount() {
        this.props.dispatch(getMaterielUnitList());
    };

    remove = (result) => {
        this.props.dispatch(deleteMaterielUnit(result))
    };

    edit = (materielUnit) => {
        this.editMaterielUnitNode.openModal(materielUnit)
    };

    getListDesc = (result, key) => {
        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    render() {
        const {materielUnit, dispatch} = this.props;
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
                            materielUnit.map((result, i) => {
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
                <EditMaterielUnit ref={node => this.editMaterielUnitNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default MaterielUnitList;
