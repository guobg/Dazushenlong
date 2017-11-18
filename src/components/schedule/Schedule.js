import React, {Component} from 'react';
import ScheduleList from './ScheduleList';
import CreateSchedule from './CreateSchedule';
import Image from '../common/Image';

import {FormattedMessage} from 'react-intl';

class Schedule extends Component {

    render() {
        const {dispatch, schedule} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='schedule'
                        defaultMessage='Schedule'
                    />
                </div>
                <ScheduleList dispatch={dispatch} schedule={schedule}/>
                <CreateSchedule dispatch={dispatch}/>
            </div>
        );
    }
}

export default Schedule;
