<template>
  <div id='search'>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>바로가기</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="동아리">
          <div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label>동아리 종류</label>
                  <md-select v-model="circle_kind" name="circle_kind" id="circle_kind">
                    <md-option v-for="circle_kind in circles_kind" v-bind:value="circle_kind.value" :key="circle_kind.value">
                      {{ circle_kind.name }}
                    </md-option>
                  </md-select>
                  </md-field>
              </div>
              <div class="md-layout-item" v-if="circle_kind==='small_circle'">
                <md-field>
                  <label>단과대</label>
                  <md-select v-model="college" name="college" id="college">
                    <md-option v-for="college in colleges" v-show="college.parent===circle_kind" v-bind:value="college.value" :key="college.value">
                      {{ college.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item" v-else>
                <md-field>
                  <label>중앙동아리 이름</label>
                  <md-select v-model="central_circle_name" name="circle" id="circle">
                  <md-option v-for="circle in circles" v-bind:value="circle.value" :key="circle.value">
                    {{ circle.name }}
                  </md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item" v-if="circle_kind==='small_circle'">
                <md-field>
                  <label>전공</label>
                  <md-select v-model="major" name="major" id="major">
                    <md-option v-for="major in majors" v-show="major.parent===college" v-bind:value="major.value" :key="major.value">
                      {{ major.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item" v-if="circle_kind==='small_circle'">
                <md-field>
                  <label>소학회 이름</label>
                  <md-select v-model="small_circle_name" name="circle" id="circle">
                    <md-option v-for="circle in circles" v-show="circle.parent===major" v-bind:value="circle.value" :key="circle.value">
                      {{ circle.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
          </div>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="go">이동</md-button>
        <md-button class="md-primary" @click="showDialog = false">닫기</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-icon-button" @click="showDialog = true">
        <md-icon style="color:white">search</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'search',
  data: () => {
      return {
          showDialog: false,
          circles_kind: [
              {name: '중앙동아리', value: 'central_circle'},
              {name: '소학회', value: 'small_circle'}
          ],
          colleges: [
              {name: '정통대', parent: 'small_circle', value: 'information'},
              {name: '자연대', parent: 'small_circle', value: 'nature'},
              {name: '공대', parent: 'small_circle', value: 'technology'},
              {name: '간호대', parent: 'small_circle', value: 'nurse'}
          ],
          majors: [
              {name: '소프트웨어학과', parent: 'information', value: 'software'},
              {name: '사이버보안학과', parent: 'information', value: 'security'},
              {name: '전자과', parent: 'information', value: 'electric'},
              {name: '미디어학과', parent: 'information', value: 'media'},
              {name: '기계공학과', parent: 'technology', value: 'mechanic'},
              {name: '화학과', parent: 'nature', value: 'chemical'}
          ],
          circles: [
              {name: '한터', parent: 'software', value: '한터'},
              {name: '안씨', parent: 'software', value: '안씨'},
              {name: '세미콜론', parent: 'software', value: '세미콜론'}
          ],
          circle_kind: String,
          college: String,
          major: String,
          small_circle_name : String,
          central_circle_name: String,
      }
  },

  methods : {
      go : function(){
          this.showDialog = false;


          if(this.circle_kind === 'central_circle') {
              this.$router.push("/circle/" + this.central_circle_name) //중앙동아리
          }
          else if(this.circle_kind  === 'small_circle'){
              this.$router.push("/circle/" + this.small_circle_name)
          }
      }
  }
}
</script>

<style lang="scss" scoped>
.md-dialog {
    max-width: 768px;
}
</style>
