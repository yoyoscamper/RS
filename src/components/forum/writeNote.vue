<template>
  <el-dialog id="writeNote" title="发表新帖" :visible.sync="newNote.dialogVisible"  width="40%" :before-close="handleClose">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="主题帖" name="first">
        <el-form ref="ztForm" :model="ztForm" label-width="52px" :rules="ztRules">
          <el-form-item label="标题">
            <el-input v-model="ztForm.name"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="desc">
            <el-input type="textarea" v-model="ztForm.desc"></el-input>
          </el-form-item>
          <el-upload
            style="margin-left: 52px;"
            :action="actionUrl"
            list-type="picture-card"
            :auto-upload="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible"  append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="投票贴" name="second">
        <el-form ref="tpForm" :model="tpForm" label-width="52px" :rules="tpRules">
          <el-form-item label="标题" prop="name">
            <el-input v-model="ztForm.name"></el-input>
          </el-form-item>
          <el-form-item label="内容" prop="desc">
            <el-input type="textarea" v-model="ztForm.desc"></el-input>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="saveNote">确 定</el-button>
  </span>
  </el-dialog>

</template>

<script>
    export default {
      name: 'newNote',
      props: ['newNote'],
      data: function () {
        return {
          actionUrl: '',
          dialogImageUrl: '',
          dialogVisible: false,
          activeName: 'first',
          ztForm: {
            name: '',
            desc: ''
          },
          tpForm: {
            name: '',
            desc: ''
          },
          ztRules: {
            desc: [
              { required: true, message: '请填写内容', trigger: 'blur' }
            ]
          },
          tpRules: {
            name: [
              { required: true, message: '请填写标题', trigger: 'blur' }
            ],
            desc: [
              { required: true, message: '请填写内容', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        uploadSuccess (response, file, fileList) {
          this.planDialogVisible = false;
          this.fileList = [];
          this.actionUrl = '';
          // this.$emit('headSuccessBack', false);
        },
        uploadError (err, file, fileList) {
          err.toString();
          this.$message.error('上传失败');
        },
        handleRemove (file, fileList) {
          console.log(file, fileList);
        },
        handlePictureCardPreview (file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        handleClick (tab, event) {
          console.log(tab, event);
        },
        handleClose () {
          this.activeName = 'first';
          this.$emit('headCallBack', false);
        },
        saveNote () {
          /* if (this.fileList.length === 0) {
            this.$message.error('请提交研发计划交付物');
            return false;
          }
          this.actionUrl = '/api/mngTodo/operateCompleteFile?todoId=' + this.todoId + '&fileType=' + this.devPlan.fileType;
          var Self = this;
          this.$refs[formName].validate(function (valid) { // form 表单验证
          if (valid) {
          this.$nextTick(function () {
            this.$refs.upload.submit();
          }); */
          this.handleClose();
        }
      }
    };
</script>

<style scoped>
.el-dialog__body{
  padding: 0 20px;
}
</style>
