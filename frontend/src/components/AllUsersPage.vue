<template>
<div class ="users">
    <h1>사용자 목록</h1>
    <div v-for = "user in users" v-bind:key="user.id" class="user">
        <div>
            <strong>{{user.name}}</strong>
            <router-link :to="{name:'detail',params:{id:user.id}}">더보기</router-link>
        </div>
    </div>
</div>
</template>

<script>
export default{
    created (){
        this.$http.get('api/tests').then((res)=>{
            this.users=res.data
        })
    },
    data(){
        return{
            users:[]
        }
    }
}
</script>