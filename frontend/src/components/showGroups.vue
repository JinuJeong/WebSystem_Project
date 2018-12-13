<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            <button>
            <i class="material-icons" @click="onBack()">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">{{circleName}} Group</h1>
                <div class="centered-container">
                    <v-card color="cyan" class="mt-5">
                        <v-card-title>
                            Group
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
                            :items="grouplist"
                            :search="search"
                            disable-initial-sort
                            next-icon="chevron_right"
                            prev-icon ="chevron_left"
                            class="elevation-1"
                            :rows-per-page-items="[]"
                            
                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/group'+'/show_group/'+props.item.groupId)">{{ props.item.groupId }}</td>
                                <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/group'+'/show_group/'+props.item.groupId)">{{ props.item.title }}</td>
                                <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/group'+'/show_group/'+props.item.groupId)">{{ props.item.memberNumber }}</td>
                                <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/group'+'/show_group/'+props.item.groupId)">{{ props.item.teacher }}</td>
                                <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/group'+'/show_group/'+props.item.groupId)">{{ props.item.date }}</td>
                            </template>
                            <v-alert slot="no-results" :value="true" color="black--text" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                        </v-data-table>
                    </v-card>
                </div>
            <v-btn v-if="auth==true" color="blue" @click="$router.push('/circle/'+circleName+'/manage_group/create')">새글작성</v-btn>
        </v-container>
        
    </div>
</template>
<script>
    import headerBar from './header.vue'

    export default {
        data(){
          return{
                circleName: this.$route.params.circleName,
                grouplist: [],
                search: "",
                headers: [
                { text: '번호', value: 'postNum', align: 'center'},
                { text: '제목', value: 'title', align: 'center' },
                { text: '참가인원', value: 'memberNumber', align: 'center'},
                { text: '주최자', value: 'teacher', align: 'center' },
                { text: '기간', value: 'date', align: 'center' },
                //{ text: '조회수', value: 'views', align: 'center' }
                ],
                auth: false,
          }  
        },
        created: function(){
          if(this.$session.getAll().admin==true) this.auth=true;
          else if(this.$session.getAll().president==this.circleName) this.auth =true;
          else if(this.postType=="board" && this.$session.getAll().circles.indexOf(this.circleName)>-1) this.auth = true;


          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/group").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let start = data.data[i].start.split('T')[0]
                let end = data.data[i].start.split('T')[0]
                let group={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":start+" ~ "+end,"groupId":data.data[i].groupId,"teacher":data.data[i].teacher.name,
                "memberNumber":data.data[i].memberNumber}
                this.grouplist.push(group)
              }
              
          })
        },
        components:{
            headerBar
        },
        methods:{
            onBack:function(){
                history.back()
            }
        }
    }
</script>

<style lang="scss" scoped>
.container{
    margin-top: 100px
}

</style>