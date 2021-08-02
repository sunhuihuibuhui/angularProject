<template>
  <div class="app-container">
    <addRole :addRoleVisible="addRoleVisible" @close="addRoleVisible = false" />
    <el-button
      size="mini"
      type="primary"
      style="margin-bottom:10px;margin-left: 50%;transform: translateX(-50%);"
      @click="addRole"
      >新增模板角色</el-button
    >
     <el-button size="mini" type="primary" @click="open">保存</el-button>
    <el-button size="mini" type="primary" @click="open">删除</el-button>

    <el-table size='mini' :data="tableData" border :span-method="objectSpanMethod">
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
      <el-table-column label="角色默认权限" align="center">
        <el-table-column label="组织空间" align="center">
          <el-table-column
            v-for="(title, ind) in tableTitle"
            :key="ind"
            :label="title"
            align="center"
            v-if="ind != 4"
          >
            <template slot-scope="scope">
              <el-switch
                :disabled="ind == 0"
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
        <!-- 所有者不允许修改，创建者和所有者都不让改 -->
        <el-table-column label="个人空间" align="center">
          <el-table-column :label="tableTitle[4]" align="center">
            <template slot-scope="scope">
              <el-switch
                disabled
                v-model="tableData[scope.$index][5]"
                active-color="#13ce66"
                inactive-color="#ff4949"
                active-value="1"
                inactive-value="0"
              />
            </template>
          </el-table-column>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList, editSpacePerm,getSpacePerm } from "@/api/config/space";
import addRole from "./modules/addRole.vue";
export default {
  components: { addRole },
  data() {
    return {
      tableData: [],
      tableTitle: ["创建者", "管理者", "编辑员", "只读成员", "所有者"],
      manageTitle: [
        "组织管理",
        " ",
        " ",
        "数据集管理",
        " ",
        " ",
        " ",
        " ",
        "文件管理",
        " ",
        " ",
        " ",
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
    getSpacePerm(1).then(res=>{
      console.log(res)
    })
  },
  methods: {
    addRole() {
      this.addRoleVisible = true;
    },
    changeRolePerm() {
      console.log(this.tableData);
      // aip需要联调1
      // editSpacePerm(this.tableData).then(res=>{
      //   console.log(res)
      // })
    },
    setColSpan: function () {
      var x =
        document.getElementsByClassName("el-table__header")[0].rows[0].cells;
      x[0].colSpan = 2;
      x[1].style.display = "none";
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // 功能分区第一列合并
      if (columnIndex === 0) {
        if (rowIndex === 0) {
          return {
            rowspan: 3,
            colspan: 1,
          };
        } else if (rowIndex === 3) {
          return {
            rowspan: 5,
            colspan: 1,
          };
        } else if (rowIndex === 8) {
          return {
            rowspan: 4,
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
    open() {
      this.$alert("研发中敬请期待！", "提示", {
        confirmButtonText: "确定",
      });
    },
  },
};
</script>>
