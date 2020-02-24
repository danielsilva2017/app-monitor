<template>
  <div class="app">
   
    <b-navbar toggleable="lg">
        <div class="container">

            <b-navbar-brand ><router-link :to="'/'">
                Monitor
                <span class="small text-warning font-weight-bold ml-1" >Beta</span>
            </router-link></b-navbar-brand>

            <b-collapse id="nav-collapse" is-nav>
            </b-collapse>
               
        </div>
    </b-navbar>
    <NeoVis/>
    
  </div>
</template>

<script lang="ts">
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
  @Prop() private data = ''
  changeData(data:any){
    this.data=data;
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
