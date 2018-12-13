<template>
    <div>
        <headerBar></headerBar>
        <v-container class="mt-5">
            <h1>{{circleName}} Group</h1>

            <v-flex xs9>
                <md-field>
                        <label>Title</label>
                        <md-input v-model="title" type="text"></md-input>
                </md-field>
            </v-flex>

             <v-layout row wrap>
                <v-flex xs3 class="mr-3">
                    <md-field>
                    <label>최대 인원</label>
                    <md-input v-model="maxNumber" type="number"></md-input>
                    </md-field>
                </v-flex>
                <v-flex xs3 class="mr-3">
                    <md-field>
                    <label for="groupType">group 분야</label>
                    <md-select v-model="groupType" name="groupType" id="groupType">
                        <md-option value="study">스터디</md-option>
                        <md-option value="activity">활동</md-option>
                    </md-select>
                    </md-field>
                </v-flex>

                <v-flex xs3 class="mr-3">
                    <md-field>
                    <label for="groupType">주최자 ID</label>
                    <md-input v-model="teacher" type="text"></md-input>
                    </md-field>
                </v-flex>
             </v-layout>


            <v-layout row wrap>
                <v-flex xs12 sm6>
                <v-date-picker
                    color="green"
                    :events="allowDate"
                    v-model="dates"
                    multiple
                ></v-date-picker>
                </v-flex>
            <v-flex xs12 sm6>
                    <v-combobox
                    slot="activator"
                    v-model="date1"
                    small-chips
                    label="시작 일정"
                    prepend-icon="event"
                    readonly
                    ></v-combobox>

                    <v-combobox
                    slot="activator"
                    v-model="date2"
                    small-chips
                    label="마감 일정"
                    prepend-icon="event"
                    readonly
                    ></v-combobox>

                   
                   <v-textarea
                    outline
                    name="contents"
                    label="group 내용"
                    v-model="contents"
                    ></v-textarea>
                <v-btn color="blue" @click="onSubmit()">그룹 추가</v-btn>
                <v-btn color="blue" @click="onBack()">취소</v-btn>
                </v-flex>
            </v-layout>

        </v-container>
    </div>
</template>
<script>
import headerBar from './header.vue'

export default{
    data(){
        return{
            title : "",
            maxNumber : null,
            circleName: this.$route.params.circleName,
            date1 : Date,
            date2 : Date,
            dates: [new Date().toISOString().substr(0, 10)],
            groupType: "",
            contents: "",
            teacher: "",
            groupId: this.$route.params.groupId,
        }
    },
    created : function(){
        this.$http.get("http://localhost:8000/circle/"+this.circleName+"/group/"+this.groupId).then((data)=>{
            console.log(data)
            let info=data.data
            this.title=info.title
            this.maxNumber=info.maxNumber
            this.date1=info.start.substr(0,10)
            this.date2=info.end.substr(0,10)
            this.groupType=info.groupType
            this.teacher=info.teacher.ID
            this.datalist=[info.title,info.maxNumber,info.start.substr(0,10),info.end.substr(0,10),info.circleName,info.groupType,
            info.teacher.name,info.memberNumber,info.maxNumber]
            this.contents=info.contents
            if(this.userName==data.data.author) this.match=true;
        })
    }
    ,
    methods:{
        // 데이트 설정 갯수 제안
            allowDate:function(){
                let dates=this.dates
                if(dates.length==0){
                    this.date1=null
                    this.date2=null
                }else if(dates.length==1){
                    this.date1=dates[0]
                    this.date2=dates[0]
                }else if(this.dates.length==2){
                    this.date1=dates[0]
                    this.date2=dates[1]
                }
                if(this.dates.length>2){
                    this.dates.splice(2,1)
                }
            },
            onBack(){
                history.back()
            },
            onSubmit: function(){
                if(this.groupId==undefined){
                    this.$http.post("http://localhost:8000/circle/"+this.circleName+"/group/create",
                    {"title":this.title,"contents":this.contents,"teacher":this.teacher,"maxNumber":this.maxNumber,
                    "circleName":this.circleName, "groupType":this.groupType,"start":this.date1,"end":this.date2})
                    .then((data)=>{
                        this.$router.push("/circle/"+this.circleName);
                    })
                }
                else{
                    this.$http.post("http://localhost:8000/circle/"+this.circleName+"/group/update/"+this.groupId,
                    {"title":this.title,"contents":this.contents,"teacher":this.teacher,"maxNumber":this.maxNumber,
                    "circleName":this.circleName, "groupType":this.groupType,"start":this.date1,"end":this.date2})
                    .then((data)=>{
                        this.$router.push("/circle/"+this.circleName);
                    })
                }
            }
    },
    components: {
            headerBar
    },
}
</script>
