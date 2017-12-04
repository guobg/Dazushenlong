import {post} from './request';
import {
    convertStaffOptionToLocal,
    convertPositionToLocal
} from '../util/Convert';
import {url} from './ServiceUrl';

export function retrieveStaff(callback) {
    post(url.retrieveStaff, {})
        .then((res) => {
            callback(convertStaffOptionToLocal(res.responseBody));
        })
        .catch((error) => {
            console.info(error);
        });
}

export function getAllPosition(callback) {
    post(url.getPositionList, {})
        .then((res) => {
            const position = convertPositionToLocal(res.responseBody.positionList);
            callback(position);
        })
        .catch((error) => {
            console.info(error);
        });
}
