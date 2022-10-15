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
    <a-button type="primary" ghost size="small">
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
    
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const formItemLayout = {
  labelCol: { span: 6 },
};
let filterFrom: any = ref({});
const columns = [
  {
    title: "测试"
  },
];
const dataSource = [{}];

// 测试
</script>

<style scoped>
.filters {
  width: 100%;
}
</style>
