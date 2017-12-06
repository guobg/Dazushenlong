import React, {Component} from 'react';
import {Checkbox} from 'semantic-ui-react';
import {FormattedMessage} from 'react-intl';
import PropTypes from 'prop-types';

class OrganizationTree extends Component {
    state = {
        selectedKey: this.props.defaultValue
    };

    getValue = () => {
        return this.state.selectedKey;
    };

    getComponent = (data) => {
        const {selectedKey} = this.state;
        if (data.items && data.items.length > 0) {
            return <ul style={{display: data.expand ? 'block' : 'none'}}>
                {data.items.map((item) => {
                    return <li key={item.id}>
                        <div
                            onClick={() => {
                                this.selectItem(item)
                            }}
                            className={"org-item display-flex"}>
                            {item.items && item.items.length > 0 ?
                                <div className={(item.expand ? "org-expanded " : "") + "org-expand-icon"}
                                     onClick={(event) => {
                                         this.toggleExpand(event, item)
                                     }}>
                                    >
                                </div> : null}
                            <Checkbox className="org-check-box" label={item.name} checked={selectedKey === item.id}/>
                        </div>
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
        this.setState({
            selectedKey: item.id === this.state.selectedKey ? '' : item.id
        })
    };

    render() {
        const {organization, required, label} = this.props;
        const {selectedKey} = this.state;
        return (
            <div className="components-item item-horizontal align-right baseline-flex">
                <div className="field-title">
                    <div className={required ? "input-label" : null}>
                        <FormattedMessage
                            id={label}
                        />
                    </div>
                </div>
                <div className="org-tree-select input-content">
                    <div className="org-tree">
                        <ul>
                            <li>
                                <div onClick={() => {
                                    this.selectItem(organization)
                                }}
                                     className={"org-item display-flex"}>
                                    {organization.items && organization.items.length > 0 ?
                                        <div
                                            className={(organization.expand ? "org-expanded " : "") + "org-expand-icon"}
                                            onClick={(event) => {
                                                this.toggleExpand(event, organization)
                                            }}>
                                            >
                                        </div> : null}
                                    <Checkbox className="org-check-box" label={organization.name}
                                              checked={selectedKey === organization.id}/>
                                </div>
                                {this.getComponent(organization)}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

OrganizationTree.PropTypes = {
    label: PropTypes.string,
    required: PropTypes.bool,
    organization: PropTypes.object
};

export default OrganizationTree;
