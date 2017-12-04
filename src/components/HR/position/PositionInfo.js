import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import Input from '../../common/Input';
import _ from 'lodash';
import {getTimeAndRandom} from '../../../util/CommUtil';

class PositionInfo extends Component {
    state = {
        levels: this.props.info && this.props.info.levels ?
            _.cloneDeep(this.props.info.levels) :
            []
    };

    getInfo = () => {
        return {
            name: this.nameNode.getWrappedInstance().getValue(),
            levels: this.state.levels
        }
    };

    createPosition = () => {
        let tempPositions = this.state.levels;
        tempPositions.push({key: getTimeAndRandom(), name: ''});
        this.setState({
            levels: tempPositions
        })
    };

    removePosition = (position) => {
        let tempPositions = this.state.levels;
        tempPositions.splice(tempPositions.indexOf(position), 1);
        this.setState({
            levels: tempPositions
        })
    };

    render() {
        const {info = {}} = this.props;
        const {levels} = this.state;
        return (
            <Modal.Content>
                <div className="model-container">
                    <Input label="Position Name"
                           ref={node => this.nameNode = node}
                           defaultValue={info.name}
                    />
                    <div className="components-item item-horizontal align-right">
                        <div className="field-title">
                            <FormattedMessage
                                id='Position Level'
                                defaultMessage='Position Level'
                            />
                        </div>
                        <div className="input-content">
                            <Button className="confirm-button "
                                    onClick={() => this.createPosition()}>
                                <FormattedMessage
                                    id='createPositionLevel'
                                    defaultMessage='Create Position Level'
                                />
                            </Button>
                        </div>
                    </div>
                    {
                        levels.map((item, i) => {
                            return <div key={i} className="components-item item-horizontal align-right">
                                <div className="input-content add-department-content">
                                    <Input
                                        onChange={(value) => {
                                            item.name = value;
                                            this.setState({
                                                levels: levels
                                            })
                                        }}
                                        value={item.name}
                                        fullWidth={true}
                                    />
                                    <Button className="delete-button"
                                            onClick={() => this.removePosition(item)}>
                                        <FormattedMessage
                                            id='delete'
                                            defaultMessage='Delete'
                                        />
                                    </Button>
                                </div>
                            </div>
                        })
                    }
                </div>
            </Modal.Content>
        );
    }
}

export default PositionInfo;
