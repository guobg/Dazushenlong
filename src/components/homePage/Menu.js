import React, {Component} from 'react';
import {Menu} from 'antd';
import {
    Link
} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import createHistory from 'history/createBrowserHistory';
import Image from '../common/Image';

const history = createHistory();
const SubMenu = Menu.SubMenu;
const keyPathMapping = [
    {
        "key": '1',
        "path": '/home/employee',
        "hostKey": "sub1"
    },
    {
        "key": '2',
        "path": '/home/organization',
        "hostKey": "sub1"
    },
    {
        "key": '3',
        "path": '/home/member'
    },
    {
        "key": '4',
        "path": '/home/mCard'
    },
    {
        "key": '5',
        "path": '/home/schedule'
    },
    {
        "key": '6',
        "path": '/home/position',
        "hostKey": "sub1"
    },
    {
        "key": '7',
        "path": '/home/serviceItem'
    }
];

let defaultKey = '3', hostKey;

class HomeMenu extends Component {

    componentWillMount() {
        this.resetMenu();
    }

    componentWillUpdate() {
        this.resetMenu();
    }

    resetMenu = () => {
        const history = createHistory();
        const location = history.location;
        if (!location.pathname) {
            return;
        }
        keyPathMapping.some((keyPath) => {
            if (location.pathname.indexOf(keyPath.path) > -1) {
                defaultKey = keyPath.key;
                hostKey = keyPath.hostKey;
                return true;
            }
        });
    };

    render() {
        return (
            <Menu theme="dark" selectedKeys={[defaultKey]}
                  defaultOpenKeys={[hostKey]}
                  mode="inline">
                <Menu.Item key="3">
                    <Link to="/home/member"/>
                    <Image name="menu_project"/>
                    <span>
                        <FormattedMessage
                            id='Member'
                            defaultMessage='Member'
                        />
                    </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/home/mCard"/>
                    <Image name="menu_model"/>
                    <span>
                        <FormattedMessage
                            id='membershipCard'
                            defaultMessage='Membership Card'
                        />
                    </span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/home/schedule"/>
                    <Image name="menu_hr"/>
                    <span>
                        <FormattedMessage
                            id='schedule'
                            defaultMessage='Schedule'
                        />
                    </span>
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to="/home/serviceItem"/>
                    <Image name="menu_hr"/>
                    <span>
                        <FormattedMessage
                            id='serviceItem'
                            defaultMessage='Service Item'
                        />
                    </span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Image name="menu_personal"/><span>
                        <FormattedMessage
                            id='hr'
                            defaultMessage='HR'
                        />
                    </span></span>}
                >
                    <Menu.Item key="1"><Link to="/home/employee">
                        <FormattedMessage
                            id='employee'
                            defaultMessage='Employee'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/home/organization">
                        <FormattedMessage
                            id='department'
                            defaultMessage='Department'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/home/position">
                        <FormattedMessage
                            id='Position'
                            defaultMessage='Position'
                        />
                    </Link></Menu.Item>
                </SubMenu>

            </Menu>
        );
    }
}

export default HomeMenu;