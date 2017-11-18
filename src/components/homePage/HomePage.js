import React, {Component} from 'react';
import Menu from './Menu';
import Employee from '../../containers/employee_container';
import Department from '../../containers/department_container';
import CommonHeader from '../../containers/header_container';
import Member from '../../containers/member_container';

import {Layout, BackTop} from 'antd';
import {
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import './HomePage.css';

const {Header, Content, Sider} = Layout;

const routes = [
    {
        path: '/home/Member',
        exact: true,
        main: Member
    },
    {
        path: '/home/Employee',
        main: Employee
    },
    {
        path: '/home/Department',
        main: Department
    }
];

class HomePage extends Component {
    state = {
        collapsed: false,
        minHeight: '0px'
    };

    onCollapse = (collapsed) => {
        this.setState({collapsed});
        let e = document.createEvent("Event");
        e.initEvent("resize", true, true);
        window.dispatchEvent(e);
    };

    componentWillMount() {
        this.setHeight();
        window.addEventListener('resize', this.setHeight, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.setHeight);
    }

    setHeight = () => {
        const h = document.documentElement.clientHeight;//可见区域高度
        const minHeight = (h - 64) + "px";
        this.setState({
            minHeight: minHeight
        });
    };

    render() {
        return (
            <Layout>
                <Header><CommonHeader/></Header>
                <Layout>
                    <Sider collapsible
                           collapsed={this.state.collapsed}
                           onCollapse={this.onCollapse}
                           className="sider-menu"
                    >
                        <Menu/>
                    </Sider>
                    <Content style={{minHeight: this.state.minHeight, overflowY: 'hidden'}}>
                        <BackTop/>
                        <Switch>
                            <Route exact path="/home" render={() => (
                                <Redirect to="/home/Member"/>
                            )}/>
                            {routes.map((route, index) => (
                                // Render more <Route>s with the same paths as
                                // above, but different components this time.
                                <Route
                                    key={index}
                                    path={route.path}
                                    exact={route.exact}
                                    component={route.main}
                                />
                            ))}
                        </Switch>
                    </Content>
                </Layout>
            </Layout>

        );
    }
}

export default HomePage;
