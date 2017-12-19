import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import Select from '../../common/Select';
import TextArea from '../../common/TextArea';

class MaterielInfo extends Component {

    getInfo = () => {
        return {
            materielId: this.props.info ? this.props.info.materielId : '',
            materielName: this.materielNameNode.getWrappedInstance().getValue(),
            materielSpec: this.materielSpecNode.getWrappedInstance().getValue(),
            unit: this.unitNode.getWrappedInstance().getValue(),
            unitPrice: this.unitPriceNode.getWrappedInstance().getValue(),
            quantity: this.quantityNode.getWrappedInstance().getValue(),
            totalPrice: this.totalPriceNode.getWrappedInstance().getValue()
        }
    };

    getUnitOption = () => {
        const {materielUnit} = this.props;
        let options = [];
        materielUnit.map((item) => {
            options.push({
                value: item.materielUnitId,
                text: item.unitName
            })
        });
        return options;
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Materiel Name"
                           ref={node => this.materielNameNode = node}
                           defaultValue={info.materielName}
                    />
                    <TextArea label="Materiel Specifications"
                              ref={node => this.materielSpecNode = node}
                              defaultValue={info.materielSpec}
                    />
                    <Select options={this.getUnitOption()} label="Unit"
                            ref={node => this.unitNode = node}
                            defaultValue={info.unit}
                    />
                    <Input label="Unit Price"
                           ref={node => this.unitPriceNode = node}
                           defaultValue={info.unitPrice}
                    />
                    <Input label="Quantity"
                           ref={node => this.quantityNode = node}
                           defaultValue={info.quantity}
                    />
                    <Input label="Total Price"
                           ref={node => this.totalPriceNode = node}
                           defaultValue={info.totalPrice}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default MaterielInfo;
