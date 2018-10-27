<template>
    <div>
        <!-- 币种详情 -->
        <div class="quotationDetails">
            <!-- <div id='mask' class="anniu"></div> -->
            <div class="coin">
                <div>
                    <p>{{basicInfoList.name}}/{{basicInfoList.chinese_name}}</p>
                    <span>{{basicInfoContent.keyshort}}</span>
                </div>
            </div>
            <div class="charts" id="charts">
                <div class="duration">
                    <a href="javascript:void(0);" :class="{active: active==='d'}" @click.stop.prevent="clickItem('d')">天</a>
                    <a href="javascript:void(0);" :class="{active: active==='w'}" @click.stop.prevent="clickItem('w')">周</a>
                    <a href="javascript:void(0);" :class="{active: active==='m'}" @click.stop.prevent="clickItem('m')">1月</a>
                    <a href="javascript:void(0);" :class="{active: active==='y'}" @click.stop.prevent="clickItem('y')">1年</a>
                    <a href="javascript:void(0);" :class="{active: active==='all'}" @click.stop.prevent="clickItem('all')">所有</a>
                </div>
                <p>价格(美元):
                    <span>{{basicInfo.current_price_usd}}</span>&nbsp;&nbsp;成交量(24h):
                    <span>{{price(basicInfo.volum_24h)}}</span>&nbsp;&nbsp;市值:￥
                    <span>{{price(basicInfo.market_value)}}</span>
                </p>
                <div id="coinEcharts" :style="isFalse">
                </div>
            </div>
            <div class="quoOne">
                <p>
                    <span class="point">官网：</span>
                    <a :href="basicInfoList.website" target="_blank" class="keycode">{{basicInfoList.website}}</a>
                </p>
                <p>
                    <span class="point">发行时间：</span>{{basicInfoList.issude_date}}</p>
                <p>
                    <span class="point">项目概念：</span>{{basicInfoList.related_notion}}</p>
                <p>
                    <span class="point">白皮书：</span>
                    <a :href="basicInfoList.white_paper" target="_blank" class="keycode">{{basicInfoList.white_paper}}</a>
                </p>
                <p>
                    <span class="point">上架交易所：</span>{{basicInfoList.putaway_exchange}}</p>
            </div>
            <div class="quoTwo">
                <p>
                    <span class="point">流通市值：<br>
                    </span>￥ {{price(basicInfo.market_value)}}
                    <br>≈${{price(basicInfo.market_value/piceA)}}
                    <br>≈{{price(basicInfo.market_value/piceB)}}BTC
                </p>
                <p>
                    <span class="point">流通量：</span>{{price(basicInfo.vol)}} xrp</p>
                <p>
                    <span class="point">总发行量：</span>{{basicInfoContent.counts}}</p>
            </div>
        </div>
    </div>
</template>
<style>
.anniu {
    width: 20px;
    height: 20px;
    background-color: red;
}
/* header {
    box-shadow: 0px 2px 2px 0px #ccc;
} */
.quotationDetails {
    width: 100%;
}
.quotationDetails a {
    text-decoration: none;
    color: #404040;
}
.quotationDetails p {
    width: 95%;
    color: #404040;
    word-wrap: break-word;
}
.quotationDetails .coin {
    font-size: 0.32rem;
    width: 100%;
    box-shadow: 0px 2px 4px 0px #f2f2f2;
    padding: 0.26667rem 0.4rem;
    box-sizing: border-box;
}
.quotationDetails .coin p {
    margin: 0;
    padding: 0;
    color: #404040;
    font-size: 0.48rem;
    font-weight: 400;
    margin-bottom: 0.32rem;
}
.quotationDetails .coin span {
    margin: 0;
    padding: 0;
    color: #404040;
    font-size: 0.4rem;
    font-weight: 400;
}
.quotationDetails .charts {
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 0px #f2f2f2;
}
.quotationDetails .charts .duration {
    box-sizing: border-box;
    /* display: flex; */
    width: 100%;
    padding: 0.32rem 0.3rem 0 0.3rem;
    font-size: 0.32rem;
    height: 0.96rem;
}
.quotationDetails .charts p {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    margin-top: 0.48rem;
    padding-left: 0.4rem;
    font-size: 0.32rem;
}
.quotationDetails .charts p span {
    color: #f25a36;
}
.quotationDetails .charts .duration a {
    /* float: left; */
    margin-right: 0.16rem;
    font-size: 0.4rem;
    color: #595959;
    text-align: center;
    line-height: 0.64rem;
    display: inline-block;
    vertical-align: top;
    width: 1.4rem;
    height: 0.64rem;
    border-radius: 0.32rem;
    background-color: #f2f2f2;
    /* overflow: hidden; */
}
.quotationDetails .charts .duration a:last-child {
    margin: 0;
}
.quotationDetails .charts .duration a.active {
    background-color: #f25a36;
    color: #fff;
}
.quotationDetails .quoOne {
    font-size: 0.4rem;
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
    box-shadow: 0px 2px 4px 0px #f2f2f2;
    overflow: hidden;
}
.quotationDetails .quoOne p {
    width: 100%;
    margin: 0;
    margin-bottom: 0.4rem;
}
.quotationDetails .quoOne p:last-child {
    margin-bottom: 0;
}

