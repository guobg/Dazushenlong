import React, {Component} from 'react';
import {Button, Image, Message, Input} from 'semantic-ui-react';
import {injectIntl, FormattedMessage} from 'react-intl';
import {messages} from '../../res/language/defineMessages';
import {isEmpty} from '../../util/CommUtil';
import {setAccessCookie, setCookie} from '../../util/CookieUtil';
import $ from 'jquery';

let userName;
let passWord;

class Logon extends Component {
    state = {
        selfChecked: false
    };

    componentWillMount() {
        setAccessCookie('MjQzZjgzZWU4NTJlM2JkN2FhYWE1NWFjMDRjMjBlOWY');
        setCookie('client_secret', 'NjkyZGQxODc4MzhhOGZiZTFmM2ViNDhlZjZiNjgxMDU');
    }

    logonService() {
        let data = {
            action: 'login',
            user_name: '15612341234',
            user_pwd: '123456..',
            is_remember: 0
        };
        //debugger;
        /*$.post(
            'http://www.biuu.xyz/apiv1.json?service=account.web_login',
            data,
            function (res) {
                console.info(res)
            }, 'json');*/
        $.ajax({
            type: "POST",
            url: "http://www.biuu.xyz/apiv1.json?service=account.web_login",
            dataType: 'json',
            data: data,
            xhrFields: {
                withCredentials: true
            },
            //crossDomain: true,
            success: function (res) {
                console.info(res)
            },
            error: function () {
            }
        })

        /*let formData = new FormData();
        formData.append('action', 'login');
        formData.append('user_name', '15612341234');
        formData.append('user_pwd', '123456..');
        formData.append('is_remember', 0);

        fetch("http://www.biuu.xyz/apiv1.json?service=account.web_login", {
            method: 'POST',
            credentials: "include",
            body: formData
        })
            .then((res) => {
                console.info(res)
            })
            .then(res => {
                console.info(res)
            })
            .catch(error => {
                console.info(error)
            });*/

        /*const {userLogon, history} = this.props;
        const user = {
            action: 'login',
            user_name: userName.inputRef.value,
            user_pwd: passWord.inputRef.value,
            is_remember: 0
        };
        this.setState({
            selfChecked: true
        });
        if (isEmpty(user.user_name) || isEmpty(user.user_pwd)) return;
        const callback = () => {
            history.push('/home')
        };
        userLogon(user, callback);*/
    }

    render() {
        const {userInfo} = this.props;
        const {formatMessage} = this.props.intl;

        return (

            <div className='login-form'>
                <Image className="logon-back-image" src={require('../../res/image/bg_img.png')}/>
                <div className="logon-content">
                    <div className="logon-header">
                        <FormattedMessage
                            id='mindvations'
                            defaultMessage='Mindvations'
                        />
                    </div>
                    <Input
                        fluid
                        icon={
                            <Image src={require('../../res/image/account_ic.png')}/>
                        }
                        iconPosition='left'
                        placeholder={formatMessage(messages.userNameDescription)}
                        ref={node => userName = node}
                        error={this.state.selfChecked && isEmpty(userName.inputRef.value)}
                        className="logon-input logon-user-name"
                        onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                this.logonService();
                            }
                        }}
                    />
                    <Input
                        fluid
                        icon={
                            <Image src={require('../../res/image/password_ic.png')}/>
                        }
                        iconPosition='left'
                        placeholder={formatMessage(messages.passWordDescription)}
                        type='password'
                        ref={node => passWord = node}
                        error={this.state.selfChecked && isEmpty(passWord.inputRef.value)}
                        className="logon-input logon-password"
                        onKeyUp={(e) => {
                            if (e.keyCode === 13) {
                                this.logonService();
                            }
                        }}
                    />

                    {userInfo.responseCode && userInfo.responseCode !== "000" ?
                        <Message style={{textAlign: 'left'}} error>
                            <p>{userInfo.message}</p>
                        </Message> : null}

                    <Button size='large' className="logon-button"
                            onClick={() => this.logonService()}>
                        <FormattedMessage
                            id='logIn'
                            defaultMessage='Log in'
                        />
                    </Button>
                </div>
            </div>
        );
    }
}

export default injectIntl(Logon);