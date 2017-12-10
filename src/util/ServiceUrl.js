let url;
const isProduction = false;

if (isProduction) {
    const gateWay = "http://47.100.100.211:";
    url = {
        login: 'http://www.biuu.xyz/apiv1.json?service=account.web_login',
        getEmployeeList: 'http://www.biuu.xyz/apiv2.json?service=company_user.get_company_user_list',
        saveEmployee: 'http://www.biuu.xyz/apiv2.json?service=company_user.save_company_user',
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
        createOrganization: 'http://www.biuu.xyz/apiv2.json?service=department.create_dept',
        removeOrganization: 'http://www.biuu.xyz/apiv2.json?service=department.delete_dept_by_id',
        getPositionList: gateWay + '8080/getPositionList',
        createPosition: gateWay + '8080/createPosition',
        updatePosition: gateWay + '8080/updatePosition',
        deletePosition: gateWay + '8080/deletePosition',
        getServiceItemList: gateWay + '8080/getServiceItemList',
        createServiceItem: gateWay + '8080/createServiceItem',
        updateServiceItem: gateWay + '8080/updateServiceItem',
        getCommissionList: gateWay + '8080/getCommissionList'
    };
} else {
    const gateWay = "http://192.168.0.107:";
    url = {
        login: gateWay + '8080/login',
        getEmployeeList: gateWay + '8080/rtrvStaffList',
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
        deletePosition: gateWay + '8080/deletePosition',
        getServiceItemList: gateWay + '8080/getServiceItemList',
        createServiceItem: gateWay + '8080/createServiceItem',
        updateServiceItem: gateWay + '8080/updateServiceItem',
        getCommissionList: gateWay + '8080/getCommissionList'
    };
}

export {url};