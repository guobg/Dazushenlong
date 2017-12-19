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
    },
    {
        "key": '8',
        "path": '/home/materiel',
        "hostKey": "sub2"
    },
    {
        "key": '9',
        "path": '/home/mUnit',
        "hostKey": "sub2"
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
            <Menu selectedKeys={[defaultKey]}
                  defaultOpenKeys={[hostKey]}
                  mode="inline">
                <Menu.Item key="3">
                    <Link to="/home/member"/>
                    <Image name={defaultKey === "3" ? "technician_ic_pre" : "technician_ic"}/>
                    <FormattedMessage
                        id='Member'
                        defaultMessage='Member'
                    />
                </Menu.Item>
                <Menu.Item key="4">
                    <Link to="/home/mCard"/>
                    <Image name={defaultKey === "4" ? "wage_ic_pre" : "wage_ic"}/>
                    <FormattedMessage
                        id='membershipCard'
                        defaultMessage='Membership Card'
                    />
                </Menu.Item>
                <Menu.Item key="5">
                    <Link to="/home/schedule"/>
                    <Image name={defaultKey === "5" ? "hr_ic_pre" : "hr_ic"}/>
                    <FormattedMessage
                        id='schedule'
                        defaultMessage='Schedule'
                    />
                </Menu.Item>
                <Menu.Item key="7">
                    <Link to="/home/serviceItem"/>
                    <Image name={defaultKey === "7" ? "service_ic_pre" : "service_ic"}/>
                    <FormattedMessage
                        id='serviceItem'
                        defaultMessage='Service Item'
                    />
                </Menu.Item>
                <SubMenu
                    className={hostKey === "sub2" ? "selected-host-menu" : ""}
                    key="sub2"
                    title={<span>
                            <Image name={hostKey === "sub2" ? "hr_ic_pre" : "hr_ic"}/>
                        <FormattedMessage
                            id='materielAndUnit'
                            defaultMessage='Materiel And Unit'
                        /></span>}
                >
                    <Menu.Item key="8">
                        <Link to="/home/materiel">
                            <Image name={defaultKey === "8" ? "organize_ic_pre" : "organize_ic"}/>
                            <FormattedMessage
                                id='materiel'
                                defaultMessage='Materiel'
                            />
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="9">
                        <Link to="/home/mUnit">
                            <Image name={defaultKey === "9" ? "organize_ic_pre" : "organize_ic"}/>
                            <FormattedMessage
                                id='materielUnit'
                                defaultMessage='Materiel Unit'
                            />
                        </Link>
                    </Menu.Item>
                </SubMenu>
                <SubMenu
                    className={hostKey === "sub1" ? "selected-host-menu" : ""}
                    key="sub1"
                    title={<span>
                            <Image name={hostKey === "sub1" ? "hr_ic_pre" : "hr_ic"}/>
                        <FormattedMessage
                            id='hr'
                            defaultMessage='HR'
                        />
                    </span>}
                >
                    <Menu.Item key="1"><Link to="/home/employee">
                        <Image name={defaultKey === "1" ? "staff_ic_pre" : "staff_ic"}/>
                        <FormattedMessage
                            id='employee'
                            defaultMessage='Employee'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="2"><Link to="/home/organization">
                        <Image name={defaultKey === "2" ? "organize_ic_pre" : "organize_ic"}/>
                        <FormattedMessage
                            id='department'
                            defaultMessage='Department'
                        />
                    </Link></Menu.Item>
                    <Menu.Item key="6"><Link to="/home/position">
                        <Image name={defaultKey === "6" ? "position_ic_pre" : "position_ic"}/>
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