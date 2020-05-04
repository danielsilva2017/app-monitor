<template>
  <div class="app">
   
    <b-navbar toggleable="lg">
        <div class="container">

            <b-navbar-brand ><router-link :to="'/'">
                Monitor
                <span class="small text-warning font-weight-bold ml-1" >Beta</span>
                 
            </router-link></b-navbar-brand>
            
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav class="ml-auto">
                    <b-button variant="warning" style="float:right" v-on:click="show()">Imagens</b-button>
                
                    <b-button :variant="variant" style="margin-right: 0" v-on:click="update()">{{name}}</b-button>
                </b-navbar-nav>
            </b-collapse>
               
        </div>
    </b-navbar>
    <NeoVis/>
     <b-modal size="huge" v-model="modalShow" title="Mudar Imagem">
       <b-card no-body>
          <b-form-group>
              <template v-slot:prepend>
                  <b-input-group-text>
                  </b-input-group-text>
              </template>
              <b-card-sub-title class="mb-2">Keyword</b-card-sub-title>
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
              <b-card-sub-title class="mb-2">Url</b-card-sub-title>
              <b-form-input
                      id="profSituation"
                      v-model="image.url"

                      trim
                      >
              </b-form-input>
          </b-form-group>
        </b-card>  
         <template v-slot:modal-footer="{ cancel, ok }">
            <b-button variant="outline-secondary" v-on:click="cancel()">Cancelar</b-button>
            <span class="flex-fill"></span>
            <b-button variant="warning" v-on:click="images();ok()">Gravar</b-button>
     </template>
    </b-modal>
  </div>
</template>

<script>
import { Component,Vue,Prop } from 'vue-property-decorator'
import HelloWorld from './components/HelloWorld.vue'
import NeoVis from './components/component.vue'

@Component({
  components: {
    HelloWorld,
    NeoVis
  }
})
export default class App extends Vue {
  changeData(data){
    this.data=data;
  }
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
