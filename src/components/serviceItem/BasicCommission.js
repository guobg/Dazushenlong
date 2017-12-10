import React, {Component} from 'react';
import Input from '../common/Input';

class BasicCommission extends Component {
    getInfo = () => {
        return {
            callClockCom: this.callClockComNode.getWrappedInstance().getValue(),
            arrClockCom: this.arrClockComNode.getWrappedInstance().getValue(),
            basicTask: this.basicTaskNode.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <div className="model-container">
                <Input label="Call Clock Commission"
                       ref={node => this.callClockComNode = node}
                       defaultValue={info.callClockCom}
                />
                <Input label="Arrange Clock Commission"
                       ref={node => this.arrClockComNode = node}
                       defaultValue={info.arrClockCom}
                />
                <Input label="Basic Task"
                       ref={node => this.basicTaskNode = node}
                       defaultValue={info.basicTask}
                />
            </div>
        );
    }
}

export default BasicCommission;