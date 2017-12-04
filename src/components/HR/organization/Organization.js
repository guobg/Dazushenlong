import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';
import Image from '../../common/Image';
import {FormattedMessage} from 'react-intl';
import {getOrganization, removeOrganization} from '../../../actions/organization_action';
import OrganizationInfo from '../../../containers/orgInfo_container';

class DepartmentTree extends Component {
    state = {
        selectedKey: '0',
        addKey: '',
        selectOrg: null
    };

    componentDidMount() {
        this.props.dispatch(getOrganization());
    };

    getComponent = (data) => {
        const {selectedKey, addKey} = this.state;
        if (data.children && data.children.length > 0) {
            return <ul style={{display: data.expand ? 'block' : 'none'}}
                /*className={data.expand ? "expand-visible" : "expand-invisible"}*/>
                {data.children.map((item) => {
                    return <li key={item.key}>
                        <div
                            onClick={() => {
                                this.selectItem(item)
                            }}
                            className={(selectedKey === item.key ? "org-selected " : "") + "org-item display-flex"}>
                            {item.children && item.children.length > 0 ?
                                <div className={(item.expand ? "org-expanded " : "") + "org-expand-icon"}
                                     onClick={(event) => {
                                         this.toggleExpand(event, item)
                                     }}>
                                    >
                                </div> : null}
                            <div className="org-name"> {item.name}</div>
                            {
                                selectedKey === item.key ? <div
                                    className={(addKey === item.key ? "remove-org-icon " : "") + "add-org-icon"}
                                    onClick={(event) => {
                                        this.showAddOrg(event, item)
                                    }}>+</div> : null
                            }
                        </div>
                        {
                            selectedKey === item.key && addKey === item.key ?
                                <div className="add-org-box">
                                    <Input autoFocus={true} ref={node => this.showAddOrgInputNode = node}/>
                                    <Button className="confirm-button"
                                            onClick={() => {
                                                this.addOrg(item)
                                            }}>Add</Button>
                                </div> : null
                        }
                        {this.getComponent(item)}
                    </li>
                })}
            </ul>
        }
    };

    toggleExpand = (event, item) => {
        event.stopPropagation();
        item.expand = !item.expand;
        this.setState({})
    };

    selectItem = (item) => {
        if (item.key === this.state.selectedKey) return;
        this.setState({
            selectedKey: item.key,
            selectOrg: item,
            addKey: ''
        })
    };

    showAddOrg = (event, item) => {
        event.stopPropagation();
        if (this.state.addKey) {
            this.setState({
                addKey: ''
            })
        } else {
            this.setState({
                addKey: item.key
            })
        }
    };

    addOrg = (item) => {
        let orgName = this.showAddOrgInputNode.inputRef.value;
        if (!orgName || !orgName.trim()) return;
        orgName = orgName.trim();
        let nextNumber = 0;
        if (item.children && item.children.length > 0) {
            const lastKey = item.children[item.children.length - 1].key;
            nextNumber = Number(lastKey.substr(lastKey.lastIndexOf("-") + 1, lastKey.length)) + 1;
        }
        const orgKey = item.key + "-" + nextNumber;
        item.children ? item.children.push({
            key: orgKey,
            name: orgName
        }) : item.children = [{
            key: orgKey,
            name: orgName
        }];

        item.expand = true;

        this.setState({
            addKey: ''
        })
    };

    removeOrg = (org) => {
        const {organization} = this.props;
        this.props.dispatch(removeOrganization(organization, org, this.setAfterRemove))
    };

    setAfterRemove = (hostOrg) => {
        this.setState({
            selectOrg: hostOrg,
            selectedKey: hostOrg.key
        })
    };

    render() {
        const {organization} = this.props;
        const {selectedKey, addKey, selectOrg} = this.state;
        return (
            <div className="work-content">
                <div className="first-header">
                    <Image name='department'/>
                    <FormattedMessage
                        id='departmentTitle'
                        defaultMessage='Department'
                    />
                </div>
                <div className="model-main-container org-container">
                    <div className="org-tree">
                        <ul>
                            <li>
                                <div onClick={() => {
                                    this.selectItem(organization)
                                }}
                                     className={(selectedKey === organization.key ? "org-selected " : "") + "org-item display-flex"}>
                                    {organization.children && organization.children.length > 0 ?
                                        <div
                                            className={(organization.expand ? "org-expanded " : "") + "org-expand-icon"}
                                            onClick={(event) => {
                                                this.toggleExpand(event, organization)
                                            }}>
                                            >
                                        </div> : null}
                                    <div className="org-name"> {organization.name}</div>
                                    {
                                        selectedKey === organization.key ? <div
                                            className={(addKey === organization.key ? "remove-org-icon " : "") + "add-org-icon"}
                                            onClick={(event) => {
                                                this.showAddOrg(event, organization)
                                            }}>+</div> : null
                                    }
                                </div>
                                {
                                    selectedKey === organization.key && addKey === organization.key ?
                                        <div className="add-org-box">
                                            <Input autoFocus={true}
                                                   ref={node => this.showAddOrgInputNode = node}/>
                                            <Button className="confirm-button" onClick={() => {
                                                this.addOrg(organization)
                                            }}>Add</Button>
                                        </div> : null
                                }
                                {this.getComponent(organization)}
                            </li>
                        </ul>
                    </div>
                    <div className="org-info">
                        <OrganizationInfo org={selectOrg || organization} removeOrg={(org) => {
                            this.removeOrg(org)
                        }}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default DepartmentTree;