import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import DatePicker from '../common/DatePicker';
import {
    staffStatusOptions
} from '../../res/data/dataOptions';

class ServiceItemInfo extends Component {

    getInfo = () => {
        return {
            serviceItemId: this.props.info ? this.props.info.serviceItemId : '',
            name: this.nameNode.getWrappedInstance().getValue(),
            phone: this.phoneNode.getWrappedInstance().getValue(),
            status: this.statusNode.getWrappedInstance().getValue(),
            remark: this.remarkNode.getWrappedInstance().getValue(),
            serviceItemTime: this.serviceItemTimeNode.getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Name"
                           ref={node => this.nameNode = node}
                           defaultValue={info.name}
                    />
                    <Input label="Phone"
                           ref={node => this.phoneNode = node}
                           defaultValue={info.phone}
                    />
                    <DatePicker label="ServiceItem Time"
                                showTime={true}
                                ref={node => this.serviceItemTimeNode = node}
                                defaultValue={info.serviceItemTime}
                    />
                    <Select options={staffStatusOptions} label="Status"
                            ref={node => this.statusNode = node}
                            defaultValue={info.status}
                    />
                    <TextArea label="Remark"
                              ref={node => this.remarkNode = node}
                              defaultValue={info.remark}/>
                </div>
            </Modal.Content>
        );
    }
}

export default ServiceItemInfo;
