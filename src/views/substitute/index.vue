<template>
  <div class="container">
    <van-card v-for="course in courses" :key="course.id" :thumb="course.publisherHeader">
      <div class="title" slot="title">
        问卷名称：{{course.courseName}} <br />
      </div>
      <div class="desc" slot="desc">
        开始时间：{{course.courseTime}} <br /> 问卷主题：{{course.coursePlace}} - {{course.courseClass}} <br /> 闲钱：¥ {{course.reward ? course.reward : 0}}<br />
      </div>
      <div slot="footer">
        <van-button @click="toggleCourseDetail(course)" size="mini">详情</van-button>
        <van-button @click="onSubstituteClicked(course)" size="mini" type="primary" plain>参与</van-button>
      </div>
    </van-card>

    <van-sku v-model="isShowCourse" :sku="course" :goods="courseTitle" close-on-click-overlay>
      <template slot="sku-header-price">
        <div class="van-sku__goods-price">
          <span>闲钱：</span>
          <span class="van-sku__price-symbol">￥</span>
          <span class="van-sku__price-num">{{ course.reward || 0}}</span>
        </div>
      </template>
      <template slot="sku-group">
        <van-row class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            学校：
          </van-col>
          <van-col span="10">
            {{course.school}}
          </van-col>
        </van-row>

        <van-row v-show="course.hasName" class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            姓名：
          </van-col>
          <van-col span="10">
            {{course.publisherName}}
          </van-col>
        </van-row>

        <van-row v-show="course.hasStuId" class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            学号：
          </van-col>
          <van-col span="10">
            {{course.studentId}}
          </van-col>
        </van-row>

        <van-row v-show="course.hasPhone" class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            电话：
          </van-col>
          <van-col span="10">
            {{course.phone}}
          </van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            开始时间：
          </van-col>
          <van-col span="10">
            {{course.courseTime}}
          </van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            问卷地址：
          </van-col>
          <van-col span="10">
            {{course.courseClass}}
          </van-col>
        </van-row>

        <van-row class="row" type="flex" align="center">
          <van-col span="5" offset="1">
            问卷主题：
          </van-col>
          <van-col span="10">
            {{course.coursePlace}}
          </van-col>
        </van-row>
      </template>

      <!-- 留言 -->
      <template slot="sku-stepper">
        <van-row type="flex">
          <van-col span="5" offset="1">
            留言：
          </van-col>
          <van-col span="17">
            {{course.remark}}
          </van-col>
        </van-row>
      </template>
      <!-- sku actions -->
      <template slot="sku-actions">
        <div class="van-sku-actions">
          <van-button bottom-action @click="onCollectionClicked">收藏问卷</van-button>
          <!-- onBuyClicked callback -->
          <van-button type="primary" bottom-action @click="onSubstituteClicked(course)">立即参与</van-button>
        </div>
      </template>
    </van-sku>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      courses: "",
      course: {},
      isShowCourse: false
    };
  },
  methods: {
    toggleCourseDetail(course) {
      this.isShowCourse = true;
      this.course = course;
      this.course.tree = [
        {
          v: [
            {}, {}
          ],
        }
      ];
    },

    // 参与
    onSubstituteClicked(course) {
      if (this.user.userId == course.publisher) {
        this.$toast('不能参与自己发布的问卷！');
        return;
      }
      this.$http
        .substitute({
          userId: this.user.userId,
          userName: this.user.userName,
          course
        })
        .then(res => {
          this.$toast("参与成功！");
        })
        .catch(err => {});
    },

    // 收藏
    onCollectionClicked() {
      this.$http.collectCourse({
        userId: this.user.userId,
        courseId: this.course.id
      }).then(res => {
        this.$toast(res.msg);
      })
    }
  },
  computed: {
    ...mapState({
      user: state => state.mine.user
    }),
    courseTitle() {
      return {
        title: this.course.courseName,
        picture: this.course.publisherHeader
      };
    }
  },
  mounted() {
    this.$http
      .getCourse({ status: "open" })
      .then(res => {
        this.courses = res.data;
      });
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
}

.desc {
  font-size: 12px;
}

.row {
  margin: 10px 0 10px;
}

.container /deep/ .van-sku__goods-name {
  font-size: 16px;
}
</style>

