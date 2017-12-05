import React, {Component} from 'react';
import {Input, Button} from 'semantic-ui-react';
import Image from '../../common/Image';
import {FormattedMessage} from 'react-intl';
import {getOrganization, removeOrganization, createOrg} from '../../../actions/organization_action';
import OrganizationInfo from '../../../containers/orgInfo_container';

class DepartmentTree extends Component {
    state = {
        selectedKey: 0,
        addKey: '',
        selectOrg: null
    };

    componentDidMount() {
        this.props.dispatch(getOrganization());
    };

    getComponent = (data) => {
        const {selectedKey, addKey} = this.state;
        if (data.items && data.items.length > 0) {
            return <ul style={{display: data.expand ? 'block' : 'none'}}
                /*className={data.expand ? "expand-visible" : "expand-invisible"}*/>
                {data.items.map((item) => {
                    return <li key={item.id}>
                        <div
                            onClick={() => {
                                this.selectItem(item)
                            }}
                            className={(selectedKey === item.id ? "org-selected " : "") + "org-item display-flex"}>
                            {item.items && item.items.length > 0 ?
                                <div className={(item.expand ? "org-expanded " : "") + "org-expand-icon"}
                                     onClick={(event) => {
                                         this.toggleExpand(event, item)
                                     }}>
                                    >
                                </div> : null}
                            <div className="org-name"> {item.name}</div>
                            {
                                selectedKey === item.id ? <div
                                    className={(addKey === item.id ? "remove-org-icon " : "") + "add-org-icon"}
                                    onClick={(event) => {
                                        this.showAddOrg(event, item)
                                    }}>+</div> : null
                            }
                        </div>
                        {
                            selectedKey === item.id && addKey === item.id ?
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
        if (item.id === this.state.selectedKey) return;
        this.setState({
            selectedKey: item.id,
            selectOrg: item,
            addKey: ''
        })
    };

    showAddOrg = (event, item) => {
        event.stopPropagation();
        if (this.state.addKey !== '') {
            this.setState({
                addKey: ''
            })
        } else {
            this.setState({
                addKey: item.id
            })
        }
    };

    addOrg = (item) => {
        let orgName = this.showAddOrgInputNode.inputRef.value;
        if (!orgName || !orgName.trim()) return;
        orgName = orgName.trim();
        /*let nextNumber = 0;
        if (item.children && item.children.length > 0) {
            const lastKey = item.children[item.children.length - 1].key;
            nextNumber = Number(lastKey.substr(lastKey.lastIndexOf("-") + 1, lastKey.length)) + 1;
        }
        const orgKey = item.id + "-" + nextNumber;*/
        this.props.dispatch(createOrg({
            name: orgName,
            parent_id: item.id
        }, (org) => this.addedOrg(item, org)));


        /*item.children ? item.children.push({
            key: orgKey,
            name: orgName
        }) : item.children = [{
            key: orgKey,
            name: orgName
        }];

        item.expand = true;

        this.setState({
            addKey: ''
        })*/
    };

    addedOrg = (parentOrg, org) => {
        parentOrg.items ? parentOrg.items.push(org) : parentOrg.items = [org];
        parentOrg.expand = true;
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
            selectedKey: hostOrg.id
        })
    };

    render() {
        const {organization} = this.props;
        const {selectedKey, addKey, selectOrg} = this.state;
        organization.expand = true;
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
                                     className={(selectedKey === organization.id ? "org-selected " : "") + "org-item display-flex"}>
                                    {organization.items && organization.items.length > 0 ?
                                        <div
                                            className={(organization.expand ? "org-expanded " : "") + "org-expand-icon"}
                                            onClick={(event) => {
                                                this.toggleExpand(event, organization)
                                            }}>
                                            >
                                        </div> : null}
                                    <div className="org-name"> {organization.name}</div>
                                    {
                                        selectedKey === organization.id ? <div
                                            className={(addKey === organization.id ? "remove-org-icon " : "") + "add-org-icon"}
                                            onClick={(event) => {
                                                this.showAddOrg(event, organization)
                                            }}>+</div> : null
                                    }
                                </div>
                                {
                                    selectedKey === organization.id && addKey === organization.id ?
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
