<template>
  <div class="filters">
    <a-form :model="filterFrom" v-bind="formItemLayout">
      <a-row>
        <a-col :span="6">
          <a-form-item label="用户昵称">
            <a-input
              v-model="filterFrom.nickName"
              placeholder="请输入用户昵称"
            ></a-input>
          </a-form-item>
        </a-col>
        <a-col :span="6">
          <a-form-item label="状态">
            <a-select
              v-model="filterFrom.status"
              placeholder="请选择状态"
              allowClear
            >
              <a-select-option value="1">正常</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
  <div class="actions" mb-10px flex="~ gap-14px" items-center>
    <a-button type="primary" ghost size="small" @click="onClickAdd">
      <template #icon>
        <i i-ant-design-plus-outlined inline-block></i>
      </template>
      <span>添加</span>
    </a-button>
    <a-button ghost danger size="small">
      <template #icon>
        <i i-ant-design-delete-outlined inline-block></i>
      </template>
      <span>删除</span>
    </a-button>
  </div>
  <div class="table">
    <a-table
      :dataSource="dataSource"
      :columns="columns"
      size="middle"
      :pagination="pagination"
      @change="onPageSizeChange"
    >
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'actions'">
          <div class="actions">
            <a-button type="link" size="small">编辑</a-button>
            <a-button type="link" size="small">删除</a-button>
          </div>
        </template>
        <template v-if="column.key === 'date'">
          <span v-dateFormat="record[column.dataIndex]"></span>
        </template>
      </template>
    </a-table>
  </div>
  <div class="modal">
    <a-modal v-model:visible="modal.show" :title="modal.title">
      <a-form :model="modalData" v-bind="formItemLayout">
        <a-row>
          <a-col :span="12">
            <a-form-item label="用户昵称">
              <a-input
                v-model="modalData.nickName"
                placeholder="请输入用户昵称"
              ></a-input>
            </a-form-item>
          </a-col>
          <!-- <a-col :span="12">
            <a-form-item label="状态">
              <a-select
                v-model="filterFrom.status"
                placeholder="请选择状态"
                allowClear
              >
                <a-select-option value="1">正常</a-select-option>
              </a-select>
            </a-form-item>
          </a-col> -->
        </a-row>
      </a-form>
      <template #footer>
        <a-button @click="handleCancel">取消</a-button>
        <a-button type="primary" @click="handleOk">Submit</a-button>
      </template>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import { columns, formItemLayout } from "./config";
import { userList, userMange } from "@/api/system/user";
let filterFrom: any = ref({});
let modalData = reactive({});
let dataSource = ref([]);
const modal = reactive({
  show: false,
  title: "",
});
const pagination = reactive({
  current: 1,
  pageSize: 10,
  showQuickJumper: true,
  showSizeChanger: true,
  total: 0,
  showTotal: (total: number) => `共 ${total} 条`,
});
onMounted(() => {
  getUserList();
});

const getUserList = async () => {
  const { current, pageSize } = pagination;
  const params = { current, per_page: pageSize };
  const { data: res, code } = await userList(params);
  if (code === 200) {
    dataSource.value = res.data;
    pagination.total = res.total;
  }
};
// 点击添加
const onClickAdd = () => {
  modal.show = true;
  modal.title = "添加用户";
};

// 更改页码
const onPageSizeChange = (pageInfo: any) => {
  const { current, pageSize } = pageInfo;
  pagination.current = current;
  pagination.pageSize = pageSize;
  getUserList();
};
const handleOk = async () => {
  reset()
  const params = Object.assign({}, modalData)
  const { code } = await userMange(params)
  if(code === 200) {
    modal.show = false;
  }
}
const reset = () => {
  modalData = reactive({})
}
</script>

<style lang="less" scoped>
.filters {
  width: 100%;
}
.table {
  width: 100%;
  .actions {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
