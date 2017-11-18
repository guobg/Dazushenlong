import React, {Component} from 'react';
import MemberCardList from './MemberCardList';
import CreateMemberCard from './CreateMemberCard';
import Image from '../common/Image';

import {FormattedMessage} from 'react-intl';

class MemberCard extends Component {

    render() {
        const {dispatch, memberCard} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='membershipCard'
                        defaultMessage='Membership Card'
                    />
                </div>
                <MemberCardList dispatch={dispatch} memberCard={memberCard}/>
                <CreateMemberCard dispatch={dispatch}/>
            </div>
        );
    }
}

export default MemberCard;
