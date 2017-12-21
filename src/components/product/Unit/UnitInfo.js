import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import Select from '../../common/Select';
import {
    numberOptions
} from '../../../res/data/dataOptions';

class UnitInfo extends Component {

    getInfo = () => {
        return {
            id: this.props.info ? this.props.info.id : '',
            name: this.unitNameNode.getWrappedInstance().getValue(),
            unit_decimal: this.decimalDigitNode.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Unit Name"
                           ref={node => this.unitNameNode = node}
                           defaultValue={info.name}
                    />
                    <Select options={numberOptions} label="Decimal Digits"
                            ref={node => this.decimalDigitNode = node}
                            defaultValue={info.unit_decimal}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default UnitInfo;
