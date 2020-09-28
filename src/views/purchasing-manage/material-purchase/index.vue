<template>
  <div class="list-container">
    <tableList :ConfigPage="ConfigPage"></tableList>
    <!--作废-->
    <el-dialog v-dialogDrag :close-on-click-modal="false" title="作废" :visible.sync="nullifyDialogVisible" width="35%"
      custom-class="nullify-dialog">
      <div style="text-align:center">确认将采购编号为PR2020080301的申购记录作废，请填写作废理由：</div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="活动形式" prop="desc">
          <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 5 }" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--员工信息-->
    <el-dialog v-dialogDrag :close-on-click-modal="false" title="员工信息" :visible.sync="personInfoDialog" width="35%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="工号">
          gh001
        </el-form-item>
        <el-form-item label="姓名">
          张三
        </el-form-item>
        <el-form-item label="部门">
          事业部1
        </el-form-item>
        <el-form-item label="角色">
          采购员
        </el-form-item>
        <el-form-item label="手机号">
          15023420120
        </el-form-item>
        <el-form-item label="邮箱">
          yingmei@youxiang.com
        </el-form-item>
      </el-form>
      <div style="text-align:center">
        <el-button type="primary" @click="submitForm('ruleForm')">关闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      ruleForm: {
        textarea: ''
      },
      rules: {
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },
      personInfoDialog: false,
      nullifyDialogVisible: false,
      ConfigPage: {
        operation: [
          {
            name: '查询',
            event: this.handleSearchBtn,
            type: 'primary',
            value: 'query'
          },
          { name: '重置', event: this.handleSearchBtn, value: 'rest' }
        ],
        searchList: [
          {
            label: '',
            type: 'select',
            selectOptions: [
              { label: '全部(保密等级)', value: 'a' },
              { label: '非保密', value: 'b' },
              { label: '保密', value: 'b' }
            ],
            value: '',
            name: 'realName',
            width: '150px',
            placeholder: '保密等级'
          },
          {
            label: '',
            type: 'select',
            selectOptions: [
              { label: '全部(申购状态)', value: 'a' },
              { label: '未提交', value: '1' },
              { label: '审核中', value: '2' },
              { label: '审核通过', value: '2' },
              { label: '审核拒绝', value: '3' },
              { label: '询价完成', value: '4' },
              { label: '询价关闭', value: '5' },
              { label: '作废', value: '6' }
            ],
            value: '',
            name: 'realName1',
            width: '150px',
            placeholder: '申购状态'
          },
          {
            label: '',
            type: 'cascader',
            value: [],
            name: 'realName2',
            placeholder: '物料类型',
            options: [
              {
                value: 'zhinan',
                label: '电子类',
                children: [
                  {
                    value: 'shejiyuanze',
                    label: '设备类'
                  },
                  {
                    value: 'shejiyuanze',
                    label: '仪器仪表类'
                  },
                  {
                    value: 'shejiyuanze',
                    label: '工装夹具类'
                  },
                  {
                    value: 'shejiyuanze',
                    label: '手板类'
                  },
                  {
                    value: 'shejiyuanze',
                    label: '生产辅料类'
                  },
                  {
                    value: 'shejiyuanze',
                    label: '日用品类'
                  },
                  {
                    value: 'shejiyuanze',
                    label: '办公用品类'
                  }
                ]
              },
              {
                value: 'zhinan2',
                label: '机械类',
                children: [
                  {
                    value: 'shejiyuanze2',
                    label: '塑胶原材料类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '注塑件类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '钣金类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '橡胶件类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '铸造件类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '机加工类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '紧固件类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '包装物料/物品类'
                  }
                ]
              },
              {
                value: 'zhinan2',
                label: '综合类',
                children: [
                  {
                    value: 'shejiyuanze2',
                    label: '设备类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '仪器仪表类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '工装夹具类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '手板类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '生产辅料类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '日用品类'
                  },
                  {
                    value: 'shejiyuanze2',
                    label: '办公用品类'
                  }
                ]
              }
            ]
          },
          {
            type: 'daterange',
            value: '',
            name: 'startTime-endTime',
            startPlaceholder: '报价截止开始',
            endPlaceholder: '报价截止结束'
          },
          {
            type: 'daterange',
            value: '',
            name: 'startTime-endTime2',
            startPlaceholder: '交货日期开始',
            endPlaceholder: '交货日期结束'
          },
          {
            type: 'input',
            value: '',
            name: 'master',
            width: '120px',
            icon: true,
            placeholder: '综合查询'
          }
        ],
        tableData: [
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-01',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [
              { text: '提交', value: 'submit' },
              { text: '编辑', value: 'edit' },
              { text: '删除', value: 'delete' },
              { text: '详情', value: 'details' },
              { text: '作废', value: 'nullify' },
              { text: '审核历史', value: 'history' }
            ]
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-02',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [{ text: '提交' }, { text: '编辑' }, { text: '删除' }]
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-02',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [
              { text: '提交' },
              { text: '编辑' },
              { text: '删除' },
              { text: '详情' },
              { text: '作废' },
              { text: '审核历史' }
            ]
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-02',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [
              { text: '提交' },
              { text: '编辑' },
              { text: '删除' },
              { text: '详情' },
              { text: '作废' },
              { text: '审核历史' }
            ]
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-02',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [
              { text: '提交' },
              { text: '编辑' },
              { text: '删除' },
              { text: '详情' },
              { text: '作废' },
              { text: '审核历史' }
            ]
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-02',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [
              { text: '提交' },
              { text: '编辑' },
              { text: '删除' },
              { text: '详情' },
              { text: '作废' },
              { text: '审核历史' }
            ]
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-02',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [
              { text: '提交' },
              { text: '编辑' },
              { text: '删除' },
              { text: '详情' },
              { text: '作废' },
              { text: '审核历史' }
            ]
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            purchaseNumber: 'PR2020080301',
            projectCode: '12345678',
            materialcode: '电子类-阻容件类',
            deliveryDate: '2016-05-02',
            subscriptionStatus: '审核拒绝',
            securityLevel: '非保密',
            offerEndDate: '2016-05-02',
            showButtons: [
              { text: '提交' },
              { text: '编辑' },
              { text: '删除' },
              { text: '详情' },
              { text: '作废' },
              { text: '审核历史' }
            ]
          }
        ],
        tableHead: [
          {
            prop: 'purchaseNumber',
            label: '采购编号',
            width: '200'
          },
          {
            prop: 'projectCode',
            label: '开发项目代码',
            minWidth: '200'
          },
          {
            prop: 'materialcode',
            label: '物料代码',
            minWidth: '200'
          },
          {
            prop: 'materialcode',
            label: '申购部门',
            minWidth: '200'
          },
          {
            prop: 'offerEndDate',
            label: '报价截止日期',
            minWidth: '200'
          },
          {
            prop: 'deliveryDate',
            label: '交货日期',
            minWidth: '200'
          },

          {
            prop: 'address',
            label: '交货地址',
            minWidth: '200'
          },
          {
            prop: 'securityLevel',
            label: '保密等级',
            minWidth: '200'
          },
          {
            prop: 'subscriptionStatus',
            label: '申购状态',
            minWidth: '200'
          },
          {
            prop1: 'name',
            prop: 'date',
            label: '申请人/日期',
            event: this.personInfo,
            minWidth: '200',
            sortable: true
          },
          { prop: 'address', label: '地址', minWidth: '200' },
          {
            // fixed: 'right',
            showButtons: [
              { text: '提交', value: 'submit' },
              { text: '编辑', value: 'edit' },
              { text: '删除', value: 'delete' },
              { text: '详情', value: 'details' },
              { text: '作废', value: 'nullify' },
              { text: '审核历史', value: 'history' }
            ],
            prop: 'operation2',
            label: '操作',
            event: this.handleOperation,
            minWidth: '150'
          }
        ],
        mainButton: [
          {
            text: '添加申购单',
            type: 'primary',
            value: 'add',
            event: this.handleMainButton
          }
        ],
        pagingConfig: {
          handleSizeChange: this.handleSizeChange,
          handleCurrentChange: this.handleCurrentChange,
          currentPage: 1,
          pageSizes: [100, 200, 300, 400],
          pageSize: 100,
          total: 400
        }
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  created () { },
  mounted () { },
  methods: {
    handleSizeChange (val) {
      console.log('handleSizeChange...:', val)
    },
    handleCurrentChange (val) {
      console.log('handleCurrentChange...:', val)
    },
    handleMainButton ({ value }) {
      if (value === 'add') {
        this.$message.success('添加')
      }
    },
    handleSearchBtn (searchData, { value }) {
      const getfun = {
        query: data => this.searchQuery(data),
        rest: data => this.searchRest(data),
        default: () => false
      }
      getfun[value] && getfun[value](searchData)
    },
    tableSubmit (data) {
      this.$confirm(
        '提交之后，申购单将进入审核流程，审核过程中，申购内容不可修改，是否继续?',
        '提交',
        {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: '确定成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    tableEdit (data) {
      console.log('data..:', data)
    },
    tableDelete (data) {
      console.log('Delete..:', data)
      this.$confirm(
        '此操作将删除采购编号为PR2020080301的申购记录，是否继续？',
        '删除',
        {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }
      )
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    tableDetails (data) {
      console.log('data..:', data)
    },
    tableNullify (data) {
      console.log('data..:', data)
      this.nullifyDialogVisible = true
    },
    tableHistory (data) {
      console.log('data..:', data)
    },
    handleOperation (datas, prop) {
      const getfun = {
        submit: data => this.tableSubmit(data),
        edit: data => this.tableEdit(data),
        delete: data => this.tableDelete(data),
        details: data => this.tableDetails(data),
        nullify: data => this.tableNullify(data),
        history: data => this.tableHistory(data)
      }
      const { value, row } = datas
      getfun[value] && getfun[value](datas)
    },
    searchQuery (searchData) { },
    searchRest (searchData) {
      for (const key in searchData) {
        searchData[key] = ''
      }
    },
    personInfo (row, prop, value) {
      this.personInfoDialog = true
      this.$message.success(value)
    },
    open () {
      this.$router.push({
        path: '/purchasing-manage/material-purchase/material-purchase-detail',
        query: {
          id: '15585'
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.main-card {
  margin-top: 10px;
}
.search-card /deep/ .el-card__body {
  padding-bottom: 0px;
}
/deep/ .el-table th {
  background: #f2f2f2;
}
.main-card /deep/ .el-card__body {
  padding: 10px;
}
.nullify-dialog {
}
.demo-ruleForm {
  margin: 10px 0;
}
</style>
