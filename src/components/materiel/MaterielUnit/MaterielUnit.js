import React, {Component} from 'react';
import MaterielUnitList from './MaterielUnitList';
import CreateMaterielUnit from './CreateMaterielUnit';
import Image from '../../common/Image';

import {FormattedMessage} from 'react-intl';

class MaterielUnit extends Component {

    render() {
        const {dispatch, materielUnit} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='materielUnit'
                        defaultMessage='MaterielUnit'
                    />
                </div>
                <CreateMaterielUnit dispatch={dispatch}/>
                <MaterielUnitList dispatch={dispatch} materielUnit={materielUnit}/>
            </div>
        );
    }
}

export default MaterielUnit;
