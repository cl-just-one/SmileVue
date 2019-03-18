<template>
    <div>
        <van-nav-bar
            title="商品详情"
            left-text="返回"
            left-arrow
            @click-left="goHomePage"
        />
        <div class="image-div">
            <img v-lazy="goodsInfo.IMAGE1" width="100%"/>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    import url from '@/serviceAPI.config.js'
    import {Toast} from 'vant'
    export default {
        data() {
            return {
                goodsId: '',
                goodsInfo: {}
            }
        },
        created() {
            this.goodsId = this.$route.query.goodsId
            this.axiosGetDetail()
        },
        methods: {
            axiosGetDetail() {
                axios({
                    url: url.getDetailGoodsInfo,
                    method: 'post',
                    data: {
                        goodsId: this.goodsId
                    }
                }).then(res => {
                    if (res.data.code == 200 && res.data.message) {
                        this.goodsInfo = res.data.message
                    } else {
                        Toast('数据获取失败')
                    }
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            },
            goHomePage() {
                this.$router.go(-1)
            }
        },
    }
</script>

<style scoped>

</style>