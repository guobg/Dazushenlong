import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import UnitInfo from './UnitInfo';
import {updateUnit} from '../../../actions/unit_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class EditUnit extends Component {
    state = {modalOpen: false, unitInfo: {}};

    componentWillUpdate() {
        this.fixBody();
    }

    componentDidUpdate() {
        this.fixBody();
    }

    fixBody = () => {
        const anotherModal = document.getElementsByClassName('ui page modals').length;
        if (anotherModal > 0) document.body.classList.add('scrolling', 'dimmable', 'dimmed');
    };

    openModal = (unit) => {
        this.setState({
            modalOpen: true,
            unitInfo: unit
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateUnitInfo = () => {
        let unitInfo = this.unitInfoNode.getInfo();
        let flag = checkValid(unitInfo);
        if (flag) {
            unitInfo = getDataInfo(unitInfo);
            this.props.dispatch(updateUnit(unitInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, unitInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editUnit'
                            defaultMessage='Edit Unit'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <UnitInfo
                            info={unitInfo}
                            ref={node => this.unitInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateUnitInfo()}>
                            <FormattedMessage
                                id='confirm'
                                defaultMessage='Confirm'
                            />
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }
}

export default EditUnit;