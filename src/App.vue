<template>
  <div class="app">
   
    <b-navbar toggleable="lg">
        <div class="container">

            <b-navbar-brand >
                Monitor
                <span class="small text-warning font-weight-bold ml-1" >Beta</span>
                 
            </b-navbar-brand>
            
            
            
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-button variant="warning" style="float:right" v-on:click="show()">Imagens</b-button>
                
                    <b-button :variant="variant" style="margin-right: 0" v-on:click="update()">{{name}}</b-button>
                </b-navbar-nav>
            </b-collapse>
               
        </div>
    </b-navbar>

<div class="nav-wrapper container">
    <ul class="nav nav-pills nav-fill flex-column flex-md-row" id="tabs-icons-text" role="tablist">
        <li class="nav-item">
            <a :class="'nav-link mb-sm-3 mb-md-0 ' + ( currentpage == 1 ? 'active' : '' ) " id="tabs-icons-text-1-tab" data-toggle="tab" href="#tabs-icons-text-1" role="tab" aria-controls="tabs-icons-text-1" aria-selected="true" @click="currentpage=1">Processos</a>
        </li>
        <li class="nav-item">
            <a :class="'nav-link mb-sm-3 mb-md-0 ' + ( currentpage == 2 ? 'active' : '' )" id="tabs-icons-text-2-tab" data-toggle="tab" href="#tabs-icons-text-2" role="tab" aria-controls="tabs-icons-text-2" aria-selected="false" @click="currentpage=2">Pods</a>
        </li>
        <li class="nav-item">
            <a :class="'nav-link mb-sm-3 mb-md-0 ' + ( currentpage == 3 ? 'active' : '' )" id="tabs-icons-text-3-tab" data-toggle="tab" href="#tabs-icons-text-3" role="tab" aria-controls="tabs-icons-text-3" aria-selected="false" @click="currentpage=3">Hosts</a>
        </li>
    </ul>
</div>
<div class="card shadow container ">
    <div class="card-body">
        <div class="tab-content" id="myTabContent">
            <div :class="'tab-pane fade '+ (currentpage==1 ? 'show active': '') " id="tabs-icons-text-1" role="tabpanel" aria-labelledby="tabs-icons-text-1-tab">
                <NeoVis/>
            </div>
            <div :class="'tab-pane fade '+ (currentpage==2 ? 'show active': '') " role="tabpanel" aria-labelledby="tabs-icons-text-2-tab">
                <Pods/>
            </div>
            <div :class="'tab-pane fade '+ (currentpage==3 ? 'show active': '') " role="tabpanel" aria-labelledby="tabs-icons-text-3-tab">
                <Hosts/>
            </div>
        </div>
    </div>
  </div>
     <b-modal size="huge" v-model="modalShow" title="Acrescentar Imagem">
          <b-form-group>
              <template v-slot:prepend>
                  <b-input-group-text>
                  </b-input-group-text>
              </template>
              <b-card-sub-title class="mb-2">Keyword
                <span class="ml-1" v-b-tooltip.hover title="Palavra que será procurada no atributo cmd do nó">
                  <b-icon-info></b-icon-info>
                </span>
              </b-card-sub-title>
              <b-form-input
                      id="profSituation"
                      v-model="image.keyword"
                      trim>
              </b-form-input>
          </b-form-group>
          <b-form-group>
              <template v-slot:prepend>
                  <b-input-group-text>
                  </b-input-group-text>
              </template>
              <b-card-sub-title class="mb-2">Url
                <span class="ml-1" v-b-tooltip.hover title="Url da imagem que vai ser carregado para cada nó que contenha a keyword definida">
                  <b-icon-info></b-icon-info>
                </span>
              </b-card-sub-title>
              
              <b-form-input
                      id="profSituation"
                      v-model="image.url"

                      trim
                      >
              </b-form-input>
              
          </b-form-group>
         <template v-slot:modal-footer="{ cancel, ok }">
            <b-button variant="outline-secondary" v-on:click="cancel()">Cancelar</b-button>
            <span class="flex-fill"></span>
            <b-button variant="warning" v-on:click="images();ok()">Acrescentar</b-button>
     </template>
    </b-modal>
  </div>
</template>

<script>
import { Component,Vue,Prop } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import NeoVis from './components/component.vue'
import Pods from './components/pods.vue'
import Hosts from './components/hosts.vue'

@Component({
  components: {
    NeoVis,
    Pods,
    Hosts

  }
})
export default class App extends Vue {
  changeData(data){
    this.data=data;
  }
  currentpage=1
  modalShow=false
  name="Start"
  assert=false
  variant="success"
  image={keyword:null,url:null}
  show(){
    this.modalShow=true
  }
  images(){
    console.log("here")
      this.$http.post('http://localhost:3000/image', this.image, {
        headers: {
            'Content-Type': 'application/json',
      }}).then(response => 
    (
      console.log(response)
   ))
  }
  update(){
    this.assert=!this.assert
    if(this.assert==true){
      this.name="Stop"
      this.start()
    }
    else{
      this.name="Start"
      this.stop()
    }
  }

  start(){
    this.variant="danger"
      this.$http.post('http://localhost:3000/monitor/start').then(response => 
    (
      console.log(response)
   ))
   this.$bvToast.toast( 'Monitorização iniciada', {
          title: 'Monitorização',
          variant: 'success',
          solid: true
      } );
  }
    stop(){
      this.variant="success"
      this.$http.post('http://localhost:3000/monitor/stop').then(response => 
    (
      console.log(response)
   ))
   this.$bvToast.toast( 'Monitorização acabada', {
          title: 'Monitorização',
          variant: 'success',
          solid: true
      } );
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
