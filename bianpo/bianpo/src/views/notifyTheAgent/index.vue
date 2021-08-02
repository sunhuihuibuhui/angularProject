<<<<<<< HEAD
<template>
  <div class="box-not">
    <div class="">
      <el-select v-model="value" placeholder="请选择" @change="changeClick()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="申请类型" width="120">
        <template slot-scope="scope">{{ setApplicantType(scope.row.applicantType) }}</template>
      </el-table-column>
      <el-table-column label="申请人" width="120">
        <template slot-scope="scope">{{
          applicantType(scope.row.userName)
        }}</template>
      </el-table-column>
      <el-table-column label="申请时间" width="120">
        <template slot-scope="scope">{{ scope.row.applicantTime }}</template>
      </el-table-column>
      <el-table-column label="审核人" width="120">
        <template slot-scope="scope">{{ scope.row.examineName }}</template>
      </el-table-column>
      <el-table-column label="审核时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.examineTime }}</template>
      </el-table-column>
      <el-table-column label="审核结果" show-overflow-tooltip>
        <template slot-scope="scope">{{ setExamineOpinion(scope.row.examineOpinion) }}</template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip v-if="value == '2'">
        <template slot-scope="scope" v-if="!scope.row.examineOpinion > 0">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row, 1, '通过了')"
            >允许</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row, 2, '拒绝了')"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="paging-box">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 50, 100, 300]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <no-dialog
      :dialogVisible="dialogVisible"
      @closepop="closepop"
      @determine="determine"
    ></no-dialog>
  </div>
</template>

