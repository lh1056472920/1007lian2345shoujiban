<template>
  <div class="quotation">
    <div class="quotable"></div>
    <table>
      <thead>
        <tr>
          <th>币种</th>
          <th>
            <!-- <div @click="clicksort(order)" :class="{active1:active1==='one'||active1==='two'}"> -->
              价格
              <!-- <i :class="(order)=='one'?'one':''"></i>
              <i :class="(order)=='two'?'two':''"></i>
            </div> -->
          </th>
          <th>
            <!-- <div @click="clicksort(order2)" :class="{active1:active1==='one2'||active1==='two2'}"> -->
              成交额(24h)
              <!-- <i :class="(order2)=='one2'?'one2':''"></i>
              <i :class="(order2)=='two2'?'two2':''"></i>
            </div> -->
          </th>
          <th>
            <!-- <div @click="clicksort(order1)" :class="{active1:active1==='one1'||active1==='two1'}"> -->
              涨跌幅(24h)
              <!-- <i :class="(order1)=='one1'?'one1':''"></i>
              <i :class="(order1)=='two1'?'two1':''"></i>
            </div> -->
          </th>
        </tr>
      </thead>
      <div class="footerlist demo-loadmore-wrap" :z-depth="1">
        <div ref="container" class="demo-loadmore-content">
          <mu-load-more @refresh="refresh" :refreshing="refreshing" :loading="loading" @load="load">
            <tbody>
              <tr v-if="currentList" @click="toCoinDetail(item.name,item.code)" v-for="(item, i) in currentList" :key="i">
                <!-- <td>{{item.rank}}</td> -->
                <td class="currency">
                  {{item.name}}/{{item.name_}}

                </td>
                <td v-if="item.change_percent>=0" style="color:#1fbf88;">￥{{item.current_price}}</td>
                <td v-if="item.change_percent<0" style="color:red;">￥{{item.current_price}}</td>

                <td>￥{{price(item)}}</td>
                <td v-if="item.change_percent>=0">
                  <div style="background-color:#1fbf88;" class="btn">+{{item.change_percent}}%</div>
                </td>
                <td v-if="item.change_percent<0">
                  <div style="background-color:#ED5659;" class="btn">{{item.change_percent}}%</div>
                </td>
              </tr>
            </tbody>
          </mu-load-more>
        </div>
        <!-- <div class="btn-one">
          <p :style="isFade" class="deadLineText">我是有底线的</p>
        </div> -->
      </div>
    </table>
  </div>
  <!-- <noMsg :list="currentList"></noMsg> -->
  <!-- </div> -->
</template>

<script>
// import axios from "~/plugins/axios.js";
// import quotationList from "~/components/quotation/quotationList.vue";
// import toTop from "~/components/video/toTop.vue";
// import noMsg from "~/components/noMsg/noMsg.vue";
// import { Pagination } from "element-ui";
import Vue from "vue";
let quotationListTime;
export default {
    //     components: {
    //         quotationList,
    //         toTop,
    //         Pagination,
    //         noMsg
    //     },
    data() {
        return {
            // isFalse: {},
            // searchText: "",
            // pageSize: 100,
            // total: 1230,
            // current: 1,
            page: 1,
            refreshing: false,
            loading: false,
            coin: "CNY",
            order: "one",
            order0: "one0",
            order1: "one1",
            order2: "one2",
            order3: "one3",
            order4: "ascend",
            active: "",
            active1: "one0",
            // currentList1: [],
            // dataone: [1, 2],
            currentList: []
        };
    },
    created() {
        this.getCoinInfo();
    },
    
    methods: {
        getCoinInfo() {
            // let url = "http://www.lian2345.com";
            let _this = this;
            this.$axios
                .post(`/market/api/marketAll`, "type=bitcoin&page=1")
                .then(function(res) {
                    console.log(res);
                    _this.currentList = res.data;
                });
        },
        price(item) {
            if (item.vol > 9999999) {
                return (item.vol / 10000).toFixed(0) + "万";
            } else if (item.vol > 9999) {
                return (item.vol / 10000).toFixed(2) + "万";
            } else {
                return item.vol.toFixed(2);
            }
        },
        toCoinDetail(actions, code) {
            this.$router.push({
                path: "/quotationDetails",
                query: {
                    name: actions,
                    code: code
                }
            });
        },
        refresh() {
            // this.active=this.$route.query
            this.refreshing = true;
            this.$refs.container.scrollTop = 0;
            setTimeout(() => {
                this.refreshing = false;
                this.getCoinInfo();
            }, 1000);
        },
        load() {
            // const url = "http://www.lian2345.com";
            this.page += 1;
            // const _this = this;
            // const numl = [];
            this.loading = true;
            setTimeout(() => {
                this.loading = false;

                // let url = "http://www.lian2345.com";
                let _this = this;
                this.$axios
                    .post(
                        `/market/api/marketAll`,
                        `type=bitcoin&page=${_this.page}`
                    )
                    .then(function(res) {
                      // console.log(res);
                      
                      _this.currentList = _this.currentList.concat(res.data);
                        // console.log( _this.currentList);
                    });
            }, 1000);
        }
    }
};
</script>

<style >
.quotation .quotable{
    width: 100%;
    height: 0.8rem;
}
.quotation {
    width: 100%;
}
.quotation table {
    margin: 0;
    padding: 0;
    width: 100%;
    border-spacing: 0;
    
}
.quotation table .footerlist {
    width: 100%;
}
.quotation table thead {
    height:.74667rem ;
    background-color: #fff;
    top: 1.5rem;
    position: fixed;
    z-index: 99;
    border-spacing: 0;
    display: inline-block;
    width: 100%;
    /* height: 100%; */
    /* box-shadow: 0px 4px 6px 0px rgba(117,117,117,.3); */
}
.quotation table thead tr {
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 0;
}
.quotation table thead tr th {
    vertical-align: top;
    height: 100%;
    padding: 0;
    display: inline-block;
    text-align: center;
    color: #404040;
    font-size: 0.38rem;
    height: 0.74667rem;
    width: 25%;
    font-size: 0.40rem;
    font-weight: 400;
    line-height: 0.74667rem;
}
.quotation table thead tr th div {
    height: 100%;
}
.quotation table tbody tr {
    display: inline-block;
    width: 100%;
    height: 1.5rem;
    font-size: 0;
}

.quotation table tbody tr td {
    display: inline-block;

    box-sizing: border-box;
    padding: 0;
    /* padding-left: 0.214rem; */
    text-align: left;
    color: #404040;
    font-size: 0.38rem;
    width: 25%;
    font-weight: 400;
    height: 1.5rem;
    line-height: 1.5rem;
    /* line-height: 2.5rem; */
    border-bottom: 1px solid #f2f2ff;
}
.quotation table tbody tr td:nth-child(1){
    padding-left: 0.35rem;
    width: 30%;
    overflow: hidden;
}
.quotation table tbody tr td:nth-child(2){
    width: 20%;
}
/* .quotation table tbody tr td:nth-child(3){
    width: 20%;
} */
.quotation table tbody tr td .btn {
    /* background-color: #1FBF88; */
    border-radius: 4px;
    width: 60%;
    height: 0.8rem;
    margin: 0 auto;
    margin-top: 0.35rem;
    text-align: center;
    line-height: 0.8rem;
    color: #fff;
    overflow: hidden;
}
</style>
