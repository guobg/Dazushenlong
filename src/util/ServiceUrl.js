let url;
const isProduction = true;

if (isProduction) {
    const gateWay = "http://47.100.100.211:";
    url = {
        login: gateWay + '8080/login',
        retrieveStaff: gateWay + '8080/rtrvStaffList',
        getMemberList: gateWay + '8080/getMemberList',
        createMember: gateWay + '8080/createMember'
    };
} else {
    const gateWay = "http://192.168.0.107:";
    url = {
        login: gateWay + 'login',
        retrieveStaff: gateWay + '8080/rtrvStaffList',
        getMemberList: gateWay + '8080/getMemberList',
        createMember: gateWay + '8080/createMember'
    };
}

export {url};