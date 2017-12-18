import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import Select from '../../common/Select';
import {
    numberOptions
} from '../../../res/data/dataOptions';

class MaterielUnitInfo extends Component {

    getInfo = () => {
        return {
            materielUnitId: this.props.info ? this.props.info.materielUnitId : '',
            unitName: this.unitNameNode.getWrappedInstance().getValue(),
            decimalDigit: this.decimalDigitNode.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Unit Name"
                           ref={node => this.unitNameNode = node}
                           defaultValue={info.unitName}
                    />
                    <Select options={numberOptions} label="Decimal Digits"
                            ref={node => this.decimalDigitNode = node}
                            defaultValue={info.decimalDigit}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default MaterielUnitInfo;
