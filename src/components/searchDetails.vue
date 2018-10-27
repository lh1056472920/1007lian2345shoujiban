<template>
    <div class="search-page">
        <div class="header">
            <div class="searchnav"></div>
            <nav class="search-nav" :data-text='searchText'>
                <a :class="{active: active==='article'}" @click.stop.prevent="clickItem('article')">文章</a>

                <a :class="{active: active==='project'}" @click.stop.prevent="clickItem('project')">项目</a>
            </nav>

        </div>
        <div class="search-main">
            <div v-if="active==='article'">
                <div class="info-list" v-for="(item,index) in subCategoryList.list" :key="index">
                    <div class="loop">
                        <div class="info-img">
                            <img class="info-list-img" :src="`${item.articleImage}`" :onerror="actImgDefault" alt="">
                            <span class="info-img-one" v-if="item.categoryId==1">热门</span>
                            <span class="info-img-one" v-if="item.categoryId==2">快讯</span>
                            <span class="info-img-one" v-if="item.categoryId==3">行情</span>
                            <span class="info-img-one" v-if="item.categoryId==4">政策</span>
                            <span class="info-img-one" v-if="item.categoryId==30||item.categoryId==31">人物</span>
                            <span class="info-img-one" v-if="item.categoryId==6">百科</span>
                            <span class="info-img-one" v-if="item.categoryId==7">矿业</span>
                        </div>
                        <div class="info-describe">
                            <router-link :to="{path:'/articleDetails',query: {id: item.articleId,active:item.categoryId}}" class="info-describe-title">
                                <span class="info-describe-content">{{item.articleKeyword}}
                                </span>
                            </router-link>
                            <div class="info-list-footer">
                                <i class="info-list-footer-time iconfont icon-shijian"></i>
                                <span>{{item.articleUpdatetime}}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="searchNothing" v-if="subCategoryList.endRow==0">
                    <!-- <img src="~/static/images/search-nothing.png" alt=""> -->

                    <p>暂无搜索内容</p>
                </div>
            </div>
            <div v-if="active==='project'" class="project">
                <div class="project-list projectone" v-for="item in coinlist1.list" :key="item.index">
                    <router-link class="projectloop" :to="{path: `/quotationDetails`,query: {'name': item.name,'code': item.code}}">

                        <img class="project-list-img" :src="`http://tokenpe.pub/images/img${item.image}`" :onerror="actImgDefault" alt="">

                        <div class="project-describe">
                            <span class="project-describe-content">{{item.name}}/{{item.chineseName}}
                            </span>
                            <!-- <div class="info-list-footer">
                <span class="coinlist-describe-content">
                  <span class="yuan"></span>{{item.relatedNotion}}
                </span>
              </div> -->
                        </div>
                    </router-link>
                </div>
                <div class="searchNothing" v-if="coinlist1.endRow == 0">
                    <p>暂无搜索内容</p>
                </div>
            </div>

        </div>
    </div>
</template>



<script>
export default {
    name: "search",
    components: {},
    data() {
        return {
            active: "",
            Text: "",
            // searchText:'',
            subCategoryList: [],
            coinlist1: [],
            actImgDefault:
                'this.src="' +
                require("@/assets/images/bizhongdaquan.jpg") +
                '"'
        };
    },
    created() {
        //    this.clickItem(this.active)
    },
    computed: {
        searchText() {
            this.research();
            // console.log(111);

            return this.$route.query.searchText;
        }
    },
    methods: {
        research() {
            // const url = "http://www.lian2345.com";
            this.Text = this.$route.query.searchText;
            console.log(this.Text);

            if (this.Text) {
                // console.log(111);

                const _this = this;
                this.$axios
                    .post(
                        `/entityController/elasticsearch/searchover?name=${
                            _this.Text
                        }`
                    )
                    .then(function(data) {
                        console.log(data);
                        _this.subCategoryList =
                            data.data.index_article_wenzhang;

                        _this.coinlist1 = data.data.index_token;
                        if (data.data.index_article_wenzhang.endRow == 0&&data.data.index_token.endRow==0) {
                            _this.active = "article";
                        }else{
                            _this.active = "project";
                            _this.clickItem(_this.active); 
                        }
                    });
            }
        },
        clickItem(active) {
            this.active = active;
        }
    }
};
</script>

