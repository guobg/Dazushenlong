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
            name: this.nameNode.getWrappedInstance().getValue(),
            gender: this.genderNode.getWrappedInstance().getValue(),
            phone: this.phoneNode.getWrappedInstance().getValue(),
            birthday: this.birthdayNode.getValue(),
            rechargePackage: this.rechargePackageNode.getWrappedInstance().getValue()
        }
    };

    render() {
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
                    />
                    <Input label="Phone"
                           ref={node => this.phoneNode = node}
                    />
                    <Select options={genderOptions} label="Gender"
                            ref={node => this.genderNode = node}
                    />
                    <DatePicker label="Birthday"
                                ref={node => this.birthdayNode = node}/>
                    <Select options={contingencyOptions} label="Recharge Package"
                            ref={node => this.rechargePackageNode = node}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default CreateMemberInfo;
