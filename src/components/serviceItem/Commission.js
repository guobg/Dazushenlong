import React, {Component} from 'react';
import {Table, Modal, Button} from 'semantic-ui-react';
import {isEmpty} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';
import {getCommissionList, updateCommission} from '../../actions/commission_action';
import BasicCommission from './BasicCommission';
import StagedCommission from './StagedCommission';
import {checkValid, getDataInfo} from '../../util/CommUtil';

const header = ["ID", "Employee Position Level", "Call Clock Commission", "Arrange Clock Commission", "Basic Task", "Action"];
const checklistKey = ["id", "positionLevel", "callClockCom", "arrClockCom", "basicTask"];

class Commission extends Component {
    state = {
        selectedCom: {},
        basicComModal: false,
        stagedComModal: false
    };

    componentDidMount() {
        const {serviceItemId} = this.props;
        if (!serviceItemId) return;
        this.props.dispatch(getCommissionList(serviceItemId));
    }

    componentWillReceiveProps(nextProps) {
        const {serviceItemId} = nextProps;
        if (serviceItemId === this.props.serviceItemId) return;
        this.props.dispatch(getCommissionList(serviceItemId))
    }

    closeBasicComModal = () => {
        this.setState({
            basicComModal: false
        })
    };

    setBasicTask = (commission) => {
        this.setState({
            basicComModal: true,
            selectedCom: commission
        })
    };

    updateBasicTask = () => {
        let basicTaskInfo = this.basicComNode.getInfo();
        let flag = checkValid(basicTaskInfo);
        if (flag) {
            basicTaskInfo = getDataInfo(basicTaskInfo);
            this.props.dispatch(updateCommission(basicTaskInfo, this.closeBasicComModal));
        }
    };

    closeStagedComModal = () => {
        this.setState({
            stagedComModal: false
        })
    };

    setStage = (commission) => {
        this.setState({
            stagedComModal: true,
            selectedCom: commission
        })
    };

    updateStagedCom = () => {
        let StagedComInfo = this.StagedComNode.getInfo();
        this.props.dispatch(updateCommission(StagedComInfo, this.closeStagedComModal));
    };

    getListDesc = (result, key) => {
        if (isEmpty(result[key])) {
            return 'N/A';
        }
        return result[key];
    };

    render() {
        const {commission} = this.props;
        const {selectedCom, basicComModal, stagedComModal} = this.state;
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
                            commission.map((result, i) => {
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
                                        <div className="table-action-edit" onClick={() => this.setBasicTask(result)}>
                                            <FormattedMessage
                                                id='edit'
                                                defaultMessage='Edit'
                                            />
                                        </div>
                                        <div className="table-action-edit" onClick={() => this.setStage(result)}>
                                            <FormattedMessage
                                                id='stageSetting'
                                                defaultMessage='Stage Setting'
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
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={basicComModal}
                    size='large'>
                    <Modal.Header>
                        <FormattedMessage
                            id='commissionSetting'
                            defaultMessage='Commission Setting'
                        /> - {selectedCom.positionLevel}
                    </Modal.Header>
                    <Modal.Content>
                        <BasicCommission info={selectedCom} ref={node => this.basicComNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeBasicComModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateBasicTask()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={stagedComModal}
                    size='large'>
                    <Modal.Header>
                        点钟阶梯提成设置 - {selectedCom.positionLevel}
                    </Modal.Header>
                    <Modal.Content>
                        <StagedCommission info={selectedCom} ref={node => this.StagedComNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeStagedComModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateStagedCom()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default Commission;
