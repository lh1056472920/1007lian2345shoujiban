<template>
    <div>
        <div id="box">
            <div id="studyEff" style="width: 300px;height:500px;"></div>
            <div id="act"></div>
        </div>
        <div id="mask" style="width: 100%;height:100%;">
            <div id="mask-header">
                <button>退出</button>
            </div>
            <div id="mask-body"></div>
            <div id="left">
                <img src="@/assets/images/banner.jpg">
            </div>
            <div id="right">
                <img src="@/assets/images/coin.png">
            </div>
        </div>
    </div>
</template>
<script>
// <script></script>
export default {
    methods{
         $("#mask-body").width($(document.body).width() - 100);
    $("#mask-header").width($(document.body).width() - 100);
    $("#mask-header>button").click(function () {
        $("#mask").css('display', "none");
    });
    //调用mychart_eight将图显示在#studyEff上
    mychart_eight("studyEff", ['海滨中学', '深圳实验中学', '深圳市文龙学校', '深圳中学', '深圳市兴泰实验学校', '深圳市坪西学校', '深圳市华城学校', '深圳中学初中部',
        '深圳市旱塘学校', '深圳高级中学初中部'
    ], [85, 88, 75, 71, 88, 90, 72, 81, 82, 73], '学习效率统计', "学习效率");
    //调用mychart_five将图显示在#act上
    mychart_five("act");
        };

    }
           mychart_eight(id, data1, data2, title, barName) {
                var first = echarts.init(document.getElementById(id));
                var option_second = {
                    title: {
                        text: title,
                        x: 'left',
                        y: 'top'
                    },
                    tooltip: {
                        formatter: "平均学习效率  ：81分"
                    },
        
                    legend: {
                        show: true,
                        x: 'center',
                        y: 'top',
                        data: [barName]
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            dataZoom: {
                                show: true
                            },
                            restore: {
                                show: true
                            },
                            dataView: {
                                show: true,
                                readOnly: true
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            saveAsImage: {
                                show: true
                            },
                            myTool2: {
                                show: true,
                                title: '全屏显示',
                                icon: 'image://img/fullscreen.png',
                                onclick: function () {
                                    $("#mask").css("display", "block");
                                    mychart_eight("mask-body", data1, data2, title, barName);
                                }
                            }
                        }
                    },
                    calculable: true,
                    xAxis: [{
                        type: 'category',
                        axisLabel: {
                            interval: 0,
                            rotate: -10
        
                        },
                        data: data1
                    }],
                    yAxis: [{
                        show: true,
                        type: 'value',
                        splitArea: {
                            show: true
                        }
                    }],
                    series: [{
                        name: barName,
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#83bff6'
                                        },
                                        {
                                            offset: 0.5,
                                            color: '#188df0'
                                        },
                                        {
                                            offset: 1,
                                            color: '#188df0'
                                        }
                                    ]
                                )
                            },
                            emphasis: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [{
                                            offset: 0,
                                            color: '#2378f7'
                                        },
                                        {
                                            offset: 0.7,
                                            color: '#2378f7'
                                        },
                                        {
                                            offset: 1,
                                            color: '#83bff6'
                                        }
                                    ]
                                )
                            }
                        },
                        data: data2,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: "black"
                                }
                            }
                        },
                        markLine: {
                            data: [{
                                type: 'average',
                                name: "平均线"
                            }],
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: "black"
                                    }
                                }
                            }
                        }
                    }]
                };
                first.setOption(option_second);
                first.on("click", function (params) {
                    console.log(params)
                })
            };
         mychart_five(id, maskBody) {
            var five = echarts.init(document.getElementById(id));
            var option_five = {
                title: {
                    text: "活动分类",
                    x: 'left',
                    y: 'top'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    x: '10',
                    y: "50",
                    data: ['优酷', '爱奇艺', '视频', '休闲', '学习', '游戏', '购物', '阅读', 'WPS', '有道词典', '百度搜索', '其他']
                },
                toolbox: {
                    //显示策略，可选为：true（显示） | false（隐藏），默认值为false  
                    show: true,
                    //启用功能，目前支持feature，工具箱自定义功能回调处理  
                    feature: {
                        //数据视图，打开数据视图，可设置更多属性,readOnly 默认数据视图为只读(即值为true)，可指定readOnly为false打开编辑功能  
                        dataView: {
                            show: true,
                            readOnly: true
                        },
    
                        //saveAsImage，保存图片（IE8-不支持）,图片类型默认为'png'  
                        saveAsImage: {
                            show: true
                        },
                        myTool2: {
                            show: true,
                            title: '全屏显示',
                            icon: 'image://img/fullscreen.png',
                            onclick: function () {
                                $("#mask").css("display", "block");
                                $("body").css("overflow-y", "hidden");
                                mychart_five("mask-body");
                            }
                        }
                    }
                },
                series: [{
                        name: '大分类',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],
    
                        label: {
                            normal: {
                                position: 'inner'
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{
                                value: 335,
                                name: '视频',
                                selected: true
                            },
                            {
                                value: 679,
                                name: '休闲'
                            },
                            {
                                value: 1548,
                                name: '学习'
                            }
                        ]
                    },
                    {
                        name: '小分类',
                        type: 'pie',
                        radius: ['40%', '55%'],
                        data: [{
                                value: 165,
                                name: '优酷'
                            },
                            {
                                value: 170,
                                name: '爱奇艺'
                            },
                            {
                                value: 310,
                                name: '游戏'
                            },
                            {
                                value: 234,
                                name: '购物'
                            },
                            {
                                value: 135,
                                name: '阅读'
                            },
                            {
                                value: 1048,
                                name: 'WPS'
                            },
                            {
                                value: 251,
                                name: '有道词典'
                            },
                            {
                                value: 147,
                                name: '百度搜索'
                            },
                            {
                                value: 102,
                                name: '其他'
                            }
                        ]
                    }
                ]
            };
            five.setOption(option_five);
            five.on("click", function (params) {
                console.log(params);
            });
    
            five.on('legendselectchanged', function (params) {
                console.log(params);
                if (params.name == "视频") {
                    console.log(five.getOption());
                    var _fiveOption = five.getOption();
                    _fiveOption.legend[0].selected.优酷 = _fiveOption.legend[0].selected.视频;
                    _fiveOption.legend[0].selected.爱奇艺 = _fiveOption.legend[0].selected.视频;
                    console.log(_fiveOption);
                    five.setOption(_fiveOption);
                }
            });
            if (maskBody) {
                mask = five;
            }
      //这是设置全屏的宽高随屏幕的不同宽度而变化
   


}
</script>
