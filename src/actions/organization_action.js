/*
 * action 类型
 */
import {post} from '../util/request';
import {convertOrgToLocal} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const SET_ORGANIZATION = 'SET_ORGANIZATION';
let returnOrg = {};

/*
 * action 创建函数
 */

function setOrganization(organization) {
    return {type: SET_ORGANIZATION, organization}
}

export function getOrganization() {
    return dispatch => {
        //StaticLoad.show("getOrganization");
        post(url.getOrganization, {is_tree: 1})
            .then((res) => {
                //StaticLoad.remove("getOrganization");
                dispatch(setOrganization(res.data));
            })
            .catch((error) => {
                //StaticLoad.remove("getOrganization");
                StaticDialog.show("getOrganization-error", error.responseCode, error.message);
            });
    }
}

export function removeOrganization(org, removeOrg, callback) {
    return dispatch => {
        StaticLoad.show("createOrg");
        post(url.removeOrganization, {
            dept_id: removeOrg.id
        })
            .then((res) => {
                StaticLoad.remove("createOrg");
                if (res.data) {
                    removeOrgFunc(org, removeOrg);
                    dispatch(setOrganization(org));
                    callback(returnOrg);
                }
            })
            .catch((error) => {
                StaticLoad.remove("createOrg");
                StaticDialog.show("createOrg-error", error.responseCode, error.message);
            });
    }
}

function removeOrgFunc(hostOrg, org) {
    if (hostOrg.items && hostOrg.items.length > 0) {
        if (hostOrg.items.indexOf(org) === -1) {
            hostOrg.items.map((item) => {
                removeOrgFunc(item, org)
            })
        } else {
            hostOrg.items.splice(hostOrg.items.indexOf(org), 1);
            returnOrg = hostOrg;
        }
    }
}

export function createOrg(param, callback) {
    return dispatch => {
        StaticLoad.show("createOrg");
        post(url.createOrganization, param)
            .then((res) => {
                StaticLoad.remove("createOrg");
                callback(res.data);
            })
            .catch((error) => {
                StaticLoad.remove("createOrg");
                StaticDialog.show("createOrg-error", error.responseCode, error.message);
            });
    }
}