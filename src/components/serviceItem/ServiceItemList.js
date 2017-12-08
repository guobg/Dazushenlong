import React, {Component} from 'react';
import {Table, Button} from 'semantic-ui-react';
import {Pagination} from 'antd';
import {getDesc, isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {deleteServiceItem, getServiceItemList} from '../../actions/serviceItem_action';
import EditServiceItem from './EditServiceItem';

const header = ["ID", "Name", "Phone", "ServiceItem Time", "Remark", "Status", "Member Level", "Action"];
const checklistKey = ["serviceItemId", "name", "phone", "serviceItemTime", "remark", "status", "memberLevel"];

class ServiceItemList extends Component {
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
                                <Pagination defaultCurrent={1} total={serviceItem.totalElements}
                                            showQuickJumper
                                            onChange={(page, pageSize) => this.pageChange(page, pageSize)}/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
                <EditServiceItem ref={node => this.editServiceItemNode = node} dispatch={dispatch}/>
            </div>
        );
    }
}

export default ServiceItemList;
