<template>
  <Card title="用户信息" operateText="新增" @onOperate="handleAdd">
    <template #content>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="sex" label="性别" width="180">
          <template #default="scope">
            {{ scope.row.sex === 'M' ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="idCard" label="身份证号"> </el-table-column>
        <el-table-column prop="wage" label="日薪"> </el-table-column>
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
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="身份证号" prop="idCard">
        <el-input v-model="ruleForm.idCard"></el-input>
      </el-form-item>
      <el-form-item label="日薪" prop="wage">
        <el-input v-model="ruleForm.wage"></el-input>
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
import { usersPageList, updateSelectiveList, insertSelectiveList } from '../../api'
import Card from '../../components/Card/index.vue'
import { ElMessage } from 'element-plus'
export default {
  components: { Card },
  setup (props) {
    const formRef = ref(null)
    let dialogVisible = ref(false)
    let dialogTitle = ref('')
    let total = ref(0)
    let model = reactive({
      params: {
        pageNo: 1,
        pageSize: 10
      },
      tableData: [],
      ruleForm: {
        id: null,
        username: '',
        idCard: '',
        wage: ''
      },
      rules: {
        username: [
          { required: true, message: '姓名不能为空', trigger: 'change' }
        ],
        idCard: [
          { required: true, message: '身份证号不能为空', trigger: 'change' }
        ],
        wage: [
          { required: true, message: '日薪不能为空', trigger: 'change' }
        ]
      }
    })

    onMounted(() => {
      getList()
    })

    // 新增
    const handleAdd = () => {
      Object.assign(model.ruleForm, {
        id: null,
        username: '',
        idCard: '',
        wage: ''
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
    }

    // 列表
    const getList = async () => {
      const { data } = await usersPageList(model.params)
      model.tableData = [...data.list]
      total.value = data.total
    }

    // 分页
    const handleChange = (pageNo) => {
      model.params.pageNo = pageNo
      getList()
    }

    // 删除
    const handleDelete = (key) => { }

    // 新增，编辑-提交
    const submitForm = () => {
      const form = unref(formRef)
      form.validate((valid) => {
        if (valid) {
          const { idCard } = model.ruleForm
          const requestApi = idCard ? updateSelectiveList : insertSelectiveList
          requestApi(model.ruleForm).then(res => {
            ElMessage.success({
              message: '操作成功',
              center: true
            })
            dialogVisible.value = false
            getList()
          })
        } else {
          console.log('error submit!!')
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
      handleDelete
    }
  }
}
</script>

<style>
</style>