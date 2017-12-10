import React, {Component} from 'react';
import {FormattedMessage} from 'react-intl';
import {Input, Button} from 'semantic-ui-react';
import {isEmpty} from '../../util/CommUtil';

class StagedCommission extends Component {
    state = {
        stagedCom: this.props.info
    };

    getInfo = () => {
        return {}
    };

    addStagedCom = () => {
        const {stagedCom} = this.state;
        if (stagedCom.stagedCommission && stagedCom.stagedCommission.length > 0) {
            const lastStage = stagedCom.stagedCommission[stagedCom.stagedCommission.length - 1];
            stagedCom.stagedCommission.push({
                stage: lastStage.stage + 1,
                min: lastStage.max,
                max: null
            })
        } else {
            const lastStage = stagedCom.basicTask;
            if (!lastStage) {
                alert("请先设置基础提成")
                return;
            }
            stagedCom.stagedCommission = [{
                stage: lastStage.stage + 1,
                min: lastStage.max,
                max: null
            }]
        }

        this.setState({
            stagedCom
        })
    };

    render() {
        const {stagedCom} = this.state;
        return (
            <div className="model-container">
                <div>
                    <FormattedMessage
                        id='basicTask'
                        defaultMessage='Basic Task'
                    />
                    {stagedCom.basicTask}
                </div>
                {
                    stagedCom.stagedCommission && stagedCom.stagedCommission.length > 0 ?
                        stagedCom.stagedCommission.map((item, i) => {
                            return <div key={i}>
                                <div className="display-flex">
                                    阶梯设置{item.stage} {isEmpty(item.min) ? <Input/> : item.min} - {isEmpty(item.max) ?
                                    <Input/> : item.max}
                                </div>
                                <div className="display-flex">
                                    提成金额 {isEmpty(item.commission) ? <Input/> : item.commission}
                                </div>
                            </div>
                        }) : null
                }
                <Button onClick={() => this.addStagedCom()}>新增阶梯提成</Button>
            </div>
        );
    }
}

export default StagedCommission;