<style>
.search-page .searchnav {
    width: 100%;
    height: 1.5rem;
}
.search-page nav {
    position: fixed;
    top: 1.2rem;
    background-color: #fff;
    z-index: 99;
    display: flex;
    width: 100%;
    height: 1.5rem;
    font-size: 1rem;
    color: #404040;
    display: inline-block;
    line-height: 1.5rem;

    cursor: pointer;
    /* text-align: left; */
    border-bottom: 1px solid #f2f2f2;
    box-shadow: 0px 2px 2px #ccc;
}

.search-page nav a {
    /* height: 0.67rem; */
    display: inline-block;
    vertical-align: top;
    width: 48%;
    text-align: center;
    color: #404040;
    text-decoration: unset;
    font-size: 0.45rem;
    margin: 0;
}
.search-page nav a.active {
    /* font-weight: bold; */
    color: #f25a36;
    border-bottom: 2px solid #f25a36;
}
.search-page .info .info-list {
    margin-bottom: 0.10667rem;
}

.search-page .info-list .loop {
    display: flex;
    width: 100%;

    height: 100%;
    padding: 0.2133rem 0.4rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-shadow: 0px 4px 6px rgba(117, 117, 117, 0.3);
}

.search-page .info-list .loop:hover {
    background-color: #f8f8f8;
}

.search-page .info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.search-page .info-img {
    display: inline-block;
    position: relative;
    height: 100%;
}
.search-page .info-list-img {
    width: 3.4667rem;
    height: 2rem;
    border-radius: 0.213333rem;
}
.search-page .info-img .info-img-one {
    display: block;
    width: 1.12rem;
    height: 0.42667rem;
    border-radius: 8px;
    position: absolute;
    bottom: 0.213333rem;
    left: 0.213333rem;
    background-color: #000;
    opacity: 0.5;
    text-align: center;
    line-height: 0.42667rem;
    font-size: 0.32rem;
    color: #fff;
}
.search-page .info-describe {
    padding-left: 0.1333rem;
    flex: 1;
    /* margin-left: 20px; */
    position: relative;
    right: 0;
    text-decoration: unset;
    display: inline-block;
    /* width: 504px; */
    vertical-align: top;
}

.search-page .info-list .loop:hover {
    background-color: #f8f8f8;
}

.search-page .info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.search-page .info-list-describe-title {
    display: block;
    color: #404040;
    font-size: 0.48px;
    height: 1.3333px;
    line-height: 0.6667px;
    overflow: hidden;
    word-wrap: break-word;
    word-break: break-all;
    cursor: pointer;
    /* font-weight: 600; */
}

.search-page .info-describe-content {
    /* margin-top: 5px; */
    display: block;
    color: #404040;
    font-size: 0.4rem;
    line-height: 0.55rem;
    text-align: none;
    cursor: pointer;
    /* margin-bottom: -0.3rem; */
    height: 1rem;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
.search-page .info-list-footer {
    height: 0.426667rem;
    position: absolute;
    bottom: 0;
}
.search-page .info-list-footer > span {
    /* font-size: 0.75rem; */
    font-size: 0.32rem;
    color: #a6a6a6;
    display: inline-block;
    vertical-align: top;
    /* margin-right: 42px; */
}

.search-page .info-list-footer i {
    display: inline-block;
    margin-right: 0.16rem;
    font-size: 0.32rem;
    color: #a6a6a6;
    vertical-align: top;
}

.search-page .searchNothing {
    width: 100%;
    text-align: center;
}
.search-page .projectone {
    width: 32%;
    border-radius: 4px;
    overflow: hidden;
    margin-right: 0.18rem;
    margin-bottom: 0.32rem;
    box-shadow: 0 2px 2px rgba(177, 177, 177, 0.3);
}
.search-page .projectone:nth-child(3n) {
    margin-right: 0;
}
.search-page .projectone,
.search-page .projectone > a {
    display: inline-block;
    vertical-align: top;
}
.search-page .projectone > a {
    width: 100%;
    background-color: #fff;
    /* margin-top: 10px; */
}
.search-page .projectone img {
    margin: 0 auto;
    display: block;
    width: 3rem;
    height: 3rem;
    /* height: 100%; */
    /* border-radius: 12px; */
    /* overflow: hidden; */
}
.search-page .projectone .project-describe {
    width: 100%;
    display: block;
    text-align: center;
    line-height: 1rem;
    font-size: 0.36rem;
    color: #404040;
}
.search-page .project {
    padding: 0 0.32rem;
}
</style>
