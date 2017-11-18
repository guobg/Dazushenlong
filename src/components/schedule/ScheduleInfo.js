import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import Input from '../common/Input';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import DatePicker from '../common/DatePicker';
import {
    staffStatusOptions
} from '../../res/data/dataOptions';

class ScheduleInfo extends Component {

    getInfo = () => {
        return {
            scheduleId: this.props.info ? this.props.info.scheduleId : '',
            name: this.nameNode.getWrappedInstance().getValue(),
            phone: this.phoneNode.getWrappedInstance().getValue(),
            status: this.statusNode.getWrappedInstance().getValue(),
            remark: this.remarkNode.getWrappedInstance().getValue(),
            scheduleTime: this.scheduleTimeNode.getValue()
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
                    <DatePicker label="Schedule Time"
                                showTime={true}
                                ref={node => this.scheduleTimeNode = node}
                                defaultValue={info.scheduleTime}
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

export default ScheduleInfo;
