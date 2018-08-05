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
            <el-radio-group v-model="tpForm.type" @change="changeType">
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
            <div v-for="(info, index) in tpForm.picList" :key="info.id" class="picList">
                <el-upload
                  @click="changeIndex"
                  class="plusBtn"
                  ref="upload"
                  action="https://jsonplaceholder.typicode.com/posts/"
                  :file-list="info.fileList"
                  :on-preview="handlePreview"
                  :on-change="changeFile"
                  :auto-upload="false"
                  :multiple="false"
                  :show-file-list="false">
                <i class="el-icon-plus" v-if="info.picUrl == ''"></i>
                <img :src="info.picUrl" v-else/>
              </el-upload>
              <el-input  size="small" v-model="info.content" placeholder="请输入15字以内描述"></el-input>
              <i class="el-icon-close" @click="delPicInfo(index)"></i>
            </div>
          </div>
          <!--文本选项-->
          <div v-else>
            <div v-for="(info, index) in tpForm.textList" :key="info.id" class="textList">
              <el-input  size="small" v-model="info.content" placeholder="请输入15字以内描述"></el-input>
              <i class="el-icon-close" @click="delTextInfo(index)"></i>
            </div>
          </div>
          <el-form-item label="支持多选" class="border-t"  prop="more" label-width="80px" >
            <el-switch size="small" v-model="tpForm.more"></el-switch>
          </el-form-item>
          <el-form-item label="投票有效期"  prop="validityTime" label-width="94px" >
            <el-select v-model="tpForm.validityTime" placeholder="请选择投票有效期">
              <el-option label="一天" value="day"></el-option>
              <el-option label="一周" value="week"></el-option>
              <el-option label="一个月" value="month"></el-option>
              <el-option label="三个月" value="3month"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="投票可见性"  prop="visibility" label-width="94px" >
            <el-select v-model="tpForm.visibility" placeholder="请选择投票有效期">
              <el-option label="投票前可见" value="1"></el-option>
              <el-option label="投票后可见" value="2"></el-option>
              <el-option label="永久不可见" value="3"></el-option>
            </el-select>
          </el-form-item>
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
            more: false, // 是否支持多选
            validityTime: 'day', // 投票有效期
            visibility: '1', // 投票可见性
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
            ],
            more: [
              { required: true, message: '请选择投票类型', trigger: 'blur' }
            ],
            validityTime: [
              { required: true, message: '请选择投票有效期', trigger: 'blur' }
            ],
            visibility: [
              { required: true, message: '请选择投票可见性', trigger: 'blur' }
            ]
          }
        };
      },
      methods: {
        changeIndex () {
          console.log(212);
        },
        changeFile (file, fileList) {
          console.log(file);
          console.log(fileList);
        },
        handlePreview (file) {
          console.log(file);
        },
        delPicInfo (index) {
          this.tpForm.picList.splice(index, 1);
        },
        delTextInfo (index) {
          this.tpForm.textList.splice(index, 1);
        },
        changeType () {
          this.listId = 0;
          this.tpForm.picList = [];
          this.tpForm.textList = [];
        },
        addDesc () { // 添加投票选项
          if (this.tpForm.type === 1) { // 添加图片投票选项
            let info = {
              id: this.listId + 1,
              picUrl: '',
              content: '',
              fileList: []
            };
            this.tpForm.picList.push(info);
            this.listId = this.listId + 1;
          } else { // 添加文字投票选项
            let info = {
              id: this.listId + 1,
              content: ''
            };
            this.tpForm.textList.push(info);
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
          this.tpForm = {
            name: '',
            desc: '',
            descNum: 0,
            type: 1,
            listId: 0, // 作为投票选项的id，从0开始累加
            picList: [],
            textList: []
          };
          this.ztForm = {
            name: '',
            desc: '',
            descNum: 0
          };
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
        },
        'tpForm.desc': function () {
          this.tpForm.descNum = this.tpForm.desc.length;
          if (this.tpForm.desc.length > 6000) {
            this.tpForm.desc = this.tpForm.desc.substring(0, 6000);
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
  .descNum, .descNum2{
     position: relative;
     bottom: 25px;
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
  .plusBtn{
    cursor: pointer;
    border: 1px solid #bdbdbd;
    width: 14px;
    padding: 0 5px;
    margin-right: 12px;
    float: left;
  }
  .picList .el-input{
    float: left;
    width: 80%;
    margin-top: -3px;
  }
  .picList, .textList{
    height: 46px;
    margin-top: 16px;
  }
  .picList .el-icon-close, .textList .el-icon-close{
    float: left;
    margin-top: 3px;
    font-size: 18px;
    color: #adadad;
    cursor: pointer;
    margin-left: 20px;
  }
  .textList .el-input{
    margin-left: 52px;
    float: left;
    width: 75%;
  }
  .el-switch{
    margin-left: 13px;
  }
  .border-t{
    border-top: 1px solid #efefef;
  }
</style>
