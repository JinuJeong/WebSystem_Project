<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            
            <button>
                <i class="material-icons" @click="$router.push('/circle/'+circleName)">
                keyboard_backspace
                </i>
            </button>
            <h1 class="text-md-center">{{circleName}} 일정</h1>
            <div class="my-5">
            <v-layout row wrap>
                <v-flex xs12 sm6 class="my-3">
                    <v-date-picker
                        color="blue"
                        v-model="date"
                        :event-color="date => 'red'"
                        :events="getDate"
                    ></v-date-picker>
                </v-flex>
                <md-table class="mt-2">
                <md-table-row>
                    <md-table-head>일정 시작</md-table-head>
                    <md-table-head>일정 마감</md-table-head>
                    <md-table-head>일정 내용</md-table-head>
                    <md-table-head>수정</md-table-head>
                    <md-table-head>삭제</md-table-head>
                </md-table-row>
                <md-table-row v-for="schedule in schedulelists" :key="schedule.full_date">
                    <md-table-cell>{{schedule.start}}</md-table-cell>
                    <md-table-cell>{{schedule.end}}</md-table-cell>
                    <md-table-cell>{{schedule.content}}</md-table-cell>
                    <md-table-cell>
                        <md-button  class="md-icon-button md-accent"
                        @click="onModify(schedule.start,schedule.end,schedule.content,schedule.scheduleId)">
                            <md-icon>edit</md-icon>
                        </md-button>
                    </md-table-cell>
                    <md-table-cell>
                        <md-button  class="md-icon-button md-accent" @click="onDelete(schedule.scheduleId)">
                            <md-icon>clear</md-icon>
                        </md-button>
                    </md-table-cell>
                </md-table-row>
            </md-table>
            </v-layout>
            <v-btn v-if="plus==false" color="blue" @click="plus=true">일정 추가</v-btn>
            </div>
            <v-divider></v-divider>
            
            <!-- 일정 추가 -->
            <div v-if="plus==true" class="mt-5">
                <h1 class="text-md-center">일정 추가</h1>
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

                   
                    <v-text-field
                    label="일정 내용"
                    v-model="content"
                    ></v-text-field>
                <v-btn color="blue" @click="onSubmit()">일정 추가</v-btn>
                <v-btn color="blue" @click="plus=false">취소</v-btn>
                </v-flex>
            </v-layout>
            </div>

            <!-- 일정 수정 -->
            <div v-if="modify==true" class="mt-5">
                <h1 class="text-md-center">일정 수정</h1>
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

                   
                    <v-text-field
                    label="일정 내용"
                    v-model="content"
                    ></v-text-field>
                <v-btn color="blue" @click="onUpdate(scheduleId)">일정 수정</v-btn>
                <v-btn color="blue" @click="plus=false">취소</v-btn>
                </v-flex>
            </v-layout>
            </div>
            
        </v-container>

            
    </div>
</template>
<script>
    import headerBar from './header.vue'

    export default {
        data(){
          return{
                circleName: this.$route.params.circleName,
                schedulelists: [],
                scheduleId: Number,
                kind: this.$route.params.kind,
                kind_head: String,      //<h1>에 들어갈 제목
                date: new Date().toISOString().substr(0, 10),
                date1: Date,
                date2: Date,
                dates: [new Date().toISOString().substr(0, 10)],
                menu: false,
                content: "",
                plus: false,
                modify: false,
          }  
        },
        created: function(){
          console.log(this.circleName)
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/schedule").then((data)=>{
                    
                    for(let i=0;i<data.data.length;i++){
                        let date ={"start": data.data[i].start.substr(0,10)
                        ,"end":data.data[i].end.substr(0,10)
                        ,"content":data.data[i].content
                        ,"full_date":data.data[i].start
                        ,"scheduleId":data.data[i].scheduleId
                        }
                        this.schedulelists.push(date)
                    }
                    console.log(this.schedulelists[0]);
                    
          })
        
        },
        methods: {
            getDate:function(date){
                let [,, day] = date.split('-')
                for(let i=0;i<this.schedulelists.length;i++){
                    let [,, start] = this.schedulelists[i].start.split('-')
                    if(day==start) return 1;
                }
                return 0;
                
            },
            onSubmit:function(){
                this.$http.post("http://localhost:8000/circle/"+this.circleName+"/schedule/create",
                {"start":this.date1,"end":this.date2,"circle":this.circleName,"content":this.content}).then((data)=>{
                    alert(this.date1+" ~ "+this.date2 +" "+this.content+" 일정이 추가됐습니다.")
                    window.location.reload()
                    return;
                })
            },
            onUpdate:function(scheduleId){
                this.$http.post("http://localhost:8000/circle/"+this.circleName+"/schedule/update",
                {"start":this.data1,"end":this.date2,"content":this.content,"scheduleId":this.scheduleId})
                .then((data)=>{
                    window.location.reload()
                    return;
                })
            },
            onModify:function(date1,date2,content,scheduleId){
                this.modify=true;
                this.dates[0]=date1;
                this.dates[1]=date2;
                this.content=content;
                this.scheduleId=scheduleId;
            },
            onDelete:function(scheduleId){
                
                this.$http.post("http://localhost:8000/circle/"+this.circleName+"/schedule/delete",{"scheduleId":scheduleId})
                .then((data)=>{
                    window.location.reload()
                    return;
                })
            },
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
            
        },
        components:{
            headerBar
        }
    }
</script>

<style lang="scss" scoped>
.container{
    margin-top: 100px
}

</style>