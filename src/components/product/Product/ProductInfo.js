import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../../common/Input';
import Select from '../../common/Select';
import TextArea from '../../common/TextArea';
import Display from '../../common/Display';

class ProductInfo extends Component {

    getInfo = () => {
        return {
            id: this.props.info ? this.props.info.id : '',
            name: this.productNameNode.getWrappedInstance().getValue(),
            description: this.productSpecNode.getWrappedInstance().getValue(),
            unit_id: this.unitNode.getWrappedInstance().getValue(),
            price: this.unitPriceNode.getWrappedInstance().getValue(),
            sales: this.quantityNode.getWrappedInstance().getValue(),
            //totalPrice: this.totalPriceNode.getWrappedInstance().getValue()
        }
    };

    getUnitOption = () => {
        const {unit} = this.props;
        let options = [];
        unit.map((item) => {
            options.push({
                value: item.id,
                text: item.name
            })
        });
        return options;
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Product Name"
                           ref={node => this.productNameNode = node}
                           defaultValue={info.name}
                    />
                    <TextArea label="Product Specifications"
                              ref={node => this.productSpecNode = node}
                              defaultValue={info.description}
                    />
                    <Select options={this.getUnitOption()} label="Unit"
                            ref={node => this.unitNode = node}
                            defaultValue={info.unit_id}
                    />
                    <Input label="Unit Price"
                           ref={node => this.unitPriceNode = node}
                           defaultValue={info.price}
                    />
                    <Input label="Quantity"
                           ref={node => this.quantityNode = node}
                           defaultValue={info.sales}
                    />
                    <Display label="Total Price" value='100'/>
                </div>
            </Modal.Content>
        );
    }
}

export default ProductInfo;
