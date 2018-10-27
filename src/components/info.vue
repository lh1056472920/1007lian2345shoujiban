<template>
    <div class="index">
        <nav>
            <!-- <a v-for="(item, i) in $store.state.topicList" :key="i" v-if="item.topicIsShow===1" v-text="item.topicName" :class="{active: getActive===topicArr[item.topicId]}" @click.stop.prevent="clickItem(item.topicId,item.topicName)"></a> -->
            <a @click.stop.prevent="clickItem('info')">资讯
                <span class="main-icon iconfont icon-right"></span>
            </a>
            <a  @click.stop.prevent="clickItem('quotation')">行情
                <span class="main-icon iconfont icon-right"></span>
            </a>
            <a  @click.stop.prevent="clickItem('character')">人物
                <span class="main-icon iconfont icon-right"></span>
            </a>
        </nav>
    </div>
</template>
<script>
export default {
    name:"index",
    data() {
        return{

        }
        // active: "";
    },
    methods: {
        clickItem(actions) {
            if (actions == "info") {
                // console.log(111);

                this.$router.push({
                    path: "/"
                });
                // this.isFalseone={
                //   color:'#f25a36'
                // }
            } else if (actions == "quotation") {
                this.$router.push({
                    path: "/quotation"
                });
            } else if (actions == "character") {
                this.$router.push({
                    path: "/character"
                });
            }
            this.active = actions;
        }
    }
};
</script>


<style>
.index nav {
    /* position: relative; */
    /* margin-top: 1.2rem */
}
.index nav a {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    font-size: 0.48rem;
    height: 1.3333rem;
    line-height: 1.333rem;
    padding-left: 0.5333rem;
    border-bottom: 1px solid #f7f7f8;
    display: block;
    color: #404040;
}
.index nav a:first-child {
    border-top: 1px solid #f7f7f8;
    /* box-shadow: 0px 2px 0px 0px #f2f2f2 inset; */
}
.index nav a .main-icon {
    position: absolute;
    top: 0;
    right: 0.5333rem;
    color: #747474;
}

</style>

