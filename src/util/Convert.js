import {isEmpty, dateFormat, getTimeAndRandom} from './CommUtil';
import {getStaffId} from './UserStore';

export const convertStaffOptionToLocal = (res) => {
    let staffOption = [];

    if (res.staffs && res.staffs.length > 0) {
        res.staffs.map((staff) => {
            staffOption.push({
                text: staff.name,
                value: staff.staffId,
                image: {avatar: true, src: staff.avatar}
            })
        })
    }

    return staffOption;
};

export function convertEmployeeToServer(params) {
    if (params.birthday) {
        params.birthday = Math.round(new Date(params.birthday).getTime() / 1000).toString()
    }

    if (params.hire_date) {
        params.hire_date = Math.round(new Date(params.hire_date).getTime() / 1000).toString()
    }

    return params;
}

export function convertEditEmployeeToServer(employee) {
    let params = {
        staffInfo: {
            staffId: employee.staffId,
            account: employee.logonName,
            name: employee.name,
            deptId: employee.department,
            positionId: employee.position,
            gender: employee.gender,
            positionLvl: employee.positionLevel,
            emailAddr: employee.mail,
            phoneNum: employee.phone,
            status: employee.status
        },
        tagIds: []
    };

    if (employee.skillTags && employee.skillTags.length > 0) {
        employee.skillTags.map((tag) => {
            params.tagIds.push(tag.tagId)
        })
    }

    return params;
}

export function convertEmployeeToLocal(res) {
    if (!isEmpty(res.birthday)) {
        res.birthday = dateFormat(new Date(Number(res.birthday) * 1000), "yyyy-MM-dd");
    }

    if (!isEmpty(res.hire_date)) {
        res.hire_date = dateFormat(new Date(Number(res.hire_date) * 1000), "yyyy-MM-dd");
    }

    return res;
}

export function convertEmployeeListToLocal(res) {
    if (res.rows && res.rows.length > 0) {
        res.rows.map((item) => {
            convertEmployeeToLocal(item)
        })
    }

    return res;
}

export function convertOrgToLocal(res) {
    let org = {
        name: res.name,
        expand: true,
        key: '0'
    };
    getSubOrg(org, res.children);
    return org;
}

function getSubOrg(org, subOrg) {
    if (subOrg && subOrg.length > 0) {
        org.children = [];
        subOrg.map((item, i) => {
            let subOrgItem = {
                key: org.key + "-" + i,
                name: item.name,
                expand: false
            };
            getSubOrg(subOrgItem, item.children);
            org.children.push(subOrgItem);
        })
    }
}

export function convertPositionToLocal(res) {
    let position = [];
    if (res && res.length > 0) {
        res.map((item) => {
            let tempPosition = {
                value: item.id,
                text: item.name,
                levels: []
            };

            if (item.levels && item.levels.length > 0) {
                item.levels.map((position) => {
                    tempPosition.levels.push({
                        value: position.id,
                        text: position.name
                    })
                })
            }
            position.push(tempPosition)
        })
    }

    return position;
}