<template>
  <div class="app-container">
    <el-table size="mini" :data="tableData" border>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="teamName" label="名称" align="center">
      </el-table-column>
      <el-table-column prop="teamName" label="状态" align="center">
     <!-- <template slot-scope="scope">
      待审核等等
        </template>-->
      </el-table-column>
      <el-table-column prop="createBy" label="创建者" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <span @click="delItem(scope.row.id)">【移出】</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { getList, remove } from "@/api/space/excellent";
import request from "@/utils/request";
export default {
  data() {
    return {
      tableData: [],
      uploadUrl: "",
      uploadData: {
        id: 1,
      },
      queryParams: {
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {
    this.getList();
  },
  mounted() {},
  methods: {
    getList() {
      console.log(this.queryParams)
      getList(this.queryParams).then((res) => {
        if (res.code == 200) {
          this.tableData = res.rows;
        }
      });
    },

    delItem(id) {
      // 后续可在空间管理中再次添加, 
      this.$confirm("此操作将把该空间移出精选空间，是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          remove(id).then((res) => {
            if (res.code == 200) {
              this.$message.success(res.msg);
              this.getList();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
