<template>
    <div class="info">
        <div class="left">
            <div class="leftNav"></div>
            <nav>
                <a :class="{active: active==0}" @click.stop.prevent="clickItem(0)">所有</a>
                <a v-for="item in subCategoryList" :key="item.categoryId" :class="{active: active==item.categoryId}" @click.stop.prevent="clickItem(item.categoryId)">{{item.categoryName}}</a>

            </nav>
            <div class="footerlist demo-loadmore-wrap" :z-depth="1">
                <div ref="container" class="demo-loadmore-content">
                    <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load" :loading-text='loadingText'>
                        <div class="info-list" v-show="active===0" v-for="(item) in allList2" :key="item.index">
                            <div class="loop">
                                <div class="info-img">
                                    <img class="info-list-img" :src="`${item.articleImage}`" :onerror="actImgDefault" alt="">
                                    <span class="info-img-one" v-if="item.categoryId==1">热门</span>
                                    <span class="info-img-one" v-if="item.categoryId==2">快讯</span>
                                    <span class="info-img-one" v-if="item.categoryId==3">行情</span>
                                    <span class="info-img-one" v-if="item.categoryId==4">政策</span>
                                    <span class="info-img-one" v-if="item.categoryId==5">人物</span>
                                    <span class="info-img-one" v-if="item.categoryId==6">百科</span>
                                    <span class="info-img-one" v-if="item.categoryId==7">矿业</span>
                                    <span class="info-img-one" v-if="item.categoryId==30||item.categoryId==31">人物</span>

                                </div>
                                <div class="info-describe">
                                    <router-link :to="{path:'/articleDetails',query: {id: item.articleId,active:0}}" class="info-describe-title">
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
                        <div class="info-list" v-show="active===item1.categoryId&&active!==2&&active!==0" v-for="(item1,index) in subCategoryList" :key="index">
                            <div class="loop" v-for="(item,i) in resultMaps" :key="i">
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
                                    <router-link :to="{path:'/articleDetails',query: {id: item.articleId,active:item1.categoryId}}" class="info-describe-title">
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

                        <messageTimeInfo v-show="active===2" :list='hotNows' :lists='numli'></messageTimeInfo>
                    </mu-load-more>
                </div>
            </div>
            <!-- <nuxt-child/> -->
        </div>
        <!-- <div>我是咨询页面</div> -->
    </div>
</template>

