import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../../common/Input';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import Image from '../../common/Image';
import TextArea from '../../common/TextArea';
import {
    genderOptions,
    contingencyOptions,
    marriageOptions,
    educationOptions
} from '../../../res/data/dataOptions';
import OrganizationTree from './OrganizationTree';

class EmployeeInfo extends Component {
    state = {
        selectedPosition: this.props.info ? this.props.info.position : ''
    };

    getInfo = () => {
        return {
            user_id: this.props.isEdit ? this.props.info.user_id : '',
            user_name: this.nameNode.getWrappedInstance().getValue(),
            user_gender: this.genderNode.getWrappedInstance().getValue(),
            id_card_no: this.idCardNode.getWrappedInstance().getValue(),
            position_id: this.positionNode.getWrappedInstance().getValue(),
            position_level_id: this.positionLevelNode ? this.positionLevelNode.getWrappedInstance().getValue() : '',
            user_mobile: this.phoneNode.getWrappedInstance().getValue(),
            birthday: this.birthdayNode.getValue(),
            hire_date: this.entryTimeNode.getValue(),
            is_married_id: this.marriageNode.getWrappedInstance().getValue(),
            address: this.addressNode.getWrappedInstance().getValue(),
            education_level_id: this.educationLevelNode.getWrappedInstance().getValue(),
            skill: this.skillNode.getWrappedInstance().getValue(),
            remark: this.remarkNode.getWrappedInstance().getValue(),
            department_id: this.orgNode.getValue()
        }
    };

    getPositionLevelOption = (positionId) => {
        const {position} = this.props;
        let options = [];
        position.some((item) => {
            if (item.value === positionId) {
                options = item.levels;
                return true;
            }
        });
        return options;
    };

    getPositionOption = () => {
        const {position} = this.props;
        let options = [];
        position.map((item) => {
            options.push({
                value: item.value,
                text: item.text
            })
        });
        return options;
    };

    render() {
        const {info = {}, isEdit, organization = {}} = this.props;
        const {selectedPosition} = this.state;
        const positionLevelOption = this.getPositionLevelOption(selectedPosition);
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
                    <Input label="Employee Name"
                           ref={node => this.nameNode = node}
                           defaultValue={info.user_name}
                           readOnly={isEdit}
                           required={true}
                    />
                    <Select options={genderOptions} label="Gender"
                            ref={node => this.genderNode = node}
                            defaultValue={info.user_gender}
                            required={true}
                    />
                    <DatePicker label="Birthday"
                                ref={node => this.birthdayNode = node}
                                defaultValue={info.birthday}
                                required={true}/>
                    <Select options={marriageOptions} label="Marriage"
                            ref={node => this.marriageNode = node}
                            defaultValue={info.is_married_id}
                            required={true}
                    />
                    <Input label="IDCard"
                           ref={node => this.idCardNode = node}
                           defaultValue={info.id_card_no}
                           required={true}
                    />
                    <Input label="Phone"
                           ref={node => this.phoneNode = node}
                           defaultValue={info.user_mobile}
                           required={true}
                    />
                    <Input label="Address"
                           ref={node => this.addressNode = node}
                           defaultValue={info.address}
                    />
                    <Select options={educationOptions} label="Education Level"
                            ref={node => this.educationLevelNode = node}
                            defaultValue={info.education_level_id}
                    />
                </div>

                <div className="modal-description">
                    <div className="modal-header">
                        <Image name="additional_info"/>
                        <FormattedMessage
                            id='postInfo'
                            defaultMessage='Post Info'
                        />
                    </div>
                </div>
                <div className="model-container">
                    <DatePicker label="Employ Date"
                                ref={node => this.entryTimeNode = node}
                                defaultValue={info.hire_date}/>
                    <OrganizationTree ref={node => this.orgNode = node}
                                      organization={organization}
                                      label="Department"
                                      defaultValue={info.department_id}
                    />
                    <Select options={this.getPositionOption()}
                            label="Position"
                            ref={node => this.positionNode = node}
                            defaultValue={info.position_id}
                            onChange={(selectedPosition) => {
                                this.setState({
                                    selectedPosition: selectedPosition
                                })
                            }}
                    />
                    {selectedPosition && positionLevelOption.length > 0 ?
                        <Select options={positionLevelOption} label="Position Level"
                                ref={node => this.positionLevelNode = node}
                                defaultValue={info.position_level_id}
                                required={true}
                        /> : null}
                </div>

                <div className="modal-description">
                    <div className="modal-header">
                        <Image name="optional_info"/>
                        <FormattedMessage
                            id='otherInfo'
                            defaultMessage='Other Info'
                        />
                    </div>
                </div>
                <div className="model-container">
                    <Input label="Skill"
                           ref={node => this.skillNode = node}
                           defaultValue={info.skill}
                    />
                    <TextArea label="Remark"
                              ref={node => this.remarkNode = node}
                              defaultValue={info.remark}
                    />
                </div>
            </Modal.Content>
        );
    }
}

export default EmployeeInfo;