.quotationDetails .quoTwo {
    font-size: 0.4rem;
    width: 100%;
    padding: 0.4rem;
    box-sizing: border-box;
}
.quotationDetails span.point {
    font-weight: bold;
}
.quotationDetails > .charts > #coinEcharts {
    width: 100%;
    height: 10rem;
}
/* 网站地址颜色 */
.quotationDetails .keycode {
    color: #f25a36;
}
</style>

<script>
import echarts from "echarts";
export default {
    name: "chart",
    data() {
        return {
            width: 0,
            isFalse: {},
            piceA: 0,
            piceB: 0,
            active: "all",
            date: [],
            BTCPrice: [],
            dollarPrice: [],
            circulationMarketValue: [],
            tradingVolume: [],
            basicInfoList: [],
            dollarPrice: [],
            basicInfoContent: [],
            basicInfo: [],
            diagramList: [],
            actImgDefault:
                'this.src="' +
                require("@/assets/images/默认图_首页_热门项目.jpg") +
                '"'
            // coinName1:'',
        };
    },
    created() {
        window.parent.scrollTo(0, 0);
    },
    mounted() {
        this.clickItem("all");
    },
    watch: {},
    methods: {
        clickItem(active) {
            let _this = this;

            this.date = [];
            this.BTCPrice = [];
            this.dollarPrice = [];
            this.circulationMarketValue = [];
            this.tradingVolume = [];
            this.active = active;
            this.$axios
                .post(
                    `/market/api/marketAll/diagram?name=${
                        this.$route.query.name
                    }&code=${this.$route.query.code}&type=${this.active}`
                )
                .then(function(res) {
                    // console.log(res);

                    _this.diagramList = res.data;
                    _this.drawChart();
                });

            this.$axios
                .post(
                    `/market/api/marketAll/allMarketIndexDetail?type=${
                        this.$route.query.name
                    }`
                )
                .then(function(res) {
                    // console.log(res);
                    _this.basicInfo = res.data.data[0];
                });
            this.$axios
                .post(
                    `/market/api/marketAll/detail?name=${
                        this.$route.query.name
                    }&code=${this.$route.query.code}`
                )
                .then(function(res) {
                    // console.log(res);
                    _this.basicInfoList = res.data.detailInfo;
                    _this.basicInfoContent = res.data;
                });
            this.$axios
                .post(
                    `/market/api/marketAll/allMarketIndexDetail`,
                    `type=${_this.$route.query.name}`
                )
                .then(function(res) {
                    // console.log(res);
                    _this.piceA = res.data.usdt[0].current_price_cny;
                    _this.piceB = res.data.bitcoin[0].current_price_cny;
                });
            // this.diagramList = data;
            // console.log(111);

            // console.log(this.diagramList);
        },
        drawChart() {
            if (this.diagramList.diagram) {
                this.diagramList.diagram.value.forEach(item => {
                    // console.log(item[0]);
                    if (this.active === "d") {
                        this.date.push(
                            echarts.format.formatTime("hh:mm", item[0])
                        );
                        // console.log(this.data);
                    } else if (this.active === "w" || this.active === "m") {
                        this.date.push(
                            echarts.format.formatTime("MM-dd", item[0])
                        );
                    } else {
                        this.date.push(
                            echarts.format.formatTime("yyyy-MM", item[0])
                        );
                    }
                    this.BTCPrice.push(item[1]);
                    this.dollarPrice.push(item[2]);
                    this.circulationMarketValue.push(
                        parseInt(item[3] / 100000000)
                    );
                    this.tradingVolume.push(item[4]);
                });
            }
            let coinChart = echarts.init(
                document.getElementById("coinEcharts")
            );
            window.onresize = function() {
                coinChart.resize();
                // myChart1.resize(); //若有多个图表变动，可多写
            };
            coinChart.setOption(
                {
                    animation: false, //是否开启动画
                    legend: {
                        //图例组件，可通过点击图例控制哪些系列不显示
                        bottom: 10, //图裂位置
                        data: [
                            "流通市值(亿)",
                            "价格（美元）",
                            "价格（BTC）",
                            "24h成交量"
                        ] //图例数组
                    },
                    tooltip: {
                        //提示框组件
                        trigger: "axis", //坐标轴触发
                        axisPointer: {
                            type: "cross"
                        },
                        backgroundColor: "rgba(245, 245, 245, 0.8)",
                        borderWidth: 1,
                        borderColor: "#ccc",
                        padding: 10,
                        textStyle: {
                            fontSize: 12,
                            color: "#000"
                        },
                        // position: function(pos, params, el, elRect, size) {
                        //   var obj = { top: 10 };
                        //   obj[["left", "right"][+(pos[0] < size.viewSize[0] / 2)]] = 30;
                        //   return obj;
                        // },//不配置position 则默认随鼠标移动
                        extraCssText: "width: 170px"
                    },
                    axisPointer: {
                        //坐标轴指示器，全局设置
                        link: [
                            //不同轴的指示器设置联动
                            {
                                xAxisIndex: [0, 1]
                            }
                        ]
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                show: true
                            },
                            // restore: { show: true },
                            // dataView: { show: true, readOnly: true },
                            // magicType: { show: true, type: ["line", "bar"] },
                            // saveAsImage: { show: true },
                            myTool2: {
                                show: true,
                                title: "全屏显示",
                                icon: "image://img/fullscreen.png",
                                onclick: function() {
                                    console.log(1111);
                                    document.getElementById(
                                        "coinEcharts"
                                    ).style.width =
                                        "375px";
                                    document.getElementById(
                                        "coinEcharts"
                                    ).style.height =
                                        "667px";
                                    document.getElementById(
                                        "coinEcharts"
                                    ).style.position =
                                        "absolute";
                                    // $("#mask").css("display", "block");
                                    // drawChart();
                                    window.onresize = function() {
                                        coinChart.resize();
                                        // myChart1.resize(); //若有多个图表变动，可多写
                                    };
                                }
                            }
                        }
                    },
                    dataZoom: [
                        //区域缩放组件
                        {
                            type: "slider", //单独的滑动条
                            xAxisIndex: [0, 1],
                            realtime: false,
                            start: 10,
                            end: 90,
                            bottom: "26.5%",
                            height: "11%",
                            handleIcon:
                                "M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
                            handleSize: "30%"
                        },
                        {
                            type: "inside", //内置于坐标系中
                            xAxisIndex: [0, 1],
                            start: 40,
                            end: 70,
                            top: 10,
                            height: 10
                        }
                    ],

                    xAxis: [
                        {
                            type: "category",
                            data: this.date,
                            scale: true,
                            boundaryGap: false,
                            splitLine: { show: false },
                            axisLabel: { show: false }, //刻度标签
                            axisTick: { show: false }, //刻度
                            axisLine: {
                                lineStyle: { color: "#dcdcdc" }
                            },
                            splitNumber: 20,
                            min: "dataMin", //坐标刻度最小值
                            max: "dataMax",
                            axisPointer: {
                                type: "shadow",
                                label: { show: false },
                                triggerTooltip: true,
                                handle: {
                                    show: false,
                                    margin: 30,
                                    color: "#B80C00"
                                }
                            }
                        },
                        {
                            type: "category", //坐标轴类型 value  category time
                            gridIndex: 1,
                            data: this.date,
                            boundaryGap: false,
                            axisLine: { lineStyle: { color: "#777" } }, //轴线
                            axisLabel: {
                                color: "#777",
                                fontSize: 10
                                // formatter: function(value) {
                                //   return echarts.format.formatTime("MM-dd", value);
                                // }
                            },
                            axisTick: { show: false },
                            min: "dataMin",
                            max: "dataMax",
                            axisPointer: {
                                show: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: "流通市值(亿)",
                            nameLocation: "middle",
                            nameGap: -5,
                            scale: true,
                            splitNumber: 2,
                            splitLine: { show: false },
                            axisLine: {
                                show: false,
                                lineStyle: { color: "#f7931a" }
                            },
                            axisTick: { show: false },
                            axisLabel: {
                                inside: true,
                                formatter: "{value}\n"
                            },
                            // min: 0,
                            position: "left",
                            offset: 35
                        },
                        {
                            name: "价格（BTC）",
                            nameLocation: "middle",
                            nameGap: -5,
                            nameRotate: -90,
                            scale: true,
                            splitNumber: 2,
                            splitLine: { show: false },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "#ef232a"
                                }
                            },
                            axisTick: { show: false },
                            axisLabel: {
                                inside: true,
                                formatter: "{value}\n"
                                // position:'top',
                                // offset:40
                            },
                            // top:-10,
                            // min: 3,
                            position: "right",
                            offset: 1000
                            // position: "top",
                            // offset: 50,
                            // top:40,
                        },
                        {
                            name: "价格（美元）",
                            nameLocation: "middle",
                            nameGap: -5,
                            nameRotate: -90,
                            scale: true,
                            splitNumber: 2,
                            splitLine: { show: true },
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: "#009933"
                                }
                            },
                            axisTick: { show: false },
                            axisLabel: {
                                inside: true,
                                formatter: "{value}\n"
                            },
                            // min: 0,
                            position: "right",
                            offset: 50
                        },
                        {
                            name: "24h成交量",
                            nameLocation: "middle",
                            nameGap: 30,
                            nameTextStyle: {
                                color: "#777"
                            },
                            scale: true,
                            gridIndex: 1,
                            splitNumber: 2,
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "#dcdcdc"
                                }
                            },
                            axisLabel: { show: false },
                            axisTick: { show: false },
                            splitLine: { show: false }
                        }
                    ],
                    grid: [
                        {
                            left: "11.6%",
                            right: "25%",
                            top: "7.5%",
                            height: "38%"
                        },
                        {
                            left: "11.6%",
                            right: "25%",
                            height: "5.6%",
                            top: "49%"
                        }
                    ],
                    series: [
                        {
                            name: "24h成交量",
                            type: "bar",
                            data: this.tradingVolume,
                            xAxisIndex: 1,
                            yAxisIndex: 3,
                            itemStyle: {
                                normal: {
                                    color: "#777777"
                                },
                                emphasis: {
                                    color: "#140"
                                }
                            }
                        },
                        {
                            name: "流通市值(亿)",
                            type: "line",
                            data: this.circulationMarketValue,
                            // xAxisIndex: 1,
                            // yAxisIndex: 3,
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#f7931a",
                                    borderColor: "##f7931a",
                                    color0: "#f8a138",
                                    borderColor0: "#f8a138"
                                }
                            }
                        },
                        {
                            name: "价格（BTC）",
                            type: "line",
                            yAxisIndex: 1,
                            data: this.dollarPrice,
                            itemStyle: {
                                normal: {
                                    color: "#ef232a",
                                    color0: "#14b143",
                                    borderColor: "#ef232a",
                                    borderColor0: "#14b143"
                                }
                                // emphasis: {
                                //   color: "black",
                                //   color0: "#444",
                                //   borderColor: "black",
                                //   borderColor0: "#444"
                                // }
                            }
                        },
                        {
                            name: "价格（美元）",
                            type: "line",
                            yAxisIndex: 2,
                            data: this.BTCPrice,
                            smooth: true,
                            showSymbol: false,
                            lineStyle: {
                                normal: {
                                    width: 1
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: "#009933",
                                    borderColor: "#009933"
                                }
                            }
                            // position:'top',
                            // offset:40
                        }
                    ]
                    // opts: {
                    //     width: 800,
                    //     height: null / undefined / "auto",
                    //     silent: false,
                    // }
                }
                //  {
                //     width: null / undefined / "auto",
                //     height: null / undefined / "auto",
                //     silent: false
                // },
            );
        },
        price(item) {
            if (item > 99999999) {
                return `${Number(
                    (item / 100000000).toFixed(2)
                ).toLocaleString()}亿`;
            } else {
                return `${Number(
                    (item / 10000).toFixed(2)
                ).toLocaleString()}万`;
            }
        }
    }
};
</script>
