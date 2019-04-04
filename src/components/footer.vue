<template>
    <div>
        <div class="home_bottom">
            <div>
                <router-link :to="{path: '/home/'}"><i class="menu-home"></i>
                    <p>待办</p> </router-link>
            </div>
            <div>
                <router-link :to="{path: '/browselist/', query: {home: 'home'}}"><i class="menu-liulan"></i>
                    <p>浏览</p></router-link>
            </div>
            <div>
                <router-link :to="{path: '/my/', query: {home: 'home'}}"><i class="menu-my"></i>
                    <p>我的</p></router-link>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {

            }
        },
        mounted() {

        },
        methods: {
            getcaution(){
                let MD5 = md5(this.UserID + Md5Key)
                let getapi = "HasLookNews|UserID=" + this.UserID + "|MD5=" + MD5
                let suscess = (e) => {
                    if (e.data.result == 1) {

                    } else {

                    }
                }
                let error = function (e) {

                }
                AjaxHttp(getapi, suscess, error)
            }
        }
    }
</script>

<style scoped>
    .home_bottom {
        width: 100%;
        display: flex;
        background: #fff;
        padding: 0.1rem 0.0rem;
        color: #666;
        position: relative;
        box-shadow: 0 1px 5px #ccc;
    }

    .home_bottom div {
        flex: 1;
        text-align: center;
    }
    .home_bottom div a{
        position: relative;
    }
    .home_bottom div a .bage{
        display: inline-block;
        width: 0.175rem;
        height: 0.175rem;
        background: #df0606;
        border-radius: 100%;
        position: absolute;
        top: 0.0rem;
        right: 0.0rem;
    }
    .home_bottom div a p{
        transform: scale(0.8);
    }
    .home_bottom div a i{
        font-size: 0.45rem;
    }
    .home_bottom div:nth-child(3) i {
        font-size: 0.43rem;
    }

    .home_bottom div img {
        width: 0.43rem;
    }
</style>
