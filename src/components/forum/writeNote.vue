<template>
  <el-dialog id="writeNote" title="发表新帖" :visible.sync="newNote.dialogVisible"  top="4vh" width="40%" :before-close="handleClose">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="主题帖" name="first">
        <el-form ref="ztForm" :model="ztForm" label-width="52px" :rules="ztRules">
          <el-form-item label="标题">
            <el-input v-model="ztForm.name" placeholder="标题（可选）"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0" label="内容" prop="desc">
            <el-input type="textarea" v-model="ztForm.desc" :rows="4" placeholder="说点什么吧..."></el-input>
          </el-form-item>
          <label class="descNum">{{ztForm.descNum}}/6000</label>
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
          <el-form-item label="标题" prop="name" >
            <el-input v-model="tpForm.name" placeholder="请输入投票标题"></el-input>
          </el-form-item>
          <el-form-item style="margin-bottom: 0" label="内容" prop="desc" >
            <el-input type="textarea" v-model="tpForm.desc" :rows="4" placeholder="填写投票描述，让更多的人参与投票"></el-input>
          </el-form-item>
          <label class="descNum2">{{tpForm.descNum}}/6000</label>
          <el-form-item label="类型" prop="type">
            <el-radio-group v-model="tpForm.type">
              <el-radio :label="1">图片投票</el-radio>
              <el-radio :label="2">文本投票</el-radio>
            </el-radio-group>
            <div class="addListBtn">
              <i @click="addDesc" class="el-icon-plus"></i>
              <label  @click="addDesc">新建投票选项</label>
            </div>
          </el-form-item>
          <!--图片选项-->
          <div v-if="tpForm.type === 1">
            <div v-for="info in tpForm.picList" :key="info.id">
              <i class="el-icon-plus"></i>
            </div>
          </div>
          <!--文本选项-->
          <row v-else>

          </row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
    <el-button @click="handleClose">取 消</el-button>
    <el-button type="primary" @click="saveNote">发 贴</el-button>
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
            desc: '',
            descNum: 0
          },
          tpForm: {
            name: '',
            desc: '',
            descNum: 0,
            type: 1,
            listId: 0, // 作为投票选项的id，从0开始累加
            picList: [],
            textList: []
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
            ],
            type: [
              { required: true, message: '请选择投票类型', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        addDesc () { // 添加投票选项
          if (this.tpForm.type === 1) { // 添加图片投票选项
            let info = {
              id: this.listId + 1,
              picUrl: '',
              content: ''
            };
            this.tpForm.picList.push(info);
            this.listId = this.listId + 1;
          } else { // 添加文字投票选项

          }
        },
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
      },
      watch: {
        'ztForm.desc': function () {
          this.ztForm.descNum = this.ztForm.desc.length;
          if (this.ztForm.desc.length > 6000) {
            this.ztForm.desc = this.ztForm.desc.substring(0, 6000);
          }
        }
      }
    };
</script>

<style scoped>
  .el-dialog__body{
    padding: 0 20px;
  }
  .el-dialog__wrapper{
    overflow: hidden;
  }
  #pane-first, #pane-second{
    height: 290px;
    overflow-y: auto;
  }
  .descNum{
     position: relative;
     bottom: 25px;
    left: 77%;
     font-size: 12px;
     color: #ddd;
   }
  .descNum2{
    position: relative;
    bottom: 43px;
    left: 77%;
    font-size: 12px;
    color: #ddd;
  }
  .el-input, .el-textarea{
    width: 92%;
  }
.addListBtn{
  margin-right: 8%;
  float: right;
  color: #007DDB;
}
  .addListBtn>i, .addListBtn>label{
    cursor: pointer;
  }
</style>
