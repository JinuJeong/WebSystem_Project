<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            
            <button>
                <i class="material-icons" @click="$router.push('/')">
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
            
                <div class="centered-container">
                    <v-card color="amber">
                        <v-card-title>
                            일정
                            <v-spacer/>
                            <v-text-field  
                                v-model="search"
                                append-icon="search"
                                label="Search"
                                single-line
                                hide-details
                            />
                        </v-card-title>
                        <v-data-table
                            :headers="headers"
                            :items="schedulelists"
                            :search="search"
                            disable-initial-sort
                            next-icon="chevron_right"
                            prev-icon ="chevron_left"
                            class="elevation-1"
                            :rows-per-page-items="[]"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-center" >{{ props.item.start }}</td>
                                <td class="text-xs-center" >{{ props.item.end }}</td>
                                <td class="text-xs-center" >{{ props.item.content }}</td>
                                <td v-if="match==true" class="text-xs-center"  @click="onModify(props.item.start,props.item.end,props.item.content,props.item.scheduleId)">
                                    <md-button class="md-icon-button">
                                        <md-icon>edit</md-icon>
                                    </md-button>
                                </td>
                                <td v-if="match==true" class="text-xs-center" @click="onDelete(props.item.scheduleId)">
                                    <md-button class="md-icon-button">
                                        <md-icon>clear</md-icon>
                                    </md-button>
                                </td>
                            </template>
                            <v-alert slot="no-results" :value="true" color="black--text" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                        </v-data-table>
                    </v-card>
                    </div>
                
            </v-layout>
            <v-btn v-if="plus==false && match==true" color="blue" @click="plus=true">일정 추가</v-btn>
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
    import headerBar from '../../components/header'

    export default {
        data(){
          return{
                match: false,
                
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
                search: "",
                headers: [
                { text: '일정 시작', value: 'start', align: 'center'},
                { text: '일정 마감', value: 'end', align: 'center' },
                { text: '일정 내용', value: 'content', align: 'center'},
                
                //{ text: '조회수', value: 'views', align: 'center' }
                ],
          }  
        },
        created: function(){
          if(this.$session.getAll().admin==true) this.match=true
          if(this.match==true){
              this.headers.push({ text: '수정',  align: 'center' })
              this.headers.push({ text: '삭제',  align: 'center' })
          }
          this.$http.get("http://localhost:8000/circle/Home/schedule").then((data)=>{
                    
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
                this.$http.post("http://localhost:8000/circle/Home/schedule/create",
                {"start":this.date1,"end":this.date2,"circle":"Home","content":this.content}).then((data)=>{
                    alert(this.date1+" ~ "+this.date2 +" "+this.content+" 일정이 추가됐습니다.")
                    window.location.reload()
                    return;
                })
            },
            onUpdate:function(scheduleId){
                this.$http.post("http://localhost:8000/circle/Home/schedule/update",
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
                this.$http.get("http://localhost:8000/circle/Home/schedule/"+scheduleId).then((data)=>{
                    data.data["kind"] = "schedule"
                    this.$http.post("http://localhost:8000/recovery",data.data).then(()=>{
                    this.$http.post("http://localhost:8000/circle/Home/schedule/delete",{"scheduleId":scheduleId})
                    .then((data)=>{
                        window.location.reload()
                        return;
                    })
                })
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
                     if(dates[0]<dates[1]){
                        this.date1=dates[0]
                        this.date2=dates[1]
                    }else{
                        this.date1=dates[1]
                        this.date2=dates[0]
                    }
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