import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../common/Input';
import Select from '../common/Select';
import {
    contingencyOptions
} from '../../res/data/dataOptions';

class MemberCardInfo extends Component {

    getInfo = () => {
        return {
            memberCardId: this.props.info ? this.props.info.memberCardId : '',
            memberCardName: this.memberCardNameNode.getWrappedInstance().getValue(),
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
                           defaultValue={info.memberCardName}
                    />
                    <Select options={contingencyOptions} label="Discount"
                            ref={node => this.discountNode = node}
                            defaultValue={info.discount}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default MemberCardInfo;
