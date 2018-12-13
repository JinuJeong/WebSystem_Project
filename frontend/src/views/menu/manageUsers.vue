<template>
    <div id="board">
        <header-bar/>
        <br>
        <v-container class="container">
            <v-flex style="width:100%;">
            <button>
            <i class="material-icons" @click="onBack()">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">A-dong 유저 관리</h1>
                <div class="mt-5">
                    <v-card color="amber">
                        <v-card-title>
                            <h2>유저관리</h2>
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
                            :items="users"
                            :search="search"
                            disable-initial-sort
                            class="elevation-1"
                            no-data-text="등록된 게시물이 없습니다."
                            prev-icon="chevron_left"
                            next-icon="chevron_right"
                            :rows-per-page-items="[10]"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-center" >{{ props.item.ID }}</td>
                                <td class="text-xs-center" >{{ props.item.name }}</td>
                                <td class="text-xs-center" >{{ props.item.department }}</td>
                                <td class="text-xs-center" >{{ props.item.studentId }}</td>
                                <td class="text-xs-center" >
                                    <md-button class="md-icon-button" @click="modifyUser(props.item.studentId)">
                                        <md-icon>edit</md-icon>
                                    </md-button>
                                </td>
                                <td class="text-xs-center" >
                                    <md-button class="md-icon-button" @click="onDelete(props.item.studentId)">
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
            </v-flex>

            <!-- 수정 -->
            <div v-if="modify==true" class="mt-5">
            <form class="vue-form" @submit.prevent="submit">

                    <v-layout>
                        <v-flex style="margin-right : 3%; margin-bottom : 3%;">
                                <v-text-field
                                        label="ID"
                                        v-model="user.ID"
                                        placeholder="please write email address"
                                        ></v-text-field>
                        </v-flex>
                     <v-btn @click="onDup">중복 확인</v-btn>
                    </v-layout>
                   
                    <v-layout>
                        <v-flex style="margin-right : 3%; margin-bottom : 3%;">
                            <v-text-field
                                    label="password"
                                    v-model="user.password"
                                    type="password"
                                    placeholder="password"
                                    
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex style="margin-right : 3%; margin-bottom : 3%;">
                            <v-text-field
                                    label="studentId"
                                    v-model="user.studentId"
                                    type="number"
                                    placeholder="studentId"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                            <v-text-field label="이름" v-model="user.name" type="text" placeholder="name"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="연락처" v-model="user.call" type="tel" placeholder="tel"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                            <v-text-field label="별명" v-model="user.nickname" type="text" placeholder="nickname"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="생년월일" v-model="user.birth" type="number" placeholder="date of birth"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-textarea
                                solo
                                v-model="user.textarea"
                                placeholder="introduce yourself"
                                auto-grow
                        ></v-textarea>
                    </v-layout>
                </form>

                <div class="md-layout-item">
                    <md-field>
                        <label>소속 학과</label>
                        <md-select v-model="user.department" name="department" id="department">
                            <md-optgroup label="정보통신대학">
                                <md-option value="소프트웨어학과">소프트웨어학과</md-option>
                                <md-option value="사이버보안학과">사이버보안학과</md-option>
                                <md-option value="전자공학과">전자공학과</md-option>
                                <md-option value="미디어학과">미디어학과</md-option>
                                <md-option value="국방디지털융합학과">국방디지털융합학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="공과대학">
                                <md-option value="기계공학과">기계공학과</md-option>
                                <md-option value="화학공학과">화학공학과</md-option>
                                <md-option value="환경공학과">환경공학과</md-option>
                                <md-option value="신소재공학과">신소재공학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="자연과학대학">
                                <md-option value="수학과">수학과</md-option>
                                <md-option value="물리학과">물리학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="경영대학">
                                <md-option value="경영학과">경영학과</md-option>
                                <md-option value="e-business 학과">e-business 학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="인문대학">
                                <md-option value="국어국문학과">국어국문학과</md-option>
                                <md-option value="영어영문학과">영어영문학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="사회과학대학">
                                <md-option value="심리학과">심리학과</md-option>
                                <md-option value="경제학과">경제학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="의과대학">
                                <md-option value="의예과">의예과</md-option>
                            </md-optgroup>
                            <md-optgroup label="간호대학">
                                <md-option value="간호학과">간호학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="약학대학">
                                <md-option value="약학과">약학과</md-option>
                            </md-optgroup>
                        </md-select>
                    </md-field>
                </div>
                <div class="actions md-layout md-alignment-center">
                    <v-btn raised class="action-button jg" color="blue-grey lighten-1" v-on:click="onModify">수정하기</v-btn>
                </div>
            </div>
        </v-container>
    </div> 
</template>

<script>
import headerBar from '../../components/header'

export default {
    data () {
      return {
        modify: false,
        user: null,
        check: false,
        search: '',
        headers: [
          { text: 'ID', value: 'ID', align: 'center' /*,sortable: false*/ },
          { text: '이름', value: 'name', align: 'center'},
          { text: '학과', value: 'department', align: 'center' },
          { text: '학번', value: 'studentId', align: 'center' },
          { text: '수정', align: 'center'},
          { text: '삭제', align: 'center'},
        ],
         users: [],
         dup: false,
      }
    },
    components: {
        headerBar
    },
    created() {
        this.fetchData()
    },
    beforeRouteUpdate(to, from, next) {
        this.search = ''
        this.fetchData()
        next()
    },
    methods: {
        fetchData() {
            this.$http.get("http://adong.cf:8000/user/send").then((result)=>{
                this.users=result.data
            })
            if(this.$session.getAll().admin==false) router.push('/NotFound')
            
        },
        onBack: function(){
            this.$router.push('/')
        },
        modifyUser: function(studentId){
                console.log(this.users)
               for(let i =0;i<this.users.length;i++){
                   if(this.users[i].studentId==studentId){
                       this.user=this.users[i]
                       break;
                   }
               }
               this.modify=true;
        },
        onDup: function(){
                this.$http.get("http://adong.cf:8000/user/dup/"+this.id).then((data)=>{
                    
                    if(!data.data){
                        alert("사용가능한 아이디입니다.")
                        this.dup=true
                    }
                    else{
                        alert("중복된 아이디입니다.")
                    }
                })
        },
        onModify: function(){
                     
                if(this.dup==false){
                    alert("중복확인 해주세요");
                    return ;
                }
                this.$http.post("http://adong.cf:8000/user/update/"+this.user.studentId,this.user).
                then((res)=>{
                        
                        if(res.data.errors){
                            let errors = res.data.errors
                            for(let error in errors){
                                alert(error+"를 입력해주세요")
                                return ;
                            }
                            return ;
                        }
                        else{
                            alert("수정 완료")
                            this.$router.push('/manageUsers');
                        }
                     })
            
        },
        onDelete: function(userstudentId){
            this.$http.delete('http://adong.cf:8000/user/' + userstudentId + '/delete')
                .then((res) => {
                    alert("삭제 되었습니다.")
                    window.location.reload();                    
                })
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    margin-top : 50px
}
</style>
