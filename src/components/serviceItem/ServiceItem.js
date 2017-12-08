import React, {Component} from 'react';
import ServiceItemList from './ServiceItemList';
import CreateServiceItem from './CreateServiceItem';
import Image from '../common/Image';

import {FormattedMessage} from 'react-intl';

class ServiceItem extends Component {

    render() {
        const {dispatch, serviceItem} = this.props;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name="project"/>
                    <FormattedMessage
                        id='serviceItem'
                        defaultMessage='ServiceItem'
                    />
                </div>
                <ServiceItemList dispatch={dispatch} serviceItem={serviceItem}/>
                <CreateServiceItem dispatch={dispatch}/>
            </div>
        );
    }
}

export default ServiceItem;
