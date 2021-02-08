<template>
  <Card title="工时管理" operateText="新增" @onOperate="handleAdd">
    <template #content>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="hours" label="工时"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间"> </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
  </Card>

  <el-pagination
    class="pagination"
    background
    layout="prev, pager, next"
    :total="total"
    @current-change="handleChange"
  >
  </el-pagination>

  <el-dialog :title="dialogTitle" v-model="dialogVisible" width="40%">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="formRef"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="姓名" prop="username">
        <!-- <el-input v-model="ruleForm.username"></el-input> -->
        <el-select
          v-model="ruleForm.username"
          placeholder="请选择"
          @change="handleUserChange"
        >
          <el-option
            v-for="item in usersList"
            :key="item.key"
            :label="item.value"
            :value="item.key"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="工时" prop="hours">
        <el-input v-model="ruleForm.hours"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >确 定</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, unref, toRefs, reactive, onMounted, nextTick } from 'vue'
import { usersPageListHours, updateSelectiveHours, insertSelectiveHours, getUserList } from '../../api'
import Card from '../../components/Card/index.vue'
import { ElMessage } from 'element-plus'
export default {
  components: { Card },
  setup (props) {
    // 校验工时
    const checkHours = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('工时不能为空'))
      }
      if (isNaN(value)) {
        callback(new Error('请输入数字值'))
      } else {
        if (value > 10) {
          callback(new Error('工时不能大于10'))
        } else if (value < 0) {
          callback(new Error('工时不能小于0'))
        } else {
          callback()
        }
      }
    };
    const formRef = ref(null)
    let dialogVisible = ref(false)
    let dialogTitle = ref('新增')
    let total = ref(0)
    let model = reactive({
      params: {
        pageNo: 1,
        pageSize: 10
      },
      tableData: [],
      ruleForm: {
        id: null,
        userId: null,
        username: '',
        hours: '',
        createTime: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'change' }
        ],
        hours: [
          { required: true, validator: checkHours, trigger: 'change' }
        ]
      },
      usersList: []
    })

    onMounted(() => {
      getList()
      queryUserList()
    })

    // 新增
    const handleAdd = () => {
      Object.assign(model.ruleForm, {
        id: null,
        username: '',
        hours: '',
        createTime: ''
      })
      dialogVisible.value = true
      dialogTitle.value = '新增'
      nextTick(() => {
        const form = unref(formRef)
        form.clearValidate()
      })
    }

    // 编辑
    const handleEdit = (data) => {
      dialogVisible.value = true
      dialogTitle.value = '编辑'
      Object.assign(model.ruleForm, data)
      const { id, workId } = data
      model.ruleForm.userId = id
      model.ruleForm.id = workId
    }

    // 列表
    const getList = async () => {
      const { data } = await usersPageListHours(model.params)
      model.tableData = [...data.list]
      total.value = data.total
    }

    // 用户下拉列表
    const queryUserList = async () => {
      const { data } = await getUserList()
      model.usersList = [...data]
    }

    // 分页
    const handleChange = (pageNo) => {
      model.params.pageNo = pageNo
      getList()
    }

    // 用户选择
    const handleUserChange = (key) => {
      model.ruleForm.userId = key
    }

    // 删除
    const handleDelete = (key) => { }

    // 新增，编辑-提交
    const submitForm = () => {
      const form = unref(formRef)
      form.validate((valid) => {
        if (valid) {
          const { id } = model.ruleForm
          const requestApi = id ? updateSelectiveHours : insertSelectiveHours
          requestApi(model.ruleForm).then(res => {
            ElMessage.success({
              message: '操作成功',
              center: true
            })
            dialogVisible.value = false
            getList()
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }

    return {
      ...toRefs(model),
      dialogVisible,
      dialogTitle,
      handleEdit,
      handleAdd,
      total,
      handleChange,
      submitForm,
      formRef,
      handleUserChange,
      handleDelete
    }
  }
}
</script>

<style>
</style>