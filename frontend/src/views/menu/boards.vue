<template>
    <div id="board">
    <header-bar/>
    <br>
    <v-flex xs12 sm10 offset-sm1>
        <div class="centered-container">
            <v-card color="blue lighten-4">
                <v-card-title>
                    게시판
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
                    :items="desserts"
                    :search="search"
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center">{{ props.item.num }}</td>
                        <td class="text-xs-center">{{ props.item.title }}</td>
                        <td class="text-xs-center">{{ props.item.name }}</td>
                        <td class="text-xs-center">{{ props.item.date }}</td>
                        <td class="text-xs-center">{{ props.item.views }}</td>
                    </template>
                    <v-alert slot="no-results" :value="true" color="black" icon="warning">
                        Your search for "{{ search }}" found no results.
                    </v-alert>
                </v-data-table>
            </v-card>
        </div>
        <div class="text-xs-right">
            <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <v-btn slot="activator" color="primary" dark>새 글 작성</v-btn>
                <v-card>
                    <v-toolbar dark color="primary">
                    <v-btn icon dark @click="dialog = false">
                        <v-icon>close</v-icon>
                    </v-btn>
                    <v-toolbar-title>새 글 쓰기</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark flat @click="dialog = false">작성</v-btn>
                    </v-toolbar-items>
                    </v-toolbar>
                    <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                        <v-flex xs12>
                            <v-text-field
                                label="제목"
                                solo
                            ></v-text-field>
                        </v-flex>
                        <v-flex xs12>
                            <v-textarea
                            solo
                            label="내용"
                            rows=20
                            row-height=24
                            ></v-textarea>
                        </v-flex>
                        </v-layout>
                    </v-container>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </v-flex>
    </div> 
</template>

<script>
import headerBar from '../../components/header'

export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        checkbox: true,
        search: '',
        headers: [
          { text: '번호', align: 'center', value: 'num' /*,sortable: false*/ },
          { text: '제목', value: 'title', align: 'center' },
          { text: '작성자', value: 'name', align: 'center' },
          { text: '등록일', value: 'date', align: 'center' },
          { text: '조회수', value: 'views', align: 'center' }
        ],
        desserts: [
          {
            value: false,
            num: '1',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정진우',
            date: '2018-11-25',
            views: 123
          },
          {
            value: false,
            num: '2',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAB',
            name: '정지누',
            date: '2018-11-26',
            views: 124
          },
          {
            value: false,
            num: '3',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 126
          },
          {
            value: false,
            num: '4',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 182
          },
          {
            value: false,
            num: '5',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 123
          },
          {
            value: false,
            num: '6',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 123
          },
          {
            value: false,
            num: '7',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 123
          },
          {
            value: false,
            num: '8',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 123
          },
          {
            value: false,
            num: '9',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 123
          },
          {
            value: false,
            num: '10',
            title: 'AAAAAAAAAAAAAAAAAAAAAAAAA',
            name: '정지누',
            date: '2018-11-25',
            views: 123
          }
        ]
      }
    },
    components: {
        headerBar
    }
}
</script>

<style lang="scss" scoped>

</style>