<script>
import { noticeList, noticeEdit } from "@/api/notifyTheAgent/notifyTheAgent";
import { getUserProfile } from "@/api/system/user";
import noDialog from "./component/noDialog.vue";
import Cookies from "js-cookie";
export default {
  components: {
    noDialog,
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      multipleSelection: [],
      currentPage4: 1,
      total: 0,
      dialogVisible: false,
      examineResult: "",
      data: {
        id: "", //当前数据id
        applicantId: "", //申请人 id  applicantId
        applicantType: "", //通知待办类型（0 注册申请 1 团队申请 2 权限申请，3数据集发布申请，4其他）, applicantType
        bigType: "", //大类型 1待办 2通知 , bigType
        examineResult: "", //审核意见        ---非法用户(如果)     不传
        noticeDescribe: "", //通知待办内容,  账户申请(姓名-电话)已被xxx审核通过   登录人 姓名 通过了 noticeDescribe
        examineOpinion: "", //审核结果 0 待审核 1 已通过 2 已拒绝   0+1
        teamId: "", // 团队id
        datasetId: "", // 数据集父表id,
        datasetTitle: "", //数据集标题,
        executorId: "", //审核执行人id,  当前用户  userid
        belongsToAdmin: "", //是否为运维通知（1是，0否）
      },
      options: [
        {
          value: "1",
          label: "已审核",
        },
        {
          value: "2",
          label: "未审核",
        },
      ],
      value: "2",
      userName: "",
    };
  },
  created() {
    this.noticeLists();
    this.getUser();
  },
  methods: {
    setApplicantType(val){
      if(val === 0){
        return '注册申请'
      }else if(val === 1){
        return '团队申请'
      }else if(val === 2){
        return '权限申请'
      }else if(val === 3){
        return '数据集发布申请'
      }else if(val === 4){
        return '修改密码'
      }
    },
    setExamineOpinion(val){
       if(val === 0){
        return '待审核'
      }else if(val === 1){
        return '已通过'
      }else if(val === 2){
        return '已拒绝'
      }
    },
    getUser() {
      getUserProfile().then((response) => {
        if (response.code === 200) {
          this.userName = response.data.userName;
        }
      });
    },
    noticeLists() {
      const query = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        examineOpinion: this.value,
      };
      noticeList(query).then((res) => {
        if (res.code === 200) {
          this.tableData = res.rows;
          this.total = res.total;
        }
      });
    },
    applicantType(type) {
      if (type === 0) {
        return "注册申请";
      } else if (type === 1) {
        return "团队申请";
      } else if (type === 2) {
        return "权限申请";
      } else if (type === 3) {
        return "数据集发布申请";
      } else if (type === 4) {
        return "其他";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row, examineOpinion, type) {
      const data = {
        id: row.id, //当前数据id
        applicantId: row.applicantId, //申请人 id  applicantId
        applicantType: row.applicantType, //通知待办类型（0 注册申请 1 团队申请 2 权限申请，3数据集发布申请，4其他）, applicantType
        bigType: row.bigType, //大类型 1待办 2通知 , bigType
        examineResult: 0, //审核意见        ---非法用户(如果)     不传
        noticeDescribe: this.userName + type + row.noticeDescribe, //通知待办内容,  账户申请(姓名-电话)已被xxx审核通过   登录人 姓名 通过了 noticeDescribe
        examineOpinion: examineOpinion, //审核结果 0 待审核 1 已通过 2 已拒绝   0+1
        teamId: row.teamId, // 团队id
        datasetId: row.datasetId, // 数据集父表id,
        datasetTitle: row.datasetTitle, //数据集标题,
        executorId: Cookies.get("userId") || "", //审核执行人id,  当前用户  userid
        belongsToAdmin: row.belongsToAdmin, //是否为运维通知（1是，0否）
      };
      if (examineOpinion === 2) {
        this.dialogVisible = true;

        this.data = {
          ...data,
        };
      } else {
        this.data = {
          ...data,
        };
        noticeEdit(this.data).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$message(res.msg);
            this.noticeLists();
          }
        });
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.noticeLists();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.noticeLists();
    },
    closepop() {
      this.dialogVisible = false;
    },
    determine(val) {
      if (val) {
        this.examineResult = val;
        const cont = {
          examineResult: this.examineResult,
        };
        this.data = {
          ...this.data,
          ...cont,
        };
        noticeEdit(this.data).then((res) => {
          if (res.code === 200) {
            this.dialogVisible = false;
            this.$message(res.msg);
            this.noticeLists();
          }
        });
      } else {
        this.$message("请填写拒绝原因");
      }
    },
    changeClick() {
      this.noticeLists();
      console.log(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.box-not {
  padding: 20px;
}
=======
<template>
  <div class="box-not">
    <div class="">
      <el-select v-model="value" placeholder="请选择" @change="changeClick()">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column label="申请类型" width="120">
        <template slot-scope="scope">{{ setApplicantType(scope.row.applicantType) }}</template>
      </el-table-column>
      <el-table-column label="申请人" width="120">
        <template slot-scope="scope">{{
          applicantType(scope.row.userName)
        }}</template>
      </el-table-column>
      <el-table-column label="申请时间" width="120">
        <template slot-scope="scope">{{ scope.row.applicantTime }}</template>
      </el-table-column>
      <el-table-column label="审核人" width="120">
        <template slot-scope="scope">{{ scope.row.examineName }}</template>
      </el-table-column>
      <el-table-column label="审核时间" show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.examineTime }}</template>
      </el-table-column>
      <el-table-column label="审核结果" show-overflow-tooltip>
        <template slot-scope="scope">{{ setExamineOpinion(scope.row.examineOpinion) }}</template>
      </el-table-column>
      <el-table-column label="操作" show-overflow-tooltip v-if="value == '2'">
        <template slot-scope="scope" v-if="!scope.row.examineOpinion > 0">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row, 1, '通过了')"
            >允许</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleEdit(scope.$index, scope.row, 2, '拒绝了')"
            >拒绝</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="paging-box">
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[10, 50, 100, 300]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
    <no-dialog
      :dialogVisible="dialogVisible"
      @closepop="closepop"
      @determine="determine"
    ></no-dialog>
  </div>
</template>

