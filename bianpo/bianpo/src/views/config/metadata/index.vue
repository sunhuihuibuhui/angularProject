<template>
  <div class="app-container">
    <add-data :addDataVisible="addDataVisible" @close="closePopup" />
    <div style="display: flex; justify-content: space-between">
      <el-button
        size="mini"
        type="primary"
        style="margin-bottom: 10px"
        @click="add"
        >新增</el-button
      >
      <el-pagination
        size="mini"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listParams.pageNum"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listParams.total"
      >
      </el-pagination>
    </div>

    <el-table size="mini" :data="tableData" border>
      <el-table-column type="index" label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="name" label="数据集模版" align="center">
      </el-table-column>
      <el-table-column prop="topics" label="学科" align="center">
      </el-table-column>
      <el-table-column prop="createDate" label="上传时间" align="center">
      </el-table-column>
      <!--<el-table-column prop="userId" label="上传人" align="center">
      </el-table-column>-->
      <el-table-column label="状态" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="0"
            :inactive-value="1"
            @change="toggleStatus($event, scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column width="150" prop="url" label="Excel模版" align="center">
        <template slot-scope="scope">
          <a v-if="scope.row.url" @click="downloadExcel(scope.row.url)">{{
            scope.row.name + getFileName(scope.row.url)
          }}</a>
          <span v-else>暂无模板</span>
        </template>
      </el-table-column>
      <el-table-column prop="date" label="操作" align="center">
        <template slot-scope="scope">
          <config-upload
            action="/dataSet/datasetModel/edit"
            accept=".xlsx, .xls"
            :uploadData="{ id: scope.row.id }"
            @handleUploadSuccess="handleUploadSuccess"
          >
            <span>【上传Excel】</span>
          </config-upload>
          <span style="cursor: pointer" @click="delItem(scope.row.id)"
            >【删除】</span
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- <div>
      <el-button size="mini" type="primary">基本信息</el-button>
      <el-button size="mini" type="primary" style="margin: 10px"
        >方法</el-button
      >
      <el-button size="mini" type="primary">权力</el-button>
      <el-table size="mini" :data="tableData" :show-header="false" border>
        <el-table-column width="200px">
          <template slot-scope="scope">
            <span>{{ scope.row.date }}</span>
            <el-tooltip content="针对标题的一些解释" placement="right">
              <i class="el-icon-question"></i>
            </el-tooltip> </template
        ></el-table-column>
        <el-table-column prop="date"> </el-table-column>
      </el-table>
    </div> -->
  </div>
</template>
<script>
import { getList, del, toggleStatus, downloadExcel } from "@/api/metadata";
import configUpload from "../modules/upload";
import addData from "./modules/addData.vue";
import mixin from "@/mixins/mixin.js";
export default {
  components: { configUpload, addData },
  // mixins: [mixin],
  data() {
    return {
      tableData: [],
      addDataVisible: false,
      status: 0,
      listParams: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },

      queryApi: "/dataSet/datasetModel/list",
    };
  },
  created() {
    this.getList();
  },
  methods: {
    handleCurrentChange(val) {
      this.listParams.pageNum = val;
      this.getList();
    },
    handleSizeChange(val) {
      this.listParams.pageSize = val;
      this.getList();
    },
    getList() {
      getList(this.listParams).then((res) => {
        if (res.code == 200) {
          this.tableData = res.rows;
          this.listParams.total = res.total;
        }
      });
    },
    getFileName(str) {
      var fileName = str.lastIndexOf(".");
      return str.substring(fileName, str.length);
    },
    toggleStatus(evt, item) {
      var formData = new FormData();
      formData.append("id", item.id);
      formData.append("status", evt);
      toggleStatus(formData).then((res) => {
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.getList();
        } else {
          item.status = !item.status;
          this.$message.error(res.msg);
        }
      });
    },
    handleUploadSuccess(res) {
      if (res.code == 200) {
        this.$message.success(res.msg);
        this.getList();
      } else {
        this.$message.error("文件上传失败");
      }
    },

    delItem(id) {
      this.$confirm("此操作将永久删除该模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          del([id]).then((res) => {
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
    add() {
      this.addDataVisible = true;
    },
    closePopup(reolad) {
      console.log(reolad);
      if (reolad) {
        this.getList();
      }
      this.addDataVisible = false;
    },
    downloadExcel(fileName) {
      downloadExcel({ fileName }).then((res) => {
        const blob = new Blob([res], {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        });
        //
        if ("download" in document.createElement("a")) {
          const elink = document.createElement("a");
          const name = fileName.substring(fileName.lastIndexOf("/") + 1);
          elink.download = name;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);

          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        } else {
          navigator.msSaveBlob(blob, fileName);
        }
      });
    },
  },
};
</script>
