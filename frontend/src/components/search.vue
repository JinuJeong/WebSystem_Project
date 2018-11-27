<template>
  <div id='search'>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Preferences</md-dialog-title>

      <md-tabs md-dynamic-height>
        <md-tab md-label="General">
          <div>
            <div class="md-layout md-gutter">
              <div class="md-layout-item">
                <md-field>
                  <label for="circle_kind">동아리 종류</label>
                  <md-select v-model="circle_kind" name="circle_kind" id="circle_kind">
                    <md-option v-for="circle_kind in circles_kind" v-bind:value="circle_kind.value" :key="circle_kind.value">
                      {{ circle_kind.name }}
                    </md-option>
                  </md-select>
                  </md-field>
              </div>
              <div class="md-layout-item" v-if="circle_kind=='small_circle'">
                <md-field>
                  <label for="college">단과대</label>
                  <md-select v-model="college" name="college" id="college">
                    <md-option v-for="college in colleges" v-show="college.parent==circle_kind" v-bind:value="college.value" :key="college.value">
                      {{ college.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item" v-else>
                <md-field>
                  <label for="circle">동아리 이름</label>
                  <md-select v-model="circle_name" name="circle" id="circle">
                  <md-option v-for="circle in circles" v-bind:value="circle.value" :key="circle.value">
                    {{ circle.name }}
                  </md-option>
                  </md-select>
                </md-field>
              </div>

              <div class="md-layout-item" v-if="circle_kind=='small_circle'">
                <md-field>
                  <label for="major">전공</label>
                  <md-select v-model="major" name="major" id="major">
                    <md-option v-for="major in majors" v-show="major.parent==college" v-bind:value="major.value" :key="major.value">
                      {{ major.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
              <div class="md-layout-item" v-if="circle_kind=='small_circle'">
                <md-field>
                  <label for="circle_name">동아리 이름</label>
                  <md-select v-model="circle" name="circle" id="circle">
                    <md-option v-for="circle in circles" v-show="circle.parent==major" v-bind:value="circle.value" :key="circle.value">
                      {{ circle.name }}
                    </md-option>
                  </md-select>
                </md-field>
              </div>
            </div>
            <md-button class="md-primary md-raised" @click="movie = 'pulp-fiction'">Set Pulp Fiction</md-button>
          </div>
        </md-tab>
      </md-tabs>

      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click="showDialog = false">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-button class="md-icon-button" @click="showDialog = true">
        <md-icon>search</md-icon>
    </md-button>
  </div>
</template>

<script>
export default {
  name: 'search',
  data: () => ({
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
      {name: '사이버보안학과', parent: 'information', value: ''},
      {name: '전자과', parent: 'information', value: ''},
      {name: '미디어학과', parent: 'information', value: ''},
      {name: '기계공학과', parent: 'technology', value: ''},
      {name: '화학과', parent: 'nature', value: ''}
    ],
    circles: [
      {name: '한터', parent: 'software', value: 'hantor'},
      {name: '안씨', parent: 'software', value: ''},
      {name: '세미콜론', parent: 'software', value: ''}
    ],
    circle_kind: String,
    college: String,
    major: String,
    circle: String,
    circle_name: String
  })
}
</script>

<style lang="scss" scoped>
.md-dialog {
    max-width: 768px;
}
</style>
