<template>
    <div>
        <div class="category-nav-bar">
            <van-nav-bar title="商品列表"/>
        </div>
        <div class="category-layout">
            <van-row>
                <van-col :span="6">
                    <div class="category-left">
                        <ul>
                            <li
                                v-for="(item, idx) in categoryList"
                                :key="idx"
                                :class="{categoryActive:categoryIndex==idx}"
                                @click="clickCategory(idx, item.ID)"
                                >
                                {{item.MALL_CATEGORY_NAME}}
                            </li>
                        </ul>
                    </div>
                </van-col>
                <van-col :span="18">
                    <div class="tabCategorySub">
                        <van-tabs v-model="active" @click="onClickCategorySub">
                            <van-tab
                                v-for="(item, idx) in categorySubList"
                                :key="idx"
                                :title="item.MALL_SUB_NAME"
                                >
                            </van-tab>
                        </van-tabs>
                    </div>
                    <div class="list-div">
                        <van-pull-refresh
                            v-model="isRefresh"
                            @refresh="onRefresh"
                            >
                            <van-list
                                v-model="loading"
                                :finished="finished"
                                @load="onLoad"
                                >
                                <div class="item-list" v-for="(item, idx) in goodsList" :key="idx" @click="goGoodsDetail(item.ID)">
                                    <div class="item-list-img">
                                        <img :src="item.IMAGE1" width="100%" :onerror="errorPic">
                                    </div>
                                    <div class="item-list-text">
                                        <div>{{item.NAME}}</div>
                                        <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                                    </div>
                                </div>
                            </van-list>
                        </van-pull-refresh>
                    </div>
                </van-col>
            </van-row>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    import { toMoney } from '@/filter/moneyFilter.js'

    export default {
        data() {
            return {
                categoryList: [],
                categoryIndex: 0,
                categorySubList: [],
                categorySubId: '',
                page: 1,
                active: 0,
                goodsList: [], //商品列表
                loading: false,
                finished: false, //上拉刷新是否完成
                isRefresh: false, //下拉刷新是否完成
                errorPic: 'this.src="' + require('@/assets/images/errorPic.png') + '"'
            }
        },
        created() {
            this.axiosGetCategoryList()
        },
        mounted() {
            const winHeight = document.documentElement.clientHeight
            document.getElementsByClassName("category-left")[0].style.height = (winHeight -46) + 'px'
            document.getElementsByClassName("list-div")[0].style.height = (winHeight -90) + 'px'
        },
        filters: {
            moneyFilter(money) {
               return toMoney(money); 
            }
        },
        methods: {
            axiosGetCategoryList() {
                axios({
                    url: url.getCategoryList,
                    method: 'get'
                }).then((res) => {
                    if (res.data.code == 200 && res.data.message) {
                        this.categoryList = res.data.message;
                        this.axiosGetCategorySubListByCategoryId(this.categoryList[0].ID)
                    } else {
                        Toast('服务器错误,数据获取失败')
                    }
                })
            },
            clickCategory(idx, categoryId) { // 点击大类
                this.categoryIndex = idx;
                this.axiosGetCategorySubListByCategoryId(categoryId);
                this.active = 0;
                this.page = 1;
                this.goodsList = [];
                this.finished = false;
                this.onLoad();
            },
            axiosGetCategorySubListByCategoryId(categoryId) {
                axios({
                    url: url.getCategorySubList,
                    method: 'post',
                    data: {
                        categoryId: categoryId
                    }
                }).then((res) => {
                    if (res.data.code == 200 && res.data.message) {
                        this.categorySubList = res.data.message;
                        this.categorySubId = this.categorySubList[0].ID;
                    } else {
                        Toast('服务器错误,数据获取失败')
                    }
                })
            },
            onLoad() {
                setTimeout(() => {
                    this.categorySubId = this.categorySubId ? this.categorySubId : this.categorySubList[0].ID
                    this.axiosGetGoodsListBycategorySubId()
                }, 1000)
            },
            onRefresh() {
                setTimeout(() => {
                    this.isRefresh = false;
                    this.goodsList = [];
                    this.finished = false;
                    this.page = 1;
                    this.onLoad();
                }, 500)
            },
            axiosGetGoodsListBycategorySubId() {
                axios({
                    url: url.getGoodsListByCatrgorySubId,
                    method: 'post',
                    data: {
                        categorySubId: this.categorySubId,
                        page: this.page
                    }
                }).then((res) => {
                    console.log(res);
                    if (res.data.code == 200 && res.data.message.length) {
                        this.page++;
                        this.goodsList = this.goodsList.concat(res.data.message)
                    } else {
                        this.finished = true
                    }
                    this.loading = false
                }).catch(err => {
                    console.log(err);
                })
            },
            onClickCategorySub(idx, title) { // 点击子类
                this.categorySubId = this.categorySubList[idx].ID
                console.log("categorySubId: "+this.categorySubId);
                this.goodsList = []
                this.finished = false
                this.page = 1
                this.onLoad()
            },
            goGoodsDetail(goodsId) {
                this.$router.push({
                    name: "Goods",
                    params: {
                        goodsId: goodsId
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .category-left {
        background-color: rgb(205, 245, 212);
    }
    .category-left ul li {
        line-height: 2rem;
        border-bottom: 1px solid #fff;
        padding: 5px;
        font-size: .8rem;
        text-align: center;
    }
    .categoryActive {
        background-color: #fff;
    }
    .item-list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        font-size: .8rem;
        border-bottom: 1px solid #f0f0f0;
        background-color: #fff;
        padding: 5px;
    }
    .list-div {
        overflow: scroll;
    }
    .item-list-img {
        flex: 8;
    }
    .item-list-text {
        flex: 16;
        margin-top: 10px;
        margin-left: 10px;
    }
</style>