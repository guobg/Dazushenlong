import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Input, Button} from 'semantic-ui-react';
import {isEmpty} from '../../util/CommUtil';

class StagedCommission extends Component {
    state = {
        stagedCom: this.props.info
    };

    getInfo = () => {
        return this.state.stagedCom;
    };

    addStagedCom = () => {
        const {stagedCom} = this.state;
        if (stagedCom.stagedCommission && stagedCom.stagedCommission.length > 0) {
            const lastStage = stagedCom.stagedCommission[stagedCom.stagedCommission.length - 1];
            stagedCom.stagedCommission.push({
                stage: lastStage.stage + 1,
                min: Number(lastStage.max) + 1,
                max: null
            })
        } else {
            const lastStage = stagedCom.basicTask;
            if (!lastStage) {
                alert("请先设置基础提成");
                return;
            }
            stagedCom.stagedCommission = [{
                stage: 1,
                min: Number(lastStage) + 1,
                max: null
            }]
        }

        this.setState({
            stagedCom
        })
    };

    setMin = (item, value) => {
        item.min = value;
    };

    setMax = (item, value) => {
        item.max = value;
    };

    setCommission = (item, value) => {
        item.commission = value;
    };

    render() {
        const {stagedCom} = this.state;
        return (
            <div className="model-container">
                <div className="stage-basic-task">
                    <span className="stage-com-title">
                        <FormattedMessage
                            id='Basic Task'
                            defaultMessage='Basic Task'
                        />
                    </span>
                    <span className="stage-com-text">{stagedCom.basicTask}</span>
                </div>
                <div>
                    {
                        stagedCom.stagedCommission && stagedCom.stagedCommission.length > 0 ?
                            stagedCom.stagedCommission.map((item, i) => {
                                return <div className="stage-com-item" key={i}>
                                    <div className="display-flex stage-com-line">
                                        <span className="stage-com-title">阶梯设置{item.stage}</span>
                                        {isEmpty(item.min) ?
                                            <Input className="stage-com-input"
                                                   type="number"
                                                   step={1}
                                                   onChange={(event, value) => {
                                                       this.setMin(item, value.value)
                                                   }}/> :
                                            <span className="stage-com-text">{item.min}</span>}
                                        -
                                        {isEmpty(item.max) ?
                                            <Input className="stage-com-input"
                                                   type="number"
                                                   step={1}
                                                   onChange={(event, value) => {
                                                       this.setMax(item, value.value)
                                                   }}/> :
                                            <span className="stage-com-text">{item.max}</span>}
                                    </div>
                                    <div className="display-flex">
                                        <span className="stage-com-title">提成金额</span>
                                        {isEmpty(item.commission) ?
                                            <Input className="stage-com-input"
                                                   type="number"
                                                   step={0.01}
                                                   onChange={(event, value) => {
                                                       this.setCommission(item, value.value)
                                                   }}/> :
                                            <span className="stage-com-text">{item.commission}</span>}
                                    </div>
                                </div>
                            }) : null
                    }
                </div>
                <Button onClick={() => this.addStagedCom()}>新增阶梯提成</Button>
            </div>
        );
    }
}

export default StagedCommission;