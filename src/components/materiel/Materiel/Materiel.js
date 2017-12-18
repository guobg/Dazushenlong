import React, {Component} from 'react';
import MaterielList from './MaterielList';
import CreateMateriel from './CreateMateriel';
import Image from '../../common/Image';

import {FormattedMessage} from 'react-intl';

class Materiel extends Component {

    render() {
        const {dispatch, materiel, materielUnit} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='materiel'
                        defaultMessage='Materiel'
                    />
                </div>
                <CreateMateriel dispatch={dispatch} materielUnit={materielUnit}/>
                <MaterielList dispatch={dispatch} materiel={materiel} materielUnit={materielUnit}/>
            </div>
        );
    }
}

export default Materiel;
