import React, {Component} from 'react';
import {Modal, Button} from 'semantic-ui-react';
import MaterielInfo from './MaterielInfo';
import {FormattedMessage} from 'react-intl';
import {createMateriel} from '../../../actions/materiel_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class CreateMateriel extends Component {
    state = {modalOpen: false};

    openModal = () => this.setState({modalOpen: true});

    closeModal = () => this.setState({modalOpen: false});

    newMateriel = () => {
        let materielInfo = this.materielInfoNode.getInfo();
        let flag = checkValid(materielInfo);
        if (flag) {
            materielInfo = getDataInfo(materielInfo);
            this.props.dispatch(createMateriel(materielInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen} = this.state;
        const {materielUnit} = this.props;
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
                            id='createMateriel'
                            defaultMessage='Create Materiel'
                        />
                    </Modal.Header>
                    <MaterielInfo ref={(node) => this.materielInfoNode = node} materielUnit={materielUnit}/>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.newMateriel()}>
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

export default CreateMateriel;
