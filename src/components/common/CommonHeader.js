import React, {Component} from 'react';
import {logOut} from '../../actions/user_action';
import {FormattedMessage} from 'react-intl';
import {getUser} from '../../util/UserStore';
import {Input} from 'semantic-ui-react';

class CommonHeader extends Component {

    userLogOut() {
        this.props.dispatch(logOut());
        this.props.history.push('/');
    }

    searchInfo = () => {
        const searchId = this.searchNode.inputRef.value.toUpperCase().trim();
        if (!searchId || ["P", "R", "S"].indexOf(searchId.substr(0, 1)) === -1) return;
        this.goToPage(searchId);
    };

    goToPage = (searchId) => {
        switch (searchId.substr(0, 1)) {
            case "P":
                this.props.history.push(`/home/projects/${searchId}`);
                break;
            case "R":
                this.props.history.push(`/home/requirement/${searchId}`);
                break;
            case "S":
                this.props.history.push(`/home/story/${searchId}`);
                break;
        }
    };

    render() {
        /*if (!this.props.userInfo.language) {
            let redirect = this.props.location.pathname + this.props.location.search;
            this.props.history.push('/login?language=login&redirect_uri=' + encodeURIComponent(redirect));
        }*/
        return (
            <div className="common-header">
                <div className="header-product">
                    <FormattedMessage
                        id='mindvations'
                        defaultMessage='Mindvations'
                    />
                </div>
                <div className="display-flex">
                    <div className="header-name">
                        {getUser().staffInfo.name}
                    </div>
                    <div className="log-out-button" onClick={() => this.userLogOut()}>
                        <FormattedMessage
                            id='logOut'
                            defaultMessage='Log out'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default CommonHeader;
