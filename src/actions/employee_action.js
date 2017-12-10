/*
 * action 类型
 */
import {post, get} from '../util/request';
import {
    convertEmployeeToServer,
    convertEmployeeToLocal,
    convertEmployeeListToLocal
} from '../util/Convert';
import StaticLoad from '../components/common/Loading';
import StaticDialog from '../components/common/Dialog';
import {url} from '../util/ServiceUrl';

export const GET_EMPLOYEE_LIST = 'GET_EMPLOYEE_LIST';
export const CREATE_EMPLOYEE = 'CREATE_EMPLOYEE';
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE';
export const DELETE_EMPLOYEE = 'DELETE_EMPLOYEE';

/*
 * action 创建函数
 */

function retrievedEmployeeList(employees) {
    return {type: GET_EMPLOYEE_LIST, employees}
}

export function getEmployeeList(page, pageSize) {
    return dispatch => {
        post(url.getEmployeeList, {
            page_index: page,
            page_size: pageSize,
            list_type: "full"
        })
            .then((res) => {
            const employeeList = convertEmployeeListToLocal(res.data);
                dispatch(retrievedEmployeeList({
                    employees: employeeList.rows,
                    totalElements: employeeList.total
                }));
            })
            .catch((error) => {
                console.info(error);
            });
    }
}

function createdEmployee(employee) {
    return {type: CREATE_EMPLOYEE, employee}
}

export function saveEmployee(employee, callback) {
    return dispatch => {
        StaticLoad.show("createEmployee");
        const params = convertEmployeeToServer(employee);
        post(url.saveEmployee, params)
            .then((res) => {
                StaticLoad.remove("createEmployee");
                const resEmployee = convertEmployeeToLocal(res.data);
                dispatch(createdEmployee(resEmployee));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("createEmployee");
                StaticDialog.show("createEmployee-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

export function rtrvStaffDetail(staffId, callback) {
    return dispatch => {
        StaticLoad.show("rtrvStaffDetail");
        get(url.rtrvStaffDetail, {
            staffId: staffId
        })
            .then((res) => {
                StaticLoad.remove("rtrvStaffDetail");
                const employee = convertEmployeeToLocal(res.responseBody);
                callback(employee);
            })
            .catch((error) => {
                StaticLoad.remove("rtrvStaffDetail");
                StaticDialog.show("rtrvStaffDetail-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function updatedEmployee(employee) {
    return {type: UPDATE_EMPLOYEE, employee}
}

export function updateEmployee(employee, callback) {
    return dispatch => {
        StaticLoad.show("updateEmployee");
        const params = convertEmployeeToServer(employee);
        post(url.saveEmployee, params)
            .then((res) => {
                StaticLoad.remove("updateEmployee");
                const resEmployee = convertEmployeeToLocal(res.data);
                dispatch(updatedEmployee(resEmployee));
                callback();
            })
            .catch((error) => {
                StaticLoad.remove("updateEmployee");
                StaticDialog.show("updateEmployee-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}

function deletedEmployee(employee) {
    return {type: DELETE_EMPLOYEE, employee}
}

export function deleteEmployee(employee) {
    return dispatch => {
        StaticLoad.show("deleteEmployee");
        get(url.deleteStaff, {
            staffId: employee.staffId
        })
            .then(() => {
                StaticLoad.remove("deleteEmployee");
                dispatch(deletedEmployee(employee));
            })
            .catch((error) => {
                StaticLoad.remove("deleteEmployee");
                StaticDialog.show("deleteEmployee-error", error.responseCode, error.message);
                console.info(error);
            });
    }
}