import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import {
    Link
} from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import createHistory from 'history/createBrowserHistory';

const history = createHistory();
const location = history.location;
const SubMenu = Menu.SubMenu;
const keyPathMapping = [
    {
        "key": '1',
        "path": '/home/Employee',
        "hostKey": "sub1"
    },
    {
        "key": '2',
        "path": '/home/Department',
        "hostKey": "sub1"
    },
    {
        "key": '3',
        "path": '/home/Member'
    },
    {
        "key": '4',
        "path": '/home/MemberCard'
    },
    {
        "key": '5',
        "path": '/home/Schedule'
    }
];

let defaultKey = '3', hostKey;

class HomeMenu extends Component {

    componentWillMount() {
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
    }

    render() {
        return (
            <Menu theme="dark" defaultSelectedKeys={[defaultKey]}
                  defaultOpenKeys={[hostKey]}
                  mode="inline">
                <Menu.Item key="3">
                    <Link to="/home/Member"/>
                    <Icon type="pie-chart"/>
                    <span>
                        <FormattedMessage
                            id='Member'
                            defaultMessage='Member'
                        />
                    </span>
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/home/MemberCard"/>
                    <Icon type="pie-chart"/>
                    <span>
                        <FormattedMessage
                            id='membershipCard'
                            defaultMessage='Membership Card'
                        />
                    </span>
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/home/Schedule"/>
                    <Icon type="pie-chart"/>
                    <span>
                        <FormattedMessage
                            id='schedule'
                            defaultMessage='Schedule'
                        />
                    </span>
                </Menu.Item>
                <SubMenu
                    key="sub1"
                    title={<span><Icon type="user"/><span>
                        <FormattedMessage
                            id='hr'
                            defaultMessage='HR'
                        />
                    </span></span>}
                >
                    <Menu.Item key="1"><Link to="/home/Employee">
                        <FormattedMessage
                            id='employee'
                            defaultMessage='Employee'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/home/Department">
                        <FormattedMessage
                            id='department'
                            defaultMessage='Department'
                        />
                    </Link></Menu.Item>
                </SubMenu>

            </Menu>
        );
    }
}

export default HomeMenu;