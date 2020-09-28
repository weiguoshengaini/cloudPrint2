<template>
  <div class="search-ground">
    <div class="search-content">
      <el-form :inline="true" :model="formData" class="demo-form-inline">
        <el-form-item v-for="(item, index) in searchList" :key="index" :label="item.label" :style="{width:item.width}">
          <el-input v-if="item.type === 'input'" v-model="formData[item.name]" clearable
            :placeholder="item.placeholder">
            <i v-if="item.icon" slot="prefix" :class="item.icon" class="el-input__icon el-icon-search"></i>
          </el-input>
          <el-select v-if="item.type === 'select'" v-model="formData[item.name]" :placeholder="item.placeholder">
            <el-option v-for="(item1, index1) in item.selectOptions" :key="index1" :label="item1.label"
              :value="item1.value"></el-option>
          </el-select>
          <el-cascader v-if="item.type === 'cascader'" v-model="formData[item.name]" :options="item.options"
            :placeholder="item.placeholder">
          </el-cascader>
          <el-date-picker v-if="item.type === 'daterange'" v-model="formData[item.name]" type="daterange"
            range-separator="-" :start-placeholder="item.startPlaceholder||'开始日期'"
            :end-placeholder="item.endPlaceholder||'结束日期'" />
          <el-date-picker v-if="item.type === 'date'" v-model="formData[item.name]" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item v-for="item in operation" :key="item.name">
          <el-button :type="item.type||'primary'" @click="item.event(formData,item)">{{item.name}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { formatDay } from '@utils'

export default {
  data () {
    return {
      formData: {}
    }
  },
  props: {
    searchList: {
      type: Array,
      default: function () {
        return []
      }
    },
    operation: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
