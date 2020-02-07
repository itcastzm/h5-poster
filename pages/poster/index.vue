<template>
  <div class="container">
    <canvas id="myCanvas" width="800" height="900"></canvas>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
import { Ajax } from "~/utils";
import html2canvas from "html2canvas";
export default {
  components: {
    // Logo
  },
  mounted() {
    if (!this.entity.name) {
      this.$router.push({
        path: "/"
      });
    }

    this.drawPoster();
  },
  data() {
    return {
      posterContainer: {
        backgroundImage: `url(${this.$store.state.poster.entity.backgroud_image})`,
        width: "600px",
        height: "800px",
        margin: "0 auto"
      },
      qrcodeStyle: {
        width: "200px",
        height: "200px"
      },
      teacherStyle: {
        width: "300px",
        height: "300px"
      },
      centerDialogVisible: false
    };
  },
  computed: {
    entity() {
      return this.$store.state.poster.entity;
    }
  },

  methods: {
    makePoster() {},
    drawPoster() {
      // 拿到canvas元素
      let c = document.getElementById("myCanvas");
      // 拿到canvas2d幕布
      let ctx = c.getContext("2d");

      // 图片加载完之后  使用canvas幕布将图片渲染到canvs里面
      let bg_img = new Image();
      bg_img.src = this.entity.backgroud_image;
      bg_img.onload = () => {
        // ctx.drawImage(图片对象, 图片渲染位置x轴, 图片渲染y轴，图片的宽度,图片的高度)
        ctx.drawImage(bg_img, 0, 0, 800, 900);
        // ctx.zIndex = "1";
        ctx.textBaseline = "top";
        ctx.font = "bold 30px 微软雅黑";
        ctx.fillStyle = "#fff"; //填充的文本
        ctx.textAlign = "center";
        ctx.fillText(this.entity.name, 50, 10); //实心字体
        ctx.fillText(this.entity.title, 100, 50); //实心字体

        ctx.font = "bold 30px Arial"; //设置样式
        ctx.strokeStyle = "#1712F4";
        ctx.strokeText("欢迎来到我的博客！", 150, 100);
      };

      let qrcode_img = new Image();
      qrcode_img.src = this.entity.qrcode;
      qrcode_img.onload = () => {
        ctx.drawImage(qrcode_img, 10, 80, 100, 100);
      };

      let teacher_image_img = new Image();
      teacher_image_img.src = this.entity.teacher_image;
      teacher_image_img.onload = () => {
        ctx.drawImage(teacher_image_img, 10, 190, 200, 200);
      };

    },
    beforeDialogClose() {}
    // async fetchProjects() {
    //   const { api } = this.$store.state;
    //   const data = await this.$axios.$get(api.GET_PROJECTS);
    //   console.log(data, "data");
    // },
    // async fetchSomething() {
    //   const { api } = this.$store.state;
    //   const data = await this.$axios.$post(api.GET_TOKEN, {
    //     grant_type: "password",
    //     username: "zhumin@itcast.cn",
    //     password: "zhumin123456"
    //   });
    // }
  }
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  /* display: flex; */
  justify-content: center;
  align-items: start;
  text-align: center;
}
.project-list {
  margin: 0 auto;
}
</style>