<script>
import Vue from "vue";
import messageTimeInfo from "@/componet/messageTimeInfo";
export default {
    components: {
        // toTop,
        messageTimeInfo
    },
    data() {
        return {
            loadingText: "加载中...",
            refreshing: false,
            loading: false,
            allLoaded: false,
            subCategoryList: [],
            resultMaps: [],
            active: 1,
            allList2: this.allList,
            pageIndex: 1,
            pageSize: 8,
            hotNows: [],
            sizeNum: 0,
            page: 1,
            isShow: "",
            isFade: {
                display: "none"
            },
            numli: [],
            arr1: [],
            actImgDefault:
                'this.src="' +
                require("@/assets/images/默认图_首页资讯.jpg") +
                '"'
        };
    },
    created() {},
    mounted() {
        this.getinfo();
        this.clickItem(0);
    },
    methods: {
        async getinfo() {
            const _this = this;
            this.$axios
                .get(`/web/articlemaps`, {
                    params: { pageIndex: 1, pageSize: 10 }
                })
                .then(function(data) {
                    _this.subCategoryList = data.data.subCategoryList;
                })
                .catch(function(err) {
                    console.log(err);
                });
            // this.subCategoryList=proson
            // console.log(1111);
            //     console.log(this.subCategoryList);
        },
        clickItem(active) {
            this.loadingText = "加载中...";

            // console.log(active);

            // const url = "http://www.lian2345.com";
            const _this = this;

            this.pageIndex = 1;
            this.active = active;
            this.pageSize = 8;
            this.isShow = "";
            this.isFade = { display: "none" };
            if (this.active === 2) {
                this.page = 1;
                // this.arrnum = 10;
                this.$axios
                    .post(`/market/api/marketAll/consult`, `page=${this.page}`)
                    .then(function(data) {
                        // console.log(data);
                        _this.hotNows = data.data.lives;
                    })
                    .catch(function(err) {
                        console.log(err);
                    });
            } else {
                if (this.active == 0) {
                    this.$axios
                        .get(`/web/articlemaps`)
                        .then(function(data) {
                            // console.log(data);
                            _this.allList2 = data.data.pageAllArticle.content;
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                    // this.allList2 = data1.data.pageAllArticle.content;
                } else {
                    this.$axios
                        .get(`/web/articlemaps?categoryId=${this.active}`)
                        .then(function(data) {
                            // console.log(data);
                            _this.resultMaps = data.data.data.content;
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                    // this.resultMaps = data1.data.data.content;
                }
            }
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
            const _this = this;
            const numl = [];
            this.loading = true;
            setTimeout(() => {
                this.loading = false;
                if (this.active === 2) {
                    this.page += 1;
                    // this.arrnum = 10;
                    this.$axios
                        .post(
                            `/market/api/marketAll/consult`,
                            `page=${this.page}`
                        )
                        .then(function(data) {
                            // console.log(data);
                            _this.hotNows = _this.hotNows.concat(
                                data.data.lives
                            );
                            for (let i = 0; i < data.data.lives.length; i++) {
                                _this.arr1.push(
                                    data.data.lives[i]["created_at"]
                                );
                            }
                            for (let j = 1; j < _this.arr1.length; j++) {
                                if (
                                    new Date(_this.arr1[j] * 1000).getDate() !=
                                    new Date(_this.arr1[j - 1] * 1000).getDate()
                                ) {
                                    // console.log(new Date(this.arr1[j] * 1000).getDate());
                                    numl.push(_this.arr1[j]);
                                }
                            }
                            // console.log(data);
                            let array = Array.from(new Set(numl));
                            _this.numli = array;
                            // console.log(this.hotNows);
                        })
                        .catch(function(err) {
                            console.log(err);
                        });
                } else {
                    if (this.active == 0) {
                        this.pageIndex += 1;
                        this.$axios
                            .get(`/web/articlemaps`, {
                                params: {
                                    pageIndex: _this.pageIndex,
                                    // pageSize: 10
                                }
                            })
                            .then(function(data) {
                                // console.log(data);
                                _this.allList2 = _this.allList2.concat(
                                    data.data.pageAllArticle.content
                                );
                                if (
                                    data.data.pageAllArticle.totalPages <
                                    _this.pageIndex
                                ) {
                                    _this.loading = true;
                                    _this.loadingText = "我是有底线的";
                                }
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                        // this.allList2 = data1.data.pageAllArticle.content;
                    } else {
                        this.pageIndex += 1;
                        console.log(this.pageIndex);
                        
                        this.$axios
                            .get(`/web/articlemaps?categoryId=${this.active}`, {
                                params: {
                                    pageIndex: _this.pageIndex,
                                    // pageSize: 20
                                }
                            })
                            .then(function(data) {
                                console.log(data);
                                _this.resultMaps = _this.resultMaps.concat(
                                    data.data.data.content
                                );
                                if (
                                    _this.active !== 2 &&
                                    data.data.data.totalPages < _this.pageIndex
                                ) {
                                    _this.loading = false;
                                    _this.loadingText = "我是有底线的";
                                }
                            })
                            .catch(function(err) {
                                console.log(err);
                            });
                    }
                }
            }, 1000);
        }
    }
};
</script>


<style>
.info .leftNav {
    width: 100%;
    height: 1.5rem;
}
.info nav {
    top: 1.5rem;
    z-index: 99;
    position: fixed;
    background-color: #fff;
    width: 100%;
    height: 1.5rem;
    font-size: 0.46rem;
    color: #404040;
    line-height: 1.5rem;
    /* border-top: 2px solid #f25a36; */
    cursor: pointer;
    text-align: left;
    border-bottom: 1px solid #f2f2f2;
    box-sizing: content-box;
    white-space: nowrap;
    overflow: scroll;
}
.info nav::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 4px;
}
.info nav a {
    margin-right: 0.4rem;
    z-index: 11;
    height: 1.3rem;
    /* padding: 0 0.34667rem; */
    color: #404040;
    text-decoration: unset;
    /* margin: 0; */
    display: inline-block;
    vertical-align: top;
    box-sizing: content-box;
}
.info nav a:nth-child(1) {
    margin-left: 0.3rem;
}
.info .info-describe-title {
    text-decoration: unset;
}
.info nav a:hover {
    color: #f25a36;
}

.info nav a.active {
    /* font-weight: bold; */
    color: #f25a36;
    border-bottom: #f25a36 solid 2px;
}

.info {
    width: 100%;
    text-align: center;
    margin: auto;
}

.info .left { 
    width: 100%;
}
.info .footerlist {
    text-align: left;
    width: 100%;
    margin: 0px auto;
}

.info .info-list {
    margin-bottom: 0.10667rem;
}

.info-list .loop {
    /* border: 1px solid red; */
    margin-top: 0.3rem;
    display: flex;
    width: 100%;
    height: 100%;
    padding: 0.2133rem 0.4rem;
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    /* box-shadow: 1px 3px 1px rgb(226, 226, 227); */
    box-shadow: 0px 4px 6px rgba(177, 177, 177, 0.3);
}

.info-list .loop:hover {
    background-color: #f8f8f8;
}

.info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.info-img {
    display: inline-block;
    position: relative;
    height: 100%;
}
.info-list-img {
    width: 3.4667rem;
    height: 2rem;
    border-radius: 0.213333rem;
}

.info-img .info-img-one {
    display: block;
    width: 0.9rem;
    height: 0.37333rem;
    border-radius: 8px;
    position: absolute;
    bottom: 0.23rem;
    left: 0.106667rem;
    background-color: #000;
    opacity: 0.5;
    text-align: center;
    line-height: 0.42rem;
    font-size: 0.32rem;
    color: #fff;
}

.info-describe {
    padding-left: 0.4rem;
    flex: 1;
    position: relative;
    right: 0;
    text-decoration: unset;
    display: inline-block;
    vertical-align: top;
}

.info-list .loop:hover {
    background-color: #f8f8f8;
}

.info-list .loop:hover .info-list-describe-title {
    color: #f25a36;
}

.info-list-describe-title {
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

.info-describe-content {
    /* font-weight: bold; */
    /* margin-top: 5px; */
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
.info-list-footer {
    height: 0.426667rem;
    position: absolute;
    bottom: 0.24rem;
}
.info-list-footer > span {
    /* font-size: 0.75rem; */
    font-size: 0.33rem;
    color: #a6a6a6;
    display: inline-block;
    vertical-align: top;
    /* margin-right: 42px; */
}

.info-list-footer i {
    display: inline-block;
    /* margin-right: 0.16rem; */

    font-size: 0.33rem;
    color: #a6a6a6;
    vertical-align: top;
}
.info .mu-circle-clipper .mu-circle {
    width: 100%;
}
.info .mu-circle-clipper.right .mu-circle {
    width: 0;
}
</style>
