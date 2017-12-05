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
                console.info(error);
            });
    }
}

export function removeOrganization(org, removeOrg, callback) {
    return dispatch => {
        removeOrgFunc(org, removeOrg);
        dispatch(setOrganization(org));
        callback(returnOrg);
    }
}

function removeOrgFunc(hostOrg, org) {
    if (hostOrg.children && hostOrg.children.length > 0) {
        if (hostOrg.children.indexOf(org) === -1) {
            hostOrg.children.map((item) => {
                removeOrgFunc(item, org)
            })
        } else {
            hostOrg.children.splice(hostOrg.children.indexOf(org), 1);
            returnOrg = hostOrg;
        }
    }
}