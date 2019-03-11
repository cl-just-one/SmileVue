<template>
    <div>
        <div class="search-bar">
            <van-row>
                <van-col span="3">
                    <img class="search-icon" :src="locationImg" width="80%">
                </van-col>
                <van-col span="16">
                    <input type="text" class="search-input">
                </van-col>
                <van-col span="5">
                    <van-button size="mini">查找</van-button>
                </van-col>
            </van-row>
        </div>
        <div class="swipe-area">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
                    <img :src="banner.imageUrl">
                </van-swipe-item>
            </van-swipe>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                msg: 'Shopping Mall',
                locationImg: require('../../assets/images/location.png'),
                bannerPicArray:[
                    {imageUrl:'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'},
                    {imageUrl:'https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg'},
                    {imageUrl:'https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg'},
                ],
                categroy: []
            }
        },
        created() {
            axios({
                url: "https://www.easy-mock.com/mock/5c85c410a37c3b12bb906f52/index/index",
                method: "get"
            }).then(response => {
                console.log(response);
            }).catch(error => {
                console.log(error);
            })
        }
    }
</script>

<style scoped>
    .search-bar {
        height: 2.2rem;
        background-color: #e5017d;
        line-height: 2.2rem;
        overflow: hidden;
    }
    .search-icon {
        height: 2rem;
        padding-top: .2rem;
        padding-left: .2rem;
    }
    .search-input {
        width: 100%;
        height: 1.3rem;
        border-top: 0;
        border-left: 0;
        border-right: 0;
        border-bottom: 1px solid #fff;
        background-color: #e5017d;
        color: #fff;
    }
    .swipe-area {
        clear: both;
        max-height: 15rem;
        overflow: hidden;
    }
</style>