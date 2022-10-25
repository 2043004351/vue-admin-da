import request from "@/utils/request";

// 获取用户列表
export const userList = async (params: any) => {
    return await request({
        url: `/admin/user/userList`,
        method: "get",
        params
    })
}

// 添加/修改用户

export const userMange = async (params: any) => {
    return await request({
        url: `/admin/user/userMange`,
        method: "post",
        params
    })
}
