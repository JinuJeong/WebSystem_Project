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
                </md-table-row>
                <md-table-row v-for="schedule in schedulelists" :key="schedule.full_date">
                    <md-table-cell>{{schedule.start}}</md-table-cell>
                    <md-table-cell>{{schedule.end}}</md-table-cell>
                    <md-table-cell>{{schedule.content}}</md-table-cell>
                </md-table-row>
            </md-table>
            </v-layout>


            <v-layout row wrap class="mt-5">
                 <v-text-field
                v-model="content"
                label="일정"
                required
                ></v-text-field>
            <v-menu
            ref="menu1"
            :close-on-content-click="false"
            v-model="menu1"
            :nudge-right="40"
            :return-value.sync="date"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="date1"
                    label="Picker in menu"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker v-model="date1" no-title scrollable color="blue">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu1.save(date1)">OK</v-btn>
                    </v-date-picker>
            </v-menu>
            <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="date2"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px">
                <v-text-field
                    slot="activator"
                    v-model="date2"
                    label="Picker in menu"
                    prepend-icon="event"
                    readonly
                    ></v-text-field>
                    <v-date-picker v-model="date2" no-title scrollable color="green">
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                    <v-btn flat color="primary" @click="$refs.menu2.save(date2)">OK</v-btn>
                    </v-date-picker>
            </v-menu>
            <v-btn color="blue" @click="onSubmit()">일정 추가</v-btn>
           
            
        </v-layout>
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
                kind: this.$route.params.kind,
                kind_head: String,      //<h1>에 들어갈 제목
                date: new Date().toISOString().substr(0, 10),
                menu1: false,
                menu2: false,
                date1: new Date().toISOString().substr(0, 10),
                date2: new Date().toISOString().substr(0, 10),
                content: "",
          }  
        },
        created: function(){
          console.log(this.circleName)
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/schedule").then((data)=>{
                    
                    for(let i=0;i<data.data.length;i++){
                        let date ={"start": data.data[i].start.substr(0,10)
                        ,"end":data.data[i].end.substr(0,10)
                        ,"content":data.data[i].content
                        ,"full_date":data.data[i].start}
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
                    alert(this.date1+" ~ "+this.date2 +"일정 추가")
                    window.location.reload()
                    return;
                })
            }
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