<template>
  <div class="container">
    <h1 class="title">h5专题页生成器</h1>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="120px"
      label-position="right"
      class="form-area"
    >
      <el-form-item label="活动名称：" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="活动标题：">
        <el-input type="textarea" v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="微信二维码：">
        <input
          type="file"
          class="upload-item"
          @change="e => addImg('qrcode', e)"
          ref="qrcode_inputer"
        />
      </el-form-item>
      <el-form-item label="教师照片：">
        <input
          type="file"
          class="upload-item"
          @change="e => addImg('teacher_image', e)"
          ref="teacher_image_inputer"
        />
      </el-form-item>
      <el-form-item label="背景照片：">
        <input
          type="file"
          class="upload-item"
          @change="e => addImg('backgroud_image', e)"
          ref="backgroud_image_inputer"
        />
      </el-form-item>
      <el-form-item label="生成方式：">
        <el-radio-group v-model="form.make_type" class="radio-options">
          <el-radio :label="1">服务器生成</el-radio>
          <el-radio :label="2">本地生成</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">生成</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import { Ajax } from "~/utils";

export default {
  components: {
    // Logo
  },
  data() {
    return {
      form: {
        name: "张三",
        title: "业界牛师！",
        qrcode: '',
        teacher_image: '',
        backgroud_image: '',
        make_type: 2
      },
      rules: {
        name: [
          { required: true, message: "请输入教师姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },
  mounted() {
    // this.fetchSomething();
  },
  methods: {
    async submitGitAccount() {
      //提交管理员的Git 账号密码和指定项目信息
      console.log("submitGitAccount");
      let tokenData = await this.$axios({
        url: "/api/token",
        method: "post",
        data: {
          username: this.username,
          password: this.password,
          group: this.group
        }
      });
      this.token = tokenData.data.access_token;
      // 更新token到vuex中
      this.updateToken(tokenData.data.access_token);

      let projects = await this.$axios({
        url: "/api/group/projects/list",
        method: "post",
        data: {
          group: this.group,
          token: tokenData.data.access_token
        }
      });
      this.updateList(projects.data);
      
    },

    updateEntity(entity) {
      this.$store.commit("poster/update", entity);
    },

    addImg(type, e) {
      let ref = this.$refs[type + "_inputer"];
      let url = this.getObjectURL(ref.files[0]);
      this.form[type] = url;
    },
    onSubmit() {
      console.log(this.form);
      console.log("生成！");
      this.updateEntity({... this.form});
      this.$router.push({ path: "/poster" });
    },
    getObjectURL(file) {
      var url = null;
      if (window.createObjectURL != undefined) {
        // basic
        url = window.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        url = window.URL.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        url = window.webkitURL.createObjectURL(file);
      }
      return url;
    }
  }
};
</script>

<style lang="less" scoped>
.form-area {
  width: 60%;
  margin: 0 auto;
}

.radio-options {
  text-align: left;
  width: 100%;
}

.upload-item {
  display: flex;
}

.el-upload__tip {
  padding-left: 10px;
}

.container {
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 50px;
  color: #35495e;
  letter-spacing: 1px;
}
</style>
