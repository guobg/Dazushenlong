import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {isEmpty, getDesc} from '../../util/CommUtil';
import {FormattedMessage} from 'react-intl';

class Display extends Component {

    displayValue = (value, options) => {
        if (isEmpty(value)) {
            return "";
        } else {
            if (options) {
                return getDesc(options, value);
            }
        }
        return value;
    };

    render() {
        const {label, value, options} = this.props;
        return (
            <div className="components-item item-horizontal align-right">
                {
                    label ? <div className="field-title">
                        <FormattedMessage
                            id={label}
                        />
                    </div> : null
                }
                <div className="input-content">
                    {this.displayValue(value, options)}
                </div>
            </div>
        );
    }
}

Display.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    options: PropTypes.array
};

export default Display;
