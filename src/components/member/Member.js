import React, {Component} from 'react';
import MemberList from './MemberList';
import CreateMember from './CreateMember';
import Image from '../common/Image';

import {FormattedMessage} from 'react-intl';

class Employee extends Component {

    render() {
        const {dispatch, member} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='member'
                        defaultMessage='Member'
                    />
                </div>
                <MemberList dispatch={dispatch} member={member}/>
                <CreateMember dispatch={dispatch}/>
            </div>
        );
    }
}

export default Employee;
