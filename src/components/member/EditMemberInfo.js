import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../common/Input';
import Select from '../common/Select';
import DatePicker from '../common/DatePicker';
import Image from '../common/Image';
import {
    genderOptions,
    contingencyOptions
} from '../../res/data/dataOptions';

class CreateMemberInfo extends Component {

    getInfo = () => {
        return {
            memberId: this.props.info.memberId,
            name: this.nameNode.getWrappedInstance().getValue(),
            phone: this.phoneNode.getWrappedInstance().getValue(),
            birthday: this.birthdayNode.getValue()
        }
    };

    render() {
        const {info = {}} = this.props;
        return (
            <Modal.Content>
                <div className="modal-description">
                    <div className="modal-header">
                        <Image name="basic_info"/>
                        <FormattedMessage
                            id='basicInfo'
                            defaultMessage='Basic Info'
                        />
                    </div>
                </div>
                <div className="model-container">
                    <Input label="Name"
                           ref={node => this.nameNode = node}
                           defaultValue={info.name}
                    />
                    <Input label="Phone"
                           ref={node => this.phoneNode = node}
                           defaultValue={info.phone}
                    />
                    <DatePicker label="Birthday"
                                ref={node => this.birthdayNode = node}
                                defaultValue={info.birthday}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default CreateMemberInfo;
