<template>
    <div id="app">
        <div class="apphead"></div>
        <!-- 头部菜单 -->
        <header v-if="iconShow===1" class="headerone">
            <div>
                <img class="logo1" src="@/assets/images/logo.png" alt="logo">
            </div>
            <div @click.stop.prevent="clickItem2('/')" class="mainindex">
                <i class="appicon iconfont icon-unorderedlist"></i>
            </div>
        </header>
        <header v-if="isShow===1" class="headerone">
            <div>
                <img class="logo1" src="@/assets/images/logo.png" alt="logo">
            </div>
        </header>
        <!-- 头部首页 -->
        <header v-if="iconShow===2" class="headertwo">
            <div>
                <img class="logo1" src="@/assets/images/logo.png" alt="logo">
            </div>
            <div class="search">
                <form action="javascript:return true;">
                    <input id="searchInput" type="search" name="search" class="input" autocomplete="off" placeholder="请输入搜索内容" ref="input1" v-model="searchText" @keyup.13="clickItem1(0)">
                </form>
                <span id="iconSearch" class="iconfont icon-fangdajing" @click.stop.prevent="clickItem1(0)"></span>
            </div>
            <div @click.stop.prevent="clickItem3()" class="mainindex1">
                <i class="appicon iconfont icon-unorderedlist"></i>
            </div>
        </header>
        <!-- 头部详情页 -->
        <header v-if="iconShow===3" class="headerthree">
            <div class="article" v-show="article ===1">
                <span>文章详情</span>
                <i @click.stop.prevent="clickItem()" class="appicon iconfont icon-left"></i>
            </div>
            <div class="article" v-show="article ===2">
                <span>币种详情</span>
                <i @click.stop.prevent="clickItem()" class="appicon iconfont icon-left"></i>
            </div>
        </header>

        <router-view/>
    </div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            isShow: 0,
            searchText: "",
            isFalseone: {},
            iconShow: 2,
            article: 1,
            screenWidth: document.body.clientWidth
        };
    },
    created() {
        this.setCookie();
        this.myTouchMove();
        // this.getSize();
        // this.PCorWaps();
    },
    methods: {
        PCorWaps() {
            if (
                /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(
                    navigator.userAgent
                )
            ) {
                //wap
                console.log(1111);
                // window.location.href = "http://192.168.1.242/#/";
                window.location.href = "http://m.lian2345.com/#/";
            } else {
                //pc
                window.location.href = "http://www.lian2345.com";
            }
        },
        setCookie(c_name, c_pwd, exdays) {
            // var exdate = new Date(); //获取时间
            // exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
            //字符串拼接cookie
            window.document.cookie = "userName" + "=" + "kplkpl";
            window.document.cookie = "userPwd" + "=telephoneClient";
        },

        myTouchMove: function(evt) {
            document.activeElement.blur();

            let me = this;
            let oriWinHeight = window.innerHeight;
            window.onresize = function() {
                me.isKeybordAvail = true;
                let newHeight = window.innerHeight;

                // 阀值大于140判断为键盘收起
                if (newHeight - oriWinHeight > 140) {
                    me.oprNum("input");
                }
                oriWinHeight = newHeight;
            };
        },
        clickItem() {
            this.$router.back(-1);
        },
        clickItem1() {
            this.$refs.input1.blur();
            this.$router.push({
                path: "/searchDetails",
                query: {
                    searchText: this.searchText
                }
            });
        },
        clickItem2(actions) {
            this.$router.push({
                path: "/"
            });
        },
        clickItem3(actions) {
            console.log(this.$route.path);
            this.$router.push({
                path: "/info"
            });
        }
    },
    mounted() {
        const that = this;
        (window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
                // console.log(that.screenWidth)
                let htmlDom = document.getElementsByTagName("html")[0];
                if (that.screenWidth > 750) {
                    that.screenWidth = 750;
                }
                //设置根元素字体大小
                htmlDom.style.fontSize = that.screenWidth / 10 + "px";
                // console.log(htmlDom.style.fontSize)
            })();
        }),
            window.addEventListener("touchmove", this.myTouchMove);
    },
    watch: {
        $route(to, from) {
            // console.log(to.path);
            if (to.path === "/info") {
                console.log("ok");
                this.iconShow = 1;
                // this.isFalseone={
                //   color:'#f25a36'
                // }
            } else if (to.path === "/quotationDetails") {
                this.iconShow = 3;
                this.article = 2;
                // this.iconLeft = 1;
            } else if (to.path === "/articleDetails") {
                this.iconShow = 3;
                this.article = 1;
                // this.iconLeft = 1;
            } else if (to.path == "/serverce") {
                this.isShow = 1;
            } else {
                this.iconShow = 2;
            }
        },
        screenWidth(val) {
            let htmlWidth = val;
        }
    }
};
</script>

<style>
body {
    /* font-family: arial; */
}
#app .apphead {
    height: 1.5rem;
    width: 100%;
}
#app .mainindex1 {
    position: absolute;
    right: 0.3rem;
    top: 0.2rem;
    /* margin-top: -0.4rem; */
    text-align: center;
    /* margin-left: 0.5333rem; */
    color: #747474;
}
#app .mainindex {
    position: absolute;
    right: 0.3rem;
    top: 0.2rem;
    text-align: center;
    margin-left: 0.5333rem;
    color: #747474;
}
#app .mainindex i {
    color: #f25a36;
    font-size: 0.8rem;
}

#app .mainindex1 i {
    color: #747474;
    font-size: 0.8rem;
}
#app header {
    top: 0;
    background-color: #fff;
    position: fixed;
    width: 100%;
    height: 1.5rem;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    z-index: 99;
}

#app header.active1 {
    position: absolute;
    background-color: #fff;
    position: fixed;
    top: 0;
}

#app .logo1 {
    width: 3.7rem;
    position: absolute;
    left: 0.3rem;
    top: 0.4rem;
    /* margin-left: -1.825rem; */
    /* margin-top: -0.27rem; */
}
#app .logo {
    width: 2.65rem;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -1.825rem;
    margin-top: -0.27rem;
}

#app .logo:hover {
    cursor: pointer;
}

#app div.search {
    /* position: absolute; */
    box-sizing: border-box;
    position: absolute;
    /* float: right; */
    top: 0.43rem;
    /* margin-right: 0.8rem;
     */
    right: 1.5rem;
    width: 4rem;
    border: 1px solid #f7f7f8;
    height: 0.745rem;
    border-radius: 0.745rem;
}
#app div.search input {
    border: 0; /* 方法1 */
    -webkit-appearance: none; /* 方法2 */
    background-color: #f7f7f8;
    width: 100%;
    height: 0.74667rem;
    font-size: 0.38rem;
    border-radius: 0.875rem;

    outline: none;

    vertical-align: top;
    padding-left: 0.8rem;
    box-sizing: border-box;
}
#app div.search span {
    font-size: 0.48rem;
    position: absolute;
    top: 0.05rem;
    left: 0.213333rem;
}

#app .headerthree {
    position: fixed;
}
#app .headerthree i {
    position: absolute;
    font-size: 0.7rem;
    left: 0.3rem;
    top: 0.57rem;
}
#app .article {
    padding: 0 2rem;
    width: 100%;
    height: 100%;
    line-height: 100%;
    text-align: center;
}
#app .article span {
    font-size: 18px;
    font-weight: 500;
    display: inline-block;
    width: 100%;
    height: 100%;
    font-weight: bold;
    line-height: 1.5rem;
    text-align: center;
}
input[type="search"]::-webkit-search-cancel-button {
    display: none;
}
</style>
