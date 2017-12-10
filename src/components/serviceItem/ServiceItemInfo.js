import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import DatePicker from '../common/DatePicker';
import {
    staffStatusOptions,
    yesOrNoOptions
} from '../../res/data/dataOptions';

class ServiceItemInfo extends Component {

    getInfo = () => {
        return {
            serviceItemId: this.props.info ? this.props.info.serviceItemId : '',
            serviceItemName: this.nameNode.getWrappedInstance().getValue(),
            unit: this.unitNode.getWrappedInstance().getValue(),
            technicianNumber: this.technicianNumberNode.getWrappedInstance().getValue(),
            isCountTime: this.isCountTimeNode.getWrappedInstance().getValue(),
            serviceDuration: this.serviceDurationNode.getWrappedInstance().getValue(),
            unitPrice: this.unitPriceNode.getWrappedInstance().getValue(),
            maxDiscount: this.maxDiscountNode.getWrappedInstance().getValue(),
            canCallClock: this.canCallClockNode.getWrappedInstance().getValue(),
            canUseCoupon: this.canUseCouponNode.getWrappedInstance().getValue(),
            countPersonTime: this.countPersonTimeNode.getWrappedInstance().getValue(),
            addClockCountPersonTime: this.addClockCountPersonTimeNode.getWrappedInstance().getValue(),
            unitRatio: this.unitRatioNode.getWrappedInstance().getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Service Item Name"
                           ref={node => this.nameNode = node}
                           defaultValue={info.serviceItemName}
                    />
                    <Input label="Unit"
                           ref={node => this.unitNode = node}
                           defaultValue={info.unit}
                    />
                    <Input label="Technician Number"
                           ref={node => this.technicianNumberNode = node}
                           defaultValue={info.technicianNumber}
                           type="number"
                           step={1}
                    />
                    <Select options={yesOrNoOptions} label="Is Count Time"
                            ref={node => this.isCountTimeNode = node}
                            defaultValue={info.isCountTime}
                    />
                    <Input label="Service Duration(Minute)"
                           ref={node => this.serviceDurationNode = node}
                           defaultValue={info.serviceDuration}
                           type="number"
                           step={1}
                    />
                    <Input label="Unit Price"
                           ref={node => this.unitPriceNode = node}
                           defaultValue={info.unitPrice}
                           type="number"
                           step={1}
                    />
                    <Input label="Max Discount"
                           ref={node => this.maxDiscountNode = node}
                           defaultValue={info.maxDiscount}
                           type="number"
                           step={1}
                    />
                    <Select options={yesOrNoOptions} label="Can Call Clock"
                            ref={node => this.canCallClockNode = node}
                            defaultValue={info.canCallClock}
                    />
                    <Select options={yesOrNoOptions} label="Can Use Coupon"
                            ref={node => this.canUseCouponNode = node}
                            defaultValue={info.canUseCoupon}
                    />
                    <Input label="Count Person/Time"
                           ref={node => this.countPersonTimeNode = node}
                           defaultValue={info.countPersonTime}
                    />
                    <Input label="Add Clock Count Person/Time"
                           ref={node => this.addClockCountPersonTimeNode = node}
                           defaultValue={info.addClockCountPersonTime}
                    />
                    <Input label="Unit Ratio"
                           ref={node => this.unitRatioNode = node}
                           defaultValue={info.unitRatio}
                           type="number"
                           step={0.01}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default ServiceItemInfo;
