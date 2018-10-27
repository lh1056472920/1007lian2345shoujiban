<template>

    <div>
        <div class="center">
            <div class="icon">
                <div class="icon-404"><img class="l-4" src="@/assets/images/l-4.png"><img class="coin" src="@/assets/images/coin.png"><img class="r-4" src="@/assets/images/r-4.png"></div>
            </div>
            <h2 class="info-404">遇到错误了！请返回</h2>
            <p class="text-404">您要查看的网站可能已被删除、或名称已更改，或者暂时不可用，请点击
                <a href="http://www.lian2345.com">www.lian2345.com</a>继续浏览</p>
            <h5 class="back" onclick="window.history.go(-1)">返回上一级</h5>
        </div>
        <!-- <script type="text/javascript" src="@/assets/js/flexible.js"></script> -->
    </div>

</template>
<style type="text/css">
* {
    padding: 0;
    margin: 0;
    font-family: "微软雅黑", Arial;
}
.center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
 .center .icon {
    width: 100%;
}
 .center .icon-404 {
    width: 3.958333rem;
    margin: 0 auto 0.5625rem;
}
 .center .l-4,
 .center .r-4 {
    width: 0.927083rem;
    height: 1.494792rem;
}
 .center .coin {
    width: 1.255208rem;
    height: 1.317708rem;
    margin: 0 0.416667rem;
    animation: jump 0.8s ease infinite;
}
 .center .info-404 {
    margin-bottom: 0.21875rem;
    text-align: center;
    font-size: 0.286458rem;
    color: #212121;
}
 .center .text-404 {
    width: 8.333333rem;
    text-align: center;
    color: #7f7f7f;
    font-size: 0.15625rem;
}
 .center .text-404 a {
    margin: 0 0.020833rem;
    text-decoration: none;
    color: #219eeb;
}
 .center .back {
    margin-top: 0.53125rem;
    text-align: center;
    color: #219eeb;
    font-size: 0.15625rem;
    cursor: pointer;
}
@keyframes jump {
    0% {
        transform: translateY(-50px);
        -webkit-transform: translateY(-50px);
    }
    50% {
        transform: translateY(0);
        -webkit-transform: translateY(0);
    }
    100% {
        transform: translateY(-50px);
        -webkit-transform: translateY(-50px);
    }
}
</style>
<script>
</script>