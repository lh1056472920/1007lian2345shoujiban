<template>
    <div class="articleDetails">

        <div class="cut-off-title">
            <span class="now-title">{{articleIdinfo.articleName}}</span>
        </div>
        <div class="info-list">
            <i class="iconfont icon-shijian"></i>
            <span>{{articleIdinfo.articleUpdatetime}}</span>

        </div>
        <div class="main-content">
            <p style="font-family : Helvetica;" class="main-content-two" v-html="articleIdinfo.articleContent"></p>
        </div>
    </div>
</template>
<script>
export default {
    name: "ArticleDetails",
    components: {},
    data() {
        return {
            //         Id: 0,
            articleIdinfo: [],
            //         active: 0,
            articleId: 0
        };
    },
    created() {
        this.getarticleId();
        this.jumpToHotarticle();
    },
    beforeMount() {
        window._bd_share_main = "";
    },
    mounted() {},
    methods: {
        async getarticleId() {},
        async jumpToHotarticle() {
            // this.active = this.$route.query.active;
            // let url = "http://www.lian2345.com";
            let _this = this;
            let articleId = this.$route.query.id;
            // console.log(articleId);
            this.$axios.get(`/web/article/${articleId}`).then(function(res) {
                // console.log(res);
                _this.articleIdinfo = res.data;
            });
        }
    }
};
</script>
<style >

i,
em {
    font-style: normal;
}
ul {
    clear: both;
    overflow: hidden;
}

ol,
ul,
li {
    list-style: none;
}

a {
    text-decoration: none;
    color: #404040;
}
p {
   font-family: arial;
   font-weight: normal;
}
.articleDetails {
    padding: 0.32rem 0.48rem 0rem 0.4rem;
}
.articleDetails .cut-off-title .now-title {
    font-weight: bold;
    color: #404040;
    font-size: 0.42667rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
}
.articleDetails .info-list {
    height: 0.53333rem;
    width: 100%;
    margin-top: 0.21333rem;
}
.articleDetails .info-list > i {
    display: inline-block;
    vertical-align: top;
    color: #a6a6a6;
    font-size: 0.33rem;
    margin-right: 0.16rem;
}
.articleDetails .info-list > span {
    display: inline-block;
    vertical-align: top;
    color: #a6a6a6;
    font-size: 0.33rem;
}
.articleDetails .main-content .main-content-two {
    color: #404040;
    font-size: 0.4rem;
    font-weight: 100;
}
/* .articleDetails .main-content .main-content-two >p {
    font-family: Helvetica;

} */
.articleDetails .main-content .main-content-two ul {
    width: 100%;
    padding: 0;
}
.articleDetails .main-content .main-content-two img {
    width: 100%;
    height: 100%;
}
</style>
