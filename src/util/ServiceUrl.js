let url;
const isProduction = true;

if (isProduction) {
    const gateWay = "http://47.100.100.211:";
    url = {
        login: 'http://www.biuu.xyz/apiv1.json?service=account.web_login',
        retrieveStaff: gateWay + '8080/rtrvStaffList',
        createStaff: gateWay + '8080/createStaff',
        deleteStaff: gateWay + '8080/deleteStaff',
        updateStaffDetail: gateWay + '8080/updateStaffDetail',
        getMemberList: gateWay + '8080/getMemberList',
        createMember: gateWay + '8080/createMember',
        updateMember: gateWay + '8080/updateMember',
        getMemberCardList: gateWay + '8080/getMemberCardList',
        createMemberCard: gateWay + '8080/createMemberCard',
        updateMemberCard: gateWay + '8080/updateMemberCard',
        deleteMemberCard: gateWay + '8080/deleteMemberCard',
        getScheduleList: gateWay + '8080/getScheduleList',
        createSchedule: gateWay + '8080/createSchedule',
        updateSchedule: gateWay + '8080/updateSchedule',
        getDepartmentList: gateWay + '8080/getDepartmentList',
        createDepartment: gateWay + '8080/createDepartment',
        updateDepartment: gateWay + '8080/updateDepartment',
        deleteDepartment: gateWay + '8080/deleteDepartment',
        getOrganization: 'http://www.biuu.xyz/apiv2.json?service=department.get_dept_list',
        getPositionList: gateWay + '8080/getPositionList',
        createPosition: gateWay + '8080/createPosition',
        updatePosition: gateWay + '8080/updatePosition',
        deletePosition: gateWay + '8080/deletePosition'
    };
} else {
    const gateWay = "http://192.168.0.107:";
    url = {
        login: gateWay + '8080/login',
        retrieveStaff: gateWay + '8080/rtrvStaffList',
        createStaff: gateWay + '8080/createStaff',
        deleteStaff: gateWay + '8080/deleteStaff',
        updateStaffDetail: gateWay + '8080/updateStaffDetail',
        getMemberList: gateWay + '8080/getMemberList',
        createMember: gateWay + '8080/createMember',
        updateMember: gateWay + '8080/updateMember',
        getMemberCardList: gateWay + '8080/getMemberCardList',
        createMemberCard: gateWay + '8080/createMemberCard',
        updateMemberCard: gateWay + '8080/updateMemberCard',
        deleteMemberCard: gateWay + '8080/deleteMemberCard',
        getScheduleList: gateWay + '8080/getScheduleList',
        createSchedule: gateWay + '8080/createSchedule',
        updateSchedule: gateWay + '8080/updateSchedule',
        getDepartmentList: gateWay + '8080/getDepartmentList',
        createDepartment: gateWay + '8080/createDepartment',
        updateDepartment: gateWay + '8080/updateDepartment',
        deleteDepartment: gateWay + '8080/deleteDepartment',
        getOrganization: gateWay + '8080/getOrganization',
        getPositionList: gateWay + '8080/getPositionList',
        createPosition: gateWay + '8080/createPosition',
        updatePosition: gateWay + '8080/updatePosition',
        deletePosition: gateWay + '8080/deletePosition'
    };
}

export {url};