<template>
    <div>
        <headerBar></headerBar>
        <v-container class="mt-5">
            <h1>{{circleName}} Active</h1>

            <v-flex xs9>
                <md-field>
                        <label>Title</label>
                        <md-input v-model="title" type="text"></md-input>
                </md-field>
            </v-flex>

            <div v-if="!image">
                <h2>Select an image</h2><br/>
                <input type="file" @change="onFileChange">
            </div>
            <div v-else>
                <img :src="image" />
                <v-btn @click="removeImage">Remove image</v-btn>
            </div>


            <v-layout row wrap class ='mt-5'>
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
                <v-btn color="blue" @click="plus=false">취소</v-btn>
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
            circleName: this.$route.params.circleName,
            date1 : Date,
            date2 : Date,
            dates: [new Date().toISOString().substr(0, 10)],
            contents: "",
            activeId: this.$route.params.activeId,
            image: "",
            userName : this.$session.getAll().username,
            files: [],
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
            onSubmit: function(){
                if(this.groupId==undefined){
                    this.$http.post("http://localhost:8000/circle/"+this.circleName+"/active/create",
                    {"title":this.title,"contents":this.contents,"circleName":this.circleName,"start":this.date1,"end":this.date2
                    ,"image":this.image,"author":this.userName,"files":this.files[0]})
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
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length)
                    return;
                console.log(files[0])
                this.files.push(files[0])
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();

                reader.onload = (e) => {
                    this.image = e.target.result;
                };
                reader.readAsDataURL(file);
            },
            removeImage: function (e) {
            this.image = '';
            }
    },
    components: {
            headerBar
    },
}
</script>
