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

class EmployeeInfo extends Component {
    state = {
        selectedPosition: this.props.info ? this.props.info.position : ''
    };

    getInfo = () => {
        return {
            staffId: this.props.isEdit ? this.props.info.staffId : '',
            name: this.nameNode.getWrappedInstance().getValue(),
            gender: this.genderNode.getWrappedInstance().getValue(),
            idCard: this.idCardNode.getWrappedInstance().getValue(),
            position: this.positionNode.getWrappedInstance().getValue(),
            positionLevel: this.positionLevelNode ? this.positionLevelNode.getWrappedInstance().getValue() : '',
            phone: this.phoneNode.getWrappedInstance().getValue(),
            birthday: this.birthdayNode.getValue(),
            entryTime: this.entryTimeNode.getValue(),
            marriage: this.marriageNode.getWrappedInstance().getValue(),
            address: this.addressNode.getWrappedInstance().getValue(),
            educationLevel: this.educationLevelNode.getWrappedInstance().getValue(),
            skill: this.skillNode.getWrappedInstance().getValue(),
            remark: this.remarkNode.getWrappedInstance().getValue()
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
        const {info = {}, isEdit} = this.props;
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
                           defaultValue={info.name}
                           readOnly={isEdit}
                           required={true}
                    />
                    <Select options={genderOptions} label="Gender"
                            ref={node => this.genderNode = node}
                            defaultValue={info.gender}
                            required={true}
                    />
                    <DatePicker label="Birthday"
                                ref={node => this.birthdayNode = node}
                                defaultValue={info.birthday}
                                required={true}/>
                    <Select options={marriageOptions} label="Marriage"
                            ref={node => this.marriageNode = node}
                            defaultValue={info.marriage}
                            required={true}
                    />
                    <Input label="IDCard"
                           ref={node => this.idCardNode = node}
                           defaultValue={info.idCard}
                           required={true}
                    />
                    <Input label="Phone"
                           ref={node => this.phoneNode = node}
                           defaultValue={info.phone}
                           required={true}
                    />
                    <Input label="Address"
                           ref={node => this.addressNode = node}
                           defaultValue={info.address}
                    />
                    <Select options={educationOptions} label="Education Level"
                            ref={node => this.educationLevelNode = node}
                            defaultValue={info.educationLevel}
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
                                defaultValue={info.entryTime}/>
                    <Select options={this.getPositionOption()}
                            label="Position"
                            ref={node => this.positionNode = node}
                            defaultValue={info.position}
                            onChange={(selectedPosition) => {
                                this.setState({
                                    selectedPosition: selectedPosition
                                })
                            }}
                            required={true}
                    />
                    {selectedPosition && positionLevelOption.length > 0 ?
                        <Select options={positionLevelOption} label="Position Level"
                                ref={node => this.positionLevelNode = node}
                                defaultValue={info.positionLevel}
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
