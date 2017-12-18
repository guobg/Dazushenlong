import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import MaterielUnitInfo from './MaterielUnitInfo';
import {FormattedMessage} from 'react-intl';
import {createMaterielUnit} from '../../../actions/materielUnit_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreateMaterielUnit extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newMaterielUnit = () => {
        let materielUnitInfo = this.materielUnitInfoNode.getInfo();
        let flag = checkValid(materielUnitInfo);
        if (flag) {
            materielUnitInfo = getDataInfo(materielUnitInfo);
            this.props.dispatch(createMaterielUnit(materielUnitInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        return (
            <div className="model-main-container">
                <Button className="create-button" onClick={() => this.openModal()}>
                    <FormattedMessage
                        id='createMaterielUnit'
                        defaultMessage='Create MaterielUnit'
                    />
                </Button>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}
                    size='large'>
                    <Modal.Header className="modal-title-border">
                        <FormattedMessage
                            id='createMaterielUnit'
                            defaultMessage='Create MaterielUnit'
                        />
                    </Modal.Header>
                    <MaterielUnitInfo ref={(node) => this.materielUnitInfoNode = node}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newMaterielUnit()}>
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

export default CreateMaterielUnit;
