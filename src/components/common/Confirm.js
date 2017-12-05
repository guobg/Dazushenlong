import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Dimmer, Segment, Button} from 'semantic-ui-react'
import zh_CN from '../../res/language/zh_CN';
import en_US from '../../res/language/en_US';
import {IntlProvider} from 'react-intl';

const chooseLocale = () => {
    switch (navigator.language.split('-')[0]) {
        case 'en':
            return en_US;
        case 'zh':
            return zh_CN;
        default:
            return en_US;
    }
};

let defaultConfirm = "default-confirm";
let idDispose = (id) => {
    return ( defaultConfirm + ((id || "M").charCodeAt(0)) + 888 );
};


const remove = (id) => {
    let defaultId = "#" + (idDispose(id) || defaultConfirm);
    let loadNode = document.querySelector(defaultId);

    loadNode && document.body.removeChild(loadNode);
};

const confirm = (id, confirmHandle) => {
    remove(id);
    if (confirmHandle) confirmHandle();
};

const cancel = (id, cancelHandle) => {
    remove(id);
    if (cancelHandle) cancelHandle();
};


let StaticDialog = {
    default: (param) => {
        let div = document.createElement('div');
        div.id = idDispose(param.id) || defaultConfirm;
        div.className = "modal-component";
        document.body.appendChild(div);
        ReactDOM.render((
            <IntlProvider
                locale={navigator.language}
                messages={chooseLocale()}
            >
                <Dimmer active>
                    <Segment className="dialog">
                        <div className="dialog-content">
                            {param.message || 'Are you sure'}
                        </div>
                        <div className="dialog-footer">
                            <Button compact primary onClick={() => cancel(param.id, param.cancelHandle)}>取消</Button>
                            <Button compact primary onClick={() => confirm(param.id, param.confirmHandle)}>确认</Button>
                        </div>
                    </Segment>
                </Dimmer>
            </IntlProvider>
        ), div);
    },
    show: (param) => {
        StaticDialog.default(param);
    }
    /*param: {
        id: string,
        message: string,
        confirmHandle: function,
        cancelHandle: function
    }*/
};

export default StaticDialog;