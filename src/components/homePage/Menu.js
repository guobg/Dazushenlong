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
    }
];

let defaultKey = '1', hostKey;

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