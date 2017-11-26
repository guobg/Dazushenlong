import React, {Component} from 'react';
import Menu from './Menu';
import {Image} from 'semantic-ui-react';
import Employee from '../../containers/employee_container';
import Department from '../../containers/department_container';
import CommonHeader from '../../containers/header_container';
import Member from '../../containers/member_container';
import MemberCard from '../../containers/memberCard_container';
import Schedule from '../../containers/schedule_container';
import {getUser} from '../../util/UserStore';
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
        path: '/home/member',
        exact: true,
        main: Member
    },
    {
        path: '/home/memberCard',
        main: MemberCard
    },
    {
        path: '/home/schedule',
        main: Schedule
    },
    {
        path: '/home/employee',
        main: Employee
    },
    {
        path: '/home/department',
        main: Department
    }
];

class HomePage extends Component {
    state = {
        minHeight: '0px'
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
                <Layout>
                    <Sider
                        className="sider-menu"
                    >
                        <Image className="menu-user-avatar" src={getUser().avatar} avatar/>
                        <Menu/>
                    </Sider>
                    <Header><CommonHeader/></Header>
                    <Content style={{minHeight: this.state.minHeight, overflowY: 'hidden'}}>
                        <BackTop/>
                        <Switch>
                            <Route exact path="/home" render={() => (
                                <Redirect to="/home/member"/>
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
