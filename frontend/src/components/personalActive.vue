<template>
    <div>
        <headerBar></headerBar>
        <v-container class="mt-5">

            <p id="title">{{circleName}} 개인별 활동보고서</p>
            <p class="user">이름 : {{user.name}}</p>
            <p class="user">ID : {{user.ID}}</p>
            <p class="user">학과 : {{user.department}}</p>
            <v-data-table
                :headers="headers"
                :items="realActives"
                item-key="_id"
                prev-icon="chevron_left"
                next-icon="chevron_right"
                :rows-per-page-items="[3]"
                class="elevation-1"
            >
            <template slot="items" slot-scope="props">
                <v-img :src="props.item.image" aspect-ratio="1" contain></v-img>
                <td>{{props.item.start.substr(0, 10)}}</td>
                <td>{{props.item.end.substr(0, 10)}}</td>
                <td class="text-xs-right">{{props.item.title}}</td>
                <td class="text-xs-right">{{props.item.contents}}</td>
            </template>
            </v-data-table>
        </v-container>
    </div>
</template>

<script>
import headerBar from './header'

export default {
    data(){
        return{
            circleName: this.$route.params.circleName,
            userName : this.$session.getAll().username,
            actives: [],
            realActives: [],
            user: {},
            headers: [
            {
                text: '활동사진',
                align: 'left',
                sortable: false
            },
            {
                text: '시작날짜',
                align: 'left',
                sortable: false
            },
            {
                text: '종료날짜',
                align: 'left',
                sortable: false
            },
            {
                text: 'title',
                align: 'right'
            },
            {
                text: 'contents',
                align: 'right'
            }
            ],        
        
        }
    },
    created: function() {
        this.userstudentId = this.$session.getAll().userstudentId;
        this.$http.get('http://localhost:8000/user/findById/' + this.userstudentId).then((res) => {
            this.user = res.data
        })

        this.$http.get("http://localhost:8000/circle/"+this.circleName+"/active").then((res)=>{
            this.actives = res.data
        }).then(() => {
            for(var i = 0; i < this.actives.length; i++){
                for(var j = 0; j < this.actives[i].members.length; j++){
                    if(this.actives[i].members[j].name == this.userName)
                        this.realActives.push(this.actives[i])
                }
            }
        })
    },
    components: {
        headerBar
    },    
}    
</script>

<style>
#title{
    margin-top:20px;
    text-align: center;
    font-size: 30px;
    padding: 30px;
}
.user{
    font-size: 20px;
}
</style>
