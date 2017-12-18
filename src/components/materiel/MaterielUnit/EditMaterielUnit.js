import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import MaterielUnitInfo from './MaterielUnitInfo';
import {updateMaterielUnit} from '../../../actions/materielUnit_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class EditMaterielUnit extends Component {
    state = {modalOpen: false, materielUnitInfo: {}};

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

    openModal = (materielUnit) => {
        this.setState({
            modalOpen: true,
            materielUnitInfo: materielUnit
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateMaterielUnitInfo = () => {
        let materielUnitInfo = this.materielUnitInfoNode.getInfo();
        let flag = checkValid(materielUnitInfo);
        if (flag) {
            materielUnitInfo = getDataInfo(materielUnitInfo);
            this.props.dispatch(updateMaterielUnit(materielUnitInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, materielUnitInfo} = this.state;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editMaterielUnit'
                            defaultMessage='Edit MaterielUnit'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <MaterielUnitInfo
                            info={materielUnitInfo}
                            ref={node => this.materielUnitInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateMaterielUnitInfo()}>
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

export default EditMaterielUnit;