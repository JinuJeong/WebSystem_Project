<template>
    <div>
        <headerBar></headerBar>
        <v-container class="mt-5">
            <p id="title">{{circleName}} 회원 관리</p>


            <v-data-table
                :headers="headers"
                :items="members"
                item-key="_id"
                class="elevation-1"
                :rows-per-page-items="[]"
            >
            <template slot="items" slot-scope="props">
                <td>{{props.item.user.ID}}</td>
                <td>{{props.item.user.name}}</td>
                <td class="text-xs-right">{{props.item.user.department}}</td>
                <td class="text-xs-right">{{props.item.user.call}}</td>
                <td>
                <v-btn round color="blue" large v-on:click="userout=props.item.user;reject()">
                    <p class="circle_button">강퇴</p>
                </v-btn>
                </td>
            </template>
            </v-data-table>      
        </v-container>
    </div>
</template>

<script>
import headerBar from '../../components/header'

export default{
    data(){
        return{
            headers: [
            {
                text: 'ID',
                align: 'left',
                sortable: false
            },
            {
                text: '이름',
                align: 'left',
                sortable: false
            },
            {
                text: '학과',
                align: 'center',
                sortable: false
            },
            {
                text: '전화번호',
                align: 'right'
            },
            {
                text: '강퇴',
                align: 'center'
            }
            ],        
            circle: {},
            members: [],
            circleName: this.$route.params.circleName,
            userout: {}
        }
    },
    created: function (){
        this.$http.get('http://adong.cf:8000/circle/find/' + this.circleName).then((res) => {
            this.circle = res.data
            for(var i = 0; i < res.data.members.length; i++){
                if(res.data.members[i].circleAuth == true)
                    this.members.push(res.data.members[i])
            }
        })
    },
    components: {
            headerBar
    },
    methods: {
        reject: function() {
            this.$http.post('http://adong.cf:8000/circle/'+this.circleName+'/reject', this.userout).then(() => {
                this.$http.post('http://adong.cf:8000/user/'+this.userout.studentId+'/reject', this.circle)
            }).then(() => {
            this.$router.go(0)
            })
        }
    }
}
</script>

<style>
#title{
    margin-top:20px;
    text-align: center;
    font-size: 30px;
    padding: 30px;
}
</style>
