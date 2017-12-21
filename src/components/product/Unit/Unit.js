import React, {Component} from 'react';
import UnitList from './UnitList';
import CreateUnit from './CreateUnit';
import Image from '../../common/Image';

import {FormattedMessage} from 'react-intl';

class Unit extends Component {

    render() {
        const {dispatch, unit} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='unit'
                        defaultMessage='Unit'
                    />
                </div>
                <CreateUnit dispatch={dispatch}/>
                <UnitList dispatch={dispatch} unit={unit}/>
            </div>
        );
    }
}

export default Unit;
