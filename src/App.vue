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
                    <b-button :variant="variant" style="margin-right: 0" v-on:click="update()">{{name}}</b-button>
                </b-navbar-nav>
            </b-collapse>
               
        </div>
    </b-navbar>
    <NeoVis/>
    
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
  name="Start"
  assert=false
  variant="success"
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
