import {post} from './request';
import {
    convertStaffOptionToLocal,
    convertDepartmentToLocal
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

export function getAllDepartment(callback) {
    post(url.getDepartmentList, {}
    )
        .then((res) => {
            const department = convertDepartmentToLocal(res.responseBody.departmentList);
            callback(department);
        })
        .catch((error) => {
            console.info(error);
        });
}
