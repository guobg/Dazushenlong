import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteServiceItem, getServiceItemList} from '../../actions/serviceItem_action';
import EditServiceItem from './EditServiceItem';
import Commission from '../../containers/commission_container';

const header = ["ID", "Service Item Name", "Unit", "Technician Number", "Is Count Time",
    "Service Duration(Minute)", "Unit Price", "Max Discount", "Can Call Clock", "Can Use Coupon",
    "Count Person/Time", "Add Clock Count Person/Time", "Unit Ratio", "Action"];
const checklistKey = ["serviceItemId", "serviceItemName", "Unit", "technicianNumber", "isCountTime",
    "serviceDuration", "UnitPrice", "maxDiscount", "canCallClock", "canUseCoupon", "countPersonTime",
    "addClockCountPersonTime", "unitRatio"];

class ServiceItemList extends Component {
    state = {serviceItemId: ''};

    componentDidMount() {
        this.props.dispatch(getServiceItemList(1, 10));
    };

    pageChange(page, pageSize) {
        this.props.dispatch(getServiceItemList(page, pageSize));
    }

    remove = (result) => {
        this.props.dispatch(deleteServiceItem(result))
    };

    edit = (serviceItem) => {
        this.editServiceItemNode.openModal(serviceItem)
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
        const {serviceItem, dispatch} = this.props;
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
                            serviceItem.serviceItems.map((result, i) => {
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
                                        <div className="table-action-edit" onClick={() => {
                                            this.setState({serviceItemId: result.serviceItemId})
                                        }}>
                                            <FormattedMessage
                                                id='commissionSetting'
                                                defaultMessage='Commission Setting'
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
                                <Pagination defaultCurrent={1} total={serviceItem.totalElements}
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditServiceItem ref={node => this.editServiceItemNode = node} dispatch={dispatch}/>
                {this.state.serviceItemId ? <div className="components-item">
                    <Commission serviceItemId={this.state.serviceItemId}/>
                </div> : null}
            </div>
        );
    }
}

export default ServiceItemList;
