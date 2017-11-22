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

export function convertEmployeeToServer(employee) {
    let params = {
        creatorId: getStaffId(),
        name: employee.name,
        account: employee.logonName,
        password: employee.initialPassword,
        gender: employee.gender,
        deptId: employee.department,
        positionId: employee.position,
        positionLvl: employee.positionLevel,
        emailAddr: employee.mail,
        phoneNum: employee.phone,
        tagIds: [],
        status: employee.status
    };

    if (employee.skillTags && employee.skillTags.length > 0) {
        employee.skillTags.map((tag) => {
            params.tagIds.push(tag.tagId)
        })
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
    return {
        staffId: res.staffInfo.staffId,
        name: res.staffInfo.name,
        logonName: res.staffInfo.account,
        initialPassword: res.staffInfo.password,
        gender: res.staffInfo.gender,
        department: res.staffInfo.deptId,
        position: res.staffInfo.positionId,
        positionLevel: res.staffInfo.positionLvl,
        mail: res.staffInfo.emailAddr,
        phone: res.staffInfo.phoneNum,
        skillTags: res.tags,
        status: res.staffInfo.status
    }
}

export function convertDepartmentToLocal(res) {
    let department = [];
    if (res && res.length > 0) {
        res.map((item) => {
            let tempDepartment = {
                value: item.id,
                text: item.name,
                positions: []
            };

            if (item.positions && item.positions.length > 0) {
                item.positions.map((position) => {
                    tempDepartment.positions.push({
                        value: position.id,
                        text: position.name
                    })
                })
            }
            department.push(tempDepartment)
        })
    }

    return department;
}