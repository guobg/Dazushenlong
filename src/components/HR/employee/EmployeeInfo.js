import React, {Component} from 'react';
import {Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../../common/Input';
import Select from '../../common/Select';
import DatePicker from '../../common/DatePicker';
import Image from '../../common/Image';
import {
    genderOptions,
    staffStatusOptions,
    positionLevelOptions,
    contingencyOptions
} from '../../../res/data/dataOptions';

class EmployeeInfo extends Component {
    state = {
        selectedDepartment: this.props.info ? this.props.info.department : ''
    };

    getInfo = () => {
        return {
            staffId: this.props.isEdit ? this.props.info.staffId : '',
            name: this.nameNode.getWrappedInstance().getValue(),
            gender: this.genderNode.getWrappedInstance().getValue(),
            post: this.postNode ? this.postNode.getWrappedInstance().getValue() : '',
            department: this.departmentNode.getWrappedInstance().getValue(),
            positionLevel: this.positionLevelNode.getWrappedInstance().getValue(),
            phone: this.phoneNode.getWrappedInstance().getValue(),
            birthday: this.birthdayNode.getValue(),
            entryTime: this.entryTimeNode.getValue(),
            address: this.addressNode.getWrappedInstance().getValue(),
            emergencyName: this.emergencyNameNode.getWrappedInstance().getValue(),
            emergencyPhone: this.emergencyPhoneNode.getWrappedInstance().getValue(),
            range: this.rangeNode.getWrappedInstance().getValue(),
            status: this.props.isEdit ? this.statusNode.getWrappedInstance().getValue() : "active"
        }
    };

    getPositionOption = (departmentId) => {
        const {department} = this.props;
        let options = [];
        department.some((item) => {
            if (item.value === departmentId) {
                options = item.positions;
                return true;
            }
        });
        return options;
    };

    getDepartmentOption = () => {
        const {department} = this.props;
        let options = [];
        department.map((item) => {
            options.push({
                value: item.value,
                text: item.text
            })
        });
        return options;
    };

    render() {
        const {info = {}, isEdit} = this.props;
        const {selectedDepartment} = this.state;
        const positionOption = this.getPositionOption(selectedDepartment);
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
                    />
                    <Select options={contingencyOptions} label="Gender"
                            ref={node => this.genderNode = node}
                            defaultValue={info.gender}
                    />
                    <DatePicker label="Birthday"
                                ref={node => this.birthdayNode = node}
                                defaultValue={info.birthday}/>
                    <DatePicker label="Entry Time"
                                ref={node => this.entryTimeNode = node}
                                defaultValue={info.entryTime}/>
                    <Input label="Phone"
                           ref={node => this.phoneNode = node}
                           defaultValue={info.phone}
                    />
                    <Input label="Address"
                           ref={node => this.addressNode = node}
                           defaultValue={info.address}
                    />
                    <Input label="Emergency Contact Name"
                           ref={node => this.emergencyNameNode = node}
                           defaultValue={info.emergencyName}
                    />
                    <Input label="Emergency Contact Phone"
                           ref={node => this.emergencyPhoneNode = node}
                           defaultValue={info.emergencyPhone}
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
                    <Select options={this.getDepartmentOption()} label="Department"
                            ref={node => this.departmentNode = node}
                            onChange={(selectedDepartment) => {
                                this.setState({
                                    selectedDepartment: selectedDepartment
                                })
                            }}
                            defaultValue={info.department}
                    />
                    {selectedDepartment ?
                        <Select options={positionOption}
                                label="Post"
                                ref={node => this.postNode = node}
                                defaultValue={info.post}
                        /> : null}
                    <Select options={positionLevelOptions} label="Position Level"
                            ref={node => this.positionLevelNode = node}
                            defaultValue={info.positionLevel}
                    />
                    <Select options={contingencyOptions} label="Range"
                            ref={node => this.rangeNode = node}
                            defaultValue={info.range}
                    />
                    {isEdit ? <Select options={staffStatusOptions} label="Status" horizontal={true} icon="id badge"
                                      ref={node => this.statusNode = node}
                                      defaultValue={info.status}
                    /> : null}
                </div>
            </Modal.Content>
        );
    }
}

export default EmployeeInfo;