<script>
import { noticeList, noticeEdit } from "@/api/notifyTheAgent/notifyTheAgent";
import { getUserProfile } from "@/api/system/user";
import noDialog from "./component/noDialog.vue";
import Cookies from "js-cookie";
export default {
  components: {
    noDialog,
  },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      tableData: [],
      multipleSelection: [],
      currentPage4: 1,
      total: 0,
      dialogVisible: false,
      examineResult: "",
      data: {
        id: "", //当前数据id
        applicantId: "", //申请人 id  applicantId
        applicantType: "", //通知待办类型（0 注册申请 1 团队申请 2 权限申请，3数据集发布申请，4其他）, applicantType
        bigType: "", //大类型 1待办 2通知 , bigType
        examineResult: "", //审核意见        ---非法用户(如果)     不传
        noticeDescribe: "", //通知待办内容,  账户申请(姓名-电话)已被xxx审核通过   登录人 姓名 通过了 noticeDescribe
        examineOpinion: "", //审核结果 0 待审核 1 已通过 2 已拒绝   0+1
        teamId: "", // 团队id
        datasetId: "", // 数据集父表id,
        datasetTitle: "", //数据集标题,
        executorId: "", //审核执行人id,  当前用户  userid
        belongsToAdmin: "", //是否为运维通知（1是，0否）
      },
      options: [
        {
          value: "1",
          label: "已审核",
        },
        {
          value: "2",
          label: "未审核",
        },
      ],
      value: "2",
      userName: "",
    };
  },
  created() {
    this.noticeLists();
    this.getUser();
  },
  methods: {
    setApplicantType(val){
      if(val === 0){
        return '注册申请'
      }else if(val === 1){
        return '团队申请'
      }else if(val === 2){
        return '权限申请'
      }else if(val === 3){
        return '数据集发布申请'
      }else if(val === 4){
        return '修改密码'
      }
    },
    setExamineOpinion(val){
       if(val === 0){
        return '待审核'
      }else if(val === 1){
        return '已通过'
      }else if(val === 2){
        return '已拒绝'
      }
    },
    getUser() {
      getUserProfile().then((response) => {
        if (response.code === 200) {
          this.userName = response.data.userName;
        }
      });
    },
    noticeLists() {
      const query = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        examineOpinion: this.value,
      };
      noticeList(query).then((res) => {
        if (res.code === 200) {
          this.tableData = res.rows;
          this.total = res.total;
        }
      });
    },
    applicantType(type) {
      if (type === 0) {
        return "注册申请";
      } else if (type === 1) {
        return "团队申请";
      } else if (type === 2) {
        return "权限申请";
      } else if (type === 3) {
        return "数据集发布申请";
      } else if (type === 4) {
        return "其他";
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row, examineOpinion, type) {
      const data = {
        id: row.id, //当前数据id
        applicantId: row.applicantId, //申请人 id  applicantId
        applicantType: row.applicantType, //通知待办类型（0 注册申请 1 团队申请 2 权限申请，3数据集发布申请，4其他）, applicantType
        bigType: row.bigType, //大类型 1待办 2通知 , bigType
        examineResult: 0, //审核意见        ---非法用户(如果)     不传
        noticeDescribe: this.userName + type + row.noticeDescribe, //通知待办内容,  账户申请(姓名-电话)已被xxx审核通过   登录人 姓名 通过了 noticeDescribe
        examineOpinion: examineOpinion, //审核结果 0 待审核 1 已通过 2 已拒绝   0+1
        teamId: row.teamId, // 团队id
        datasetId: row.datasetId, // 数据集父表id,
        datasetTitle: row.datasetTitle, //数据集标题,
        executorId: Cookies.get("userId") || "", //审核执行人id,  当前用户  userid
        belongsToAdmin: row.belongsToAdmin, //是否为运维通知（1是，0否）
      };
      if (examineOpinion === 2) {
        this.dialogVisible = true;

        this.data = {
          ...data,
        };
      } else {
        this.data = {
          ...data,
        };
        noticeEdit(this.data).then((res) => {
          console.log(res);
          if (res.code === 200) {
            this.$message(res.msg);
            this.noticeLists();
          }
        });
      }
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.noticeLists();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.noticeLists();
    },
    closepop() {
      this.dialogVisible = false;
    },
    determine(val) {
      if (val) {
        this.examineResult = val;
        const cont = {
          examineResult: this.examineResult,
        };
        this.data = {
          ...this.data,
          ...cont,
        };
        noticeEdit(this.data).then((res) => {
          if (res.code === 200) {
            this.dialogVisible = false;
            this.$message(res.msg);
            this.noticeLists();
          }
        });
      } else {
        this.$message("请填写拒绝原因");
      }
    },
    changeClick() {
      this.noticeLists();
      console.log(this.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.box-not {
  padding: 20px;
}
>>>>>>> d68bd52999a1e31b7a655be4532e0c6345f6d2d3
</style>