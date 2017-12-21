import React, {Component} from 'react';
import {Table} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {isEmpty} from '../../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteProduct, getProductList} from '../../../actions/product_action';
import EditProduct from './EditProduct';
import Purchase from './Purchase';

const header = ["ID", "Product Name", "Product Specifications", "Unit", "Unit Price", "Quantity", "Total Price", "Action"];
const checklistKey = ["productId", "productName", "productSpec", "unit", "unitPrice", "quantity", "totalPrice"];

class ProductList extends Component {
    componentDidMount() {
        this.props.dispatch(getProductList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getProductList(page, pageSize));
    }

    remove = (result) => {
        this.props.dispatch(deleteProduct(result))
    };

    edit = (product) => {
        this.editProductNode.openModal(product)
    };

    purchase = (product) => {
        this.purchaseProductNode.openModal(product)
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
        const {unit} = this.props;
        let desc = 'N/A';
        unit.some((item) => {
            if (item.unitId === unitId) {
                desc = item.unitName;
                return true;
            }
        });
        return desc;
    };

    render() {
        const {product, dispatch, unit} = this.props;
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
                            product.materials.map((result, i) => {
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
                                        <div className="table-action-edit" onClick={() => this.purchase(result)}>
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
                                <Pagination defaultCurrent={1} total={product.totalElements}
                                            showQuickJumper
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditProduct ref={node => this.editProductNode = node} dispatch={dispatch}
                              unit={unit}/>
                <Purchase ref={node => this.purchaseProductNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default ProductList;
