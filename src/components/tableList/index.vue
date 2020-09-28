<template>
  <div>
    <!-- 列表页 -->
    <el-card class="search-card">
      <search :searchList="ConfigPage.searchList" :operation="ConfigPage.operation"></search>
    </el-card>
    <el-card class="main-card">
      <el-button :type="item.type" @click="item.event(item)" v-for="item in ConfigPage.mainButton" :key="item.text">
        {{item.text}}</el-button>
      <div id="table-box" :style="{height:tableHeight,width: tableWidth}" style="margin-top:10px">
        <el-table :data="ConfigPage.tableData" height="100%">
          <el-table-column v-for="(item, i) in ConfigPage.tableHead" :key="i" :prop="item.prop" :label="item.label"
            :width="item.width" :min-width="item.minWidth" :sortable="item.sortable" :formatter="item.formatter"
            :fixed='item.fixed'>
            <template slot-scope="scope">
              <!--
              固定写法:
              用于一个格子两个数据
            -->
              <div v-if="item.prop1">
                <el-button type="text" @click="item.event(scope.row, item, scope.row[item.prop1])">
                  {{ scope.row[item.prop1] }}
                </el-button>
                /
                <span>{{ scope.row[item.prop] }}</span>
              </div>
              <!--
              第一种普通操作按钮
            -->
              <div v-else-if="item.prop==='operation1'">
                <el-button v-for="im in item.buttons" type="text" @click="item.event(scope.row, item, im.text)"
                  :key="im.text">
                  {{im.text}}
                </el-button>
              </div>
              <!--
                固定写法:
                动态表格操作，按钮从数据来。
              -->
              <div v-else-if="item.prop==='operation2'">
                <el-button v-for="im in scope.row.showButtons.filter((a,i)=>i<2)" type="text"
                  @click="item.event({ ...im, ...{ row: scope.row }}, item, im)" :key="im.text">
                  {{im.text}}
                </el-button>
                <el-dropdown v-if="scope.row.showButtons.length>2" @command="item.event" style="margin-left:10px">
                  <span class="el-dropdown-link" style="color: #409EFF;">
                    更多<i class="el-icon-caret-bottom el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="{ ...im, ...{ row: scope.row }}" class="clearfix"
                      v-for="(im,i) in scope.row.showButtons.filter((a,i)=>i>=2)" :key=" i">
                      {{im.text}}
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
              <!--
                什么都不包含
              -->
              <div v-else>
                {{ scope.row[item.prop] }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="text-align:right">
        <el-pagination @size-change="ConfigPage.pagingConfig.handleSizeChange"
          @current-change="ConfigPage.pagingConfig.handleCurrentChange"
          :current-page="ConfigPage.pagingConfig.currentPage" :page-sizes="ConfigPage.pagingConfig.pageSizes"
          :page-size="ConfigPage.pagingConfig.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {
    ConfigPage: {
      type: Object,
      default: () => {
        return {
          operation: [],
          searchList: [],
          tableData: [],
          tableHead: [],
          mainButton: [],
          pagingConfig: {
            handleSizeChange: () => false,
            handleCurrentChange: () => false,
            currentPage: 0,
            pageSizes: [30, 60, 90, 45],
            pageSize: 30,
            total: 0
          }
        }
      }
    }
  },
  data () {
    return {
      tableHeight: 0,
      tableWidth: '100%'
    }
  },
  computed: {},
  watch: {
    ConfigPage: {
      hanlder: function (datas) {
        console.log('datas..:', datas)
      },
      deep: true
    }
  },
  filters: {},
  created () { },
  mounted () {
    // 计算表格高度 宽度
    const appMainRect = document.getElementById('table-box').getBoundingClientRect()

    this.tableHeight = `calc(100vh - ${appMainRect.top + 60}px)`
    this.tableWidth = appMainRect.width + 'px'
    console.log('ConfigPage...:', this.ConfigPage)
  },
  methods: {

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
</style>
