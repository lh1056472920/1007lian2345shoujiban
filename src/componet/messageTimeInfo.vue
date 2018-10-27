<template>
  <div class="main">
    <div class="left">
      <div class="cut_off_nav">
        <span class="now_day">{{time}}</span>
        <span class="now_week">{{str}}</span>
      </div>

      <div class="ul_main" v-for="(item,i) in list" :key="i">

        <div v-show="item.created_at==lists[j]&&new Date(item.created_at *1000).getDate()!=day" v-for="(item1,j) in lists" :key='item1.index' class="cut_off_nav">
          <span class="now_day">{{new Date(item.created_at *1000).getFullYear() + "年" + (new Date(item.created_at *1000).getMonth() + 1) + "月" + new Date(item.created_at *1000).getDate() + "日"}}</span>
          <span class="now_week">{{"星期" + "日一二三四五六".charAt(new Date(item.created_at *1000).getDay())}}</span>
        </div>
        <div class="li_list">
          <div class="li_list_left">
            <span class="ball"></span>
            <span class="now_time" v-text="(new Date(item.created_at *1000).getHours()>=10?new Date(item.created_at *1000).getHours():('0'+new Date(item.created_at *1000).getHours()))+':'+(new Date(item.created_at *1000).getMinutes()>=10?new Date(item.created_at *1000).getMinutes():('0'+new Date(item.created_at *1000).getMinutes()))"></span>
          </div>
          <div :data='item.id' class="li_list_right">
            <span class="li_list_title">{{(item.content).match(/【(.*)】/)&&(item.content).match(/【(.*)】/)[0].replace("【","").replace("】","")}}</span>
            <span class="li_list_content">{{item.content}}
            </span>
            <a :href="item.link" class="li_list_contenta">{{item.link_name}}
            </a>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>
<script>
export default {
  props: {
    list: Array,
    lists: Array
  },

  data() {
    return {
      Consult: [],
      time: "",
      str: "",
      day: 0,
      numli: []
      // cite:this.list,
    };
  },
  created() {
    let today = new Date();
    let mon = today.getMonth() + 1;
    this.time =
      today.getFullYear() + "年" + mon + "月" + today.getDate() + "日";
    this.str = "星期" + "日一二三四五六".charAt(new Date().getDay());
    this.day = today.getDate();
  },
  mounted() {},
  methods: {}
};
</script>
 <style >
.main {
  width: 100%;
  /* box-shadow: 0px 2px 0px 0px #f2f2f2 inset;     */
  /* margin: 0 auto; */
}

.main .left {
  display: inline-block;
  text-align: left;
  vertical-align: top;
  /* border-left: 1px solid #ccc; */
}

/* .right {
    display: inline-block;
    margin-left: 80px;
    width: 330px;
    margin-top: 44px;
    vertical-align: top;
} */

.main .nav_top {
  line-height: 44px;
  font-size: 14px;
  color: #d9d9d9;
  border-bottom: 2px solid #f25a36;
}

.main .cut_off_nav {
  font-weight: bold;
  color: #404040;
  height: 1.33rem;
  font-size: 0.48rem;
  line-height: 1.33rem;
  border-bottom: 1px solid #f2f2f2;
  text-align: center;
}

.main .cut_off_nav .now_week {
  font-weight: normal;
  font-size: 0.3667rem;
  color: #a6a6a6;
}

.main .ul_main {
  /* padding: 1rem; */

  width: 100%;
  /* padding: 20px 0 20px 0px; */
}

.main .li_list {
  width: 100%;
  box-sizing: border-box;
  padding: 0 0.4533rem;
  padding-top: 0.75rem;
  vertical-align: top;
}

.main .li_list_left {
  width: 0.8533rem;
  display: block;
  /* width: 80px; */
  text-align: center;
  position: relative;
  font-size: 0.32rem;
  color: #404040;
  /* vertical-align: top; */
  /* padding-top: 3px; */
  /* margin-left: 5px; */
}
.main .li_list_left .now_time {
  /* width: 100%;
  display: block; */
  font-size: 0.4rem;
  /* margin-left: 0.3rem; */
}
.main .li_list_left .ball {
  position: absolute;
  display: inline-block;
  width: 1px;
  height: 1px;
  border: 0.08rem solid #f25a36;
  border-radius: 50%;
  /* background-color: #f25a36; */
  top: 0.2rem;
  left: -0.2rem;
}

.main .li_list_right {
  cursor: pointer;
  display: block;
  /* vertical-align: top; */
  /* margin-left: 1rem; */
  margin-top: .32rem;
  /* text-decoration: none; */
}

.main .li_list_right .li_list_title {
  display: block;
  max-height: 1.06667rem;
  line-height: 0.5333rem;
  font-size: 0.4rem;
  color: #404040;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-weight: bold;
  /* margin-bottom: 0.26667rem; */
}

.main .li_list_right .li_list_content {
  width: 100%;
  display: inline-block;
  font-size: 0.38rem;
  line-height: 0.5rem;
  color: #5b5b5b;
  word-wrap: break-word;
  word-break: break-all;
  margin-top: 0.64rem;
  /* margin-top: 5px;
    line-height: 20px; */
}

.main .li_list_contenta {
  display: block;
  font-size: 0.85rem;
  color: #a6a6a6;
  margin-top: 0.3rem;
}
</style>
 