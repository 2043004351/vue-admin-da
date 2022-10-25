export const columns = [
    {
        type: "selection",
        width: 80,
        align: "center",
    },
    {
        title: '用户编号',
        dataIndex: "id",
        width: 150,
        align: "center",
    },
    {
        title: '用户昵称',
        dataIndex: "username",
        minWidth: 150,
        align: "center",
    },
    {
        title: '手机号',
        dataIndex: "phoneNumber",
        minWidth: 150,
        align: "center",
    },
    {
        title: '创建时间',
        dataIndex: "createAt",
        key: "date",
        minWidth: 150,
        align: "center",
    },
    {
        title: '操作',
        key: "actions",
        minWidth: 150,
        align: "center",
    }
]

export const formItemLayout = {
    labelCol: { span: 6 },
  };