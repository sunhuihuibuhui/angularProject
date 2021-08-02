<template>
  <div class="app-container">
    <addRole :addRoleVisible="addRoleVisible" @close="addRoleVisible = false" />

    <el-button
      size="mini"
      type="primary"
      style="margin-bottom: 10px; margin-left: 50%; transform: translateX(-50%)"
      @click="addRole"
      >新增模板角色</el-button
    >
    <el-button size="mini" type="primary" @click="open">保存</el-button>
    <el-button size="mini" type="primary" @click="open">删除</el-button>
    <el-table
      size="mini"
      :data="tableData"
      border
      :span-method="objectSpanMethod"
    >
      <el-table-column label="功能" align="center">
        <template slot-scope="scope">
          <p>
            {{ manageTitle[scope.$index] }}
          </p>
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <p>
            {{ tableData[scope.$index][0] }}
          </p>
        </template>
      </el-table-column>
      <!-- <el-table-column  label="数据集公开程度" align="center">
        <template slot-scope="scope">
          <p>
            {{ tableData[scope.$index][0] }}
          </p>
        </template>
      </el-table-column> -->
      <el-table-column label="平台全局用户" align="center">
        <el-table-column
          v-for="(title, ind) in tableTitle"
          :key="ind"
          :label="title"
          align="center"
          v-if="ind == 0 || ind == 1"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="tableData[scope.$index][ind + 1]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeRolePerm"
            />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="数据集用户分组" align="center">
        <el-table-column
          v-for="(title, ind) in tableTitle"
          :key="ind"
          :label="title"
          align="center"
          v-if="ind == 2 || ind == 3"
        >
          <template slot-scope="scope">
            <el-switch
              v-model="tableData[scope.$index][ind + 1]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-value="1"
              inactive-value="0"
              @change="changeRolePerm"
            />
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList } from "@/api/config/dataSet";
import addRole from "./modules/addRole.vue";
export default {
  components: { addRole },
  data() {
    return {
      tableData: [],
      tableTitle: ["游客", "注册用户", "下载组", "协作组", "所有者"],
      manageTitle: [
        "已发布数据集",
        " ",
        " ",
        " ",
        " ",
        "未发布数据集",
        " ",
        " ",
        " ",
        " ",
        " ",
        " ",
        "新建数据集",
      ],
      addRoleVisible: false,
    };
  },
  mounted() {
    this.$nextTick(function () {
      this.setColSpan();
    });
  },
  created() {
    getList().then((res) => {
      this.tableData = res;
    });
  },
  methods: {
    addRole() {
      this.addRoleVisible = true;
    },
    setColSpan: function () {
      var x = document.getElementsByClassName("el-table__header")[0].rows[0]
        .cells;
      x[0].colSpan = 2;
      x[1].style.display = "none";
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 功能分区第一列合并
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 5,
            colspan: 1,
          };
        } else if (rowIndex === 5) {
          return {
            rowspan: 9,
            colspan: 1,
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0,
          };
        }
      }
    },
    changeRolePerm() {
      console.log("改变了权限");
    },
    open() {
      this.$alert("研发中敬请期待！", "提示", {
        confirmButtonText: "确定",
      });
      
    },
  },
};
</script>>
