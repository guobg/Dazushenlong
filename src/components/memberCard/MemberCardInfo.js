import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../common/Input';

class MemberCardInfo extends Component {

    getInfo = () => {
        return {
            id: this.props.info ? this.props.info.id : '',
            name: this.memberCardNameNode.getWrappedInstance().getValue(),
            discount: this.discountNode.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Membership Card Name"
                           ref={node => this.memberCardNameNode = node}
                           defaultValue={info.name}
                    />
                    {/*<Select options={contingencyOptions} label="Discount"
                            ref={node => this.discountNode = node}
                            defaultValue={info.discount}
                    />*/}
                    <Input label="Discount"
                           ref={node => this.discountNode = node}
                           defaultValue={info.discount}
                           type="number"
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default MemberCardInfo;
