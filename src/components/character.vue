<template>
    <div>
        <div class="character">
            <div class="char"></div>
            <nav>
                <a v-for="item2 in subCategoryList" :key="item2.categoryId" :class="{active: active==item2.categoryId}" @click.stop.prevent="clickItem(item2.categoryId,item2.categoryName)">{{item2.categoryName}}</a>

            </nav>
            <!-- </header> -->
            <div class="footerlist demo-loadmore-wrap" :z-depth="1">
                <div ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loading-text='loadingText'>
                        <div class="info-list" v-show="active==item1.categoryId" v-for="(item1,index) in subCategoryList" :key="index">
                            <div class="loop" v-for="(item,i) in resultMaps[item1.categoryId].content" :key="i">
                                <router-link :to="{path:'/articleDetails',query: {id: item.articleId,active:item1.categoryId}}">
                                    <div class="info-img">
                                        <img class="info-list-img" :src="`${item.articleImage}`" :onerror="actImgDefault" alt="">
                                        <span class="info-img-one">人物</span>
                                    </div>
                                    <div class="info-describe">
                                        <div class="info-describe-title">
                                            <span class="info-describe-content">{{item.articleKeyword}}
                                            </span>
                                        </div>
                                        <div class="info-list-footer">
                                            <i class="info-list-footer-time iconfont icon-shijian"></i>
                                            <span>{{item.articleUpdatetime}}</span>
                                        </div>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </mu-load-more>
                </div>

            </div>
        </div>
        <!-- <toTop></toTop> -->
    </div>
</template>
<script>
export default {
    // components: {
    //     morecharacter,

    //     toTop
    // },
    data() {
        return {
            loadingText: "加载中....",
            refreshing: false,
            loading: false,
            allLoaded: false,
            subCategoryList: [],
            resultMaps: [],
            active: 30,
            pageIndex: 1,
            pageSize: 20,
            isShow: "",
            isFade: {
                display: "none"
            },
            actImgDefault:
                'this.src="' +
                require("@/assets/images/默认图_首页资讯.jpg") +
                '"'
        };
    },
    created() {
        // this.addSize();
        this.clickItem(30);
    },
    methods: {
        async clickItem(addSize, categoryName) {
            // let url = "http://lian2345.com";
            this.loadingText = "加载中...";

            let _this = this;
            this.active = addSize;
            // console.log(this.active);
            this.pageSize = 20;
            this.isShow = "";
            this.isFade = { display: "none" };

            this.$axios
                .get(`/web/topic/person/more`, {
                    params: { pageIndex: 1, pageSize: 20 }
                })
                .then(function(res) {
                    // console.log(res);
                    _this.subCategoryList = res.data.subCategoryList;
                    _this.resultMaps = res.data.resultMaps;
                });
            // _czc.push(["_trackEvent", "人物列表", "切换列表", categoryName]);
        },
        refresh() {
            // this.active=this.$route.query
            this.refreshing = true;
            this.$refs.container.scrollTop = 0;
            setTimeout(() => {
                this.refreshing = false;
                this.clickItem(this.active);
            }, 1000);
        },
        load() {
            // const url = "http://www.lian2345.com";
            this.loading = true;
            this.pageSize += 20;
            setTimeout(() => {
                const _this = this;
                this.loading = false;
                {
                    this.$axios
                        .get(`/web/topic/person/more`, {
                            params: { pageIndex: 1, pageSize: _this.pageSize }
                        })
                        .then(function(res) {
                            // console.log(res);
                            _this.subCategoryList = res.data.subCategoryList;
                            _this.resultMaps = res.data.resultMaps;
                            if (
                                _this.resultMaps[_this.active].totalElements <
                                _this.pageSize
                            ) {
                                _this.loading = false;
                                _this.loadingText = "我是有底线的";
                            }
                        });
                }
            }, 1000);
        }
    }
};
</script>

<style >
.character .char {
    width: 100%;
    height: 1.5rem;
}
.character nav {
    position: fixed;
    top: 1.5rem;
    z-index: 99;
    background-color: #fff;
    /* display: flex; */
    width: 100%;
    height: 1.5rem;
    /* font-size: 1rem; */
    color: #404040;
    display: block;
    line-height: 1.5rem;

    cursor: pointer;
    /* text-align: left; */
    border-bottom: 1px solid #f2f2f2;
    /* box-shadow: 0px 2px 2px 0px #ccc; */
}

.character nav > a {
    height: 100%;
    /* background-color: #fff; */
    display: inline-block;
    vertical-align: top;
    width: 50%;
    text-align: center;
    color: #404040;
    text-decoration: unset;
    font-size: 0.45rem;
    /* color: #404040; */
    margin: 0;
}
.character .loop > a {
    display: block;
    width: 100%;
    height: 100%;
    display: flex;
    text-decoration: unset;
}
.character .info-describe-title {
    /* display: inline-block; */
    text-decoration: unset;
    /* vertical-align: top; */
}

.character nav a.active {
    /* font-weight: bold;     */
    color: #f25a36;
    border-bottom: #f25a36 solid 2px;
}

.character {
    /* margin: 0px auto; */
    width: 100%;
    text-align: center;
    margin: auto;
}

.character .footerlist {
    text-align: left;
    width: 100%;
    margin: 0px auto;
}

.character .info-list .loop {
    display: flex;
    width: 100%;
    margin-top: 0.3rem;
    height: 2.426667rem;
    padding: 0.21333rem 0.4rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-shadow: 0px 4px 6px rgb(117, 117, 117, 0.3);
}

.character .info-list .loop:hover {
    background-color: #f8f8f8;
}

.character .info-img {
    display: inline-block;
    width: 3.46667rem;
    position: relative;
    height: 100%;
}
.character .info-list-img {
    /* width: 16.5rem;
    height: 9.375rem; */
    width: 100%;
    height: 2rem;
    border-radius: 8px;
}

.character .info-img .info-img-one {
    display: block;
    width: 0.9rem;
    height: 0.37333rem;
    border-radius: 8px;
    position: absolute;
    bottom: 0.1rem;
    left: 0.1rem;
    background-color: #000;
    opacity: 0.5;
    text-align: center;
    line-height: 0.42rem;
    font-size: 0.32rem;
    color: #fff;
}

.character .info-describe {
    /* padding: 0 0.426667rem; */
    padding-left: 0.4rem;
    /* padding: 0.2133rem 0.4rem; */
    flex: 1;
    /* margin-left: 20px; */
    position: relative;
    right: 0;
    text-decoration: unset;
    display: inline-block;
    /* width: 504px; */
    vertical-align: top;
}

.character .info-describe-content {
    /* margin-top: 5px; */
    /* font-weight: bold; */
    display: block;
    color: #404040;
    font-size: 0.4rem;
    line-height: 0.53rem;
    text-align: none;
    cursor: pointer;
    height: 1rem;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
}
.character .info-list-footer {
    position: absolute;
    bottom: 0;
}
.character .info-list-footer > span {
    font-size: 0.32rem;
    color: #a6a6a6;
    display: inline-block;
    /* margin-right: 42px; */
}

.character .info-list-footer i {
    display: inline-block;
    /* margin-right: 0.16rem; */
    font-size: 0.32rem;
    color: #a6a6a6;
}
.mu-infinite-scroll-text {
    font-size: 0.4rem;
}
</style>
