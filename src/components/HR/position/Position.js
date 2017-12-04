import React, {Component} from 'react';
import Image from '../../common/Image';
import CreatePosition from './CreatePosition';
import PositionList from './PositionList';
import {FormattedMessage} from 'react-intl';

class Position extends Component {
    render() {
        const {dispatch, position} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name='position'/>
                    <FormattedMessage
                        id='Position'
                        defaultMessage='Position'
                    />
                </div>
                <CreatePosition dispatch={dispatch}/>
                <PositionList dispatch={dispatch} position={position}/>
            </div>
        );
    }
}

export default Position;
