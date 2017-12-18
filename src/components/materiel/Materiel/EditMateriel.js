import React, {Component} from 'react';
import {Button, Modal} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import MaterielInfo from './MaterielInfo';
import {updateMateriel} from '../../../actions/materiel_action';
import {checkValid, getDataInfo} from '../../../util/CommUtil';

class EditMateriel extends Component {
    state = {modalOpen: false, materielInfo: {}};

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

    openModal = (materiel) => {
        this.setState({
            modalOpen: true,
            materielInfo: materiel
        })
    };

    closeModal = () => this.setState({modalOpen: false});

    updateMaterielInfo = () => {
        let materielInfo = this.materielInfoNode.getInfo();
        let flag = checkValid(materielInfo);
        if (flag) {
            materielInfo = getDataInfo(materielInfo);
            this.props.dispatch(updateMateriel(materielInfo, this.closeModal));
        }
    };

    render() {
        const {modalOpen, materielInfo} = this.state;
        const {materielUnit} = this.props;
        return (
            <div>
                <Modal
                    closeOnEscape={false}
                    closeOnRootNodeClick={false}
                    open={modalOpen}>
                    <Modal.Header>
                        <FormattedMessage
                            id='editMateriel'
                            defaultMessage='Edit Materiel'
                        />
                    </Modal.Header>
                    <Modal.Content>
                        <MaterielInfo
                            materielUnit={materielUnit}
                            info={materielInfo}
                            ref={node => this.materielInfoNode = node}/>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button className="cancel-button" onClick={() => this.closeModal()}>
                            <FormattedMessage
                                id='cancel'
                                defaultMessage='Cancel'
                            />
                        </Button>
                        <Button className="confirm-button" onClick={() => this.updateMaterielInfo()}>
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

export default EditMateriel;