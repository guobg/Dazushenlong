import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteMateriel, getMaterielList} from '../../../actions/materiel_action';
import EditMateriel from './EditMateriel';
import StorageMateriel from './StorageMateriel';

const header = ["ID", "Materiel Name", "Materiel Specifications", "Unit", "Unit Price", "Quantity", "Total Price", "Action"];
const checklistKey = ["materielId", "materielName", "materielSpec", "unit", "unitPrice", "quantity", "totalPrice"];

class MaterielList extends Component {
    componentDidMount() {
        this.props.dispatch(getMaterielList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getMaterielList(page, pageSize));
    }

    remove = (result) => {
        this.props.dispatch(deleteMateriel(result))
    };

    edit = (materiel) => {
        this.editMaterielNode.openModal(materiel)
    };

    storage = (materiel) => {
        this.storageMaterielNode.openModal(materiel)
    };

    getListDesc = (result, key) => {
        if (key === 'unit' && !isEmpty(result[key])) {
            return this.getUnitDesc(result[key]);
        }

        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    getUnitDesc = (unitId) => {
        const {materielUnit} = this.props;
        let desc = 'N/A';
        materielUnit.some((item) => {
            if (item.materielUnitId === unitId) {
                desc = item.unitName;
                return true;
            }
        });
        return desc;
    };

    render() {
        const {materiel, dispatch, materielUnit} = this.props;
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
                            materiel.materials.map((result, i) => {
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
                                        <div className="table-action-edit" onClick={() => this.storage(result)}>
                                            入库
                                        </div>
                                    </Table.Cell>
                                </Table.Row>

                            })
                        }
                    </Table.Body>
                    <Table.Footer>
                        <Table.Row>
                            <Table.HeaderCell colSpan={header.length}>
                                <Pagination defaultCurrent={1} total={materiel.totalElements}
                                            showQuickJumper
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditMateriel ref={node => this.editMaterielNode = node} dispatch={dispatch}
                              materielUnit={materielUnit}/>
                <StorageMateriel ref={node => this.storageMaterielNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default MaterielList;
