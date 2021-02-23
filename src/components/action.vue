<template>
<div  v-if="estado.id!=0" class="container" id="barra">
             {{queue.currentLeft}} / {{queue.number}}
      <b-progress :max="maximo" height="2rem">
                     
                      <b-progress-bar  show-progress animated :value="valor">
                        Estado - {{estado.msg}}: <strong>{{ valor.toFixed(2) }} / {{ maximo }}</strong>
                      </b-progress-bar>
                    </b-progress>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import axios from 'axios'
import objectPath from 'object-path'
@Component({})
export default class ActionComponent extends Vue {
    valor:number=0;
    type:any="";
    estado:any={id:"0",msg:""}
    queue:any={number:"0",currentLeft:"0"}
    maximo:number=100;
    urls:any=[]
    @Prop({ type: String })
    public readonly title!: string;

    @Prop({ type: String })
    public readonly str!: string;
  /**
   * 
   * Function used to update the value presented in the Progress   depending on the state
   * @param {string} state current state 
   * 
   */

  async updateValue(state:any){
    if(state.id=="1"){this.valor=25}
    else if(state.id=="2"){this.valor=50}
    else if(state.id=="3"){this.valor=75}
    else if (state.id=="4"){this.valor=100}
    else{this.valor=0}
    this.estado.msg=state.msg
  }

  /**
   * 
   * This function is called 10 in 10s after a change is made to update the current state in order to 
   * update the progress and consequently give feedback to the user. 
   * 
   */

  async getState(){
      console.log('http://localhost:3001/geral/state')
    axios.get('http://localhost:3001/geral/state').then(response => 
    {
      this.estado.id=response.data.id
      this.estado.msg=response.data.msg
      
    })  
    await this.updateValue(this.estado)
  }

  async getQueue(){
     axios.get('http://localhost:3001/geral/queue').then(response => 
    {
     
      this.queue.number=response.data.number
      this.queue.currentLeft=response.data.currentLeft
      
    }) 
  }

  /**
   * 
   * This function is responsible to update the progress bar text, call getState() to update the state and 
   * in the end launches a modal to let the user know the task is over with a personalized title and 
   * message depending on the tasks that was performed
   * 
   * @param {string} titulo é o titulo que aperece no modal
   * @param {string} str mensagem que aparece no modal
   * 
   */

  async feedback(title:string,str:string){
     this.estado.id = "1"
    console.log("heres"+this.estado.id)
    while ( this.estado.id != "4") {
        
        await this.delay( 10000 );

        await this.getState()
    }
    console.log("completed the cicle")
    this.$bvToast.toast( str, {
        title: title,
        variant: 'success',
        solid: true
    } );
    this.estado.id=0
    this.estado.msg="";
    this.updateValue(this.estado)
  }

/**
* 
* Function that returns a promisse to timeout the function call for 10s 
* 
*/ 

delay ( time:number ) {
    return new Promise( resolve => setTimeout( resolve, time ) )
}

/**
 * 
 * Function that calls the api yamlChanger in order to change the number of replicas of one service 
 * (deployment or statefulsets)
 * 
 */

 async updateReplicas(type:string,namespace:string,name:string,finalInformation:string){
    
    this.type=type
    this.urls.push('http://localhost:3001/'+type+'/replicas/'+namespace+'/'+name+'/'+finalInformation)
     /* axios.post('http://localhost:3001/'+type+'/replicas/'+namespace+'/'+name+'/'+finalInformation).then(response => 
    (
      console.log(response)
   ))*/
  //this.feedback('Número Réplicas','O número de réplicas foi atualizado com sucesso.')
}



/**
 * 
 * Function that calls the api yamlChanger in order to change the cpu limit of one service 
 * (deployment or statefulsets)
 * 
 */

 async updateLimitCpu(type:string,namespace:string,name:string,finalInformation:string){
     this.type=type
     this.urls.push('http://localhost:3001/'+type+'/resources/'+namespace+'/limits/cpu/'+name+'/'+finalInformation)
    /*  axios.post('http://localhost:3001/'+type+'/resources/'+namespace+'/limits/cpu/'+name+'/'+finalInformation).then(response => 
    (
      console.log("tag"+response)
   ))*/
   //this.feedback('Limite cpu','O limite de cpu foi atualizado com sucesso.')
  }

  /**
 * 
 * Function that calls the api yamlChanger in order to change the memory limit of one service 
 * (deployment or statefulsets)
 * 
 */
  async updateLimitMemory(type:string,namespace:string,name:string,finalInformation:string){
    this.type=type
    this.urls.push('http://localhost:3001/'+type+'/resources/'+namespace+'/limits/memory/'+name+'/'+finalInformation)
    /*  axios.post('http://localhost:3001/'+type+'/resources/'+namespace+'/limits/memory/'+name+'/'+finalInformation).then(response => 
    (
      console.log(response)
   ))*/

   //this.feedback('Limite memória','O limite de memória foi atualizado com sucesso.')
    
  }

/**
 * 
 * Function that calls the api yamlChanger in order to change the request cpu of one service 
 * (deployment or statefulsets)
 * 
 */

  async updateRequestCpu(type:string,namespace:string,name:string,finalInformation:string){
      this.type=type
      this.urls.push('http://localhost:3001/'+type+'/resources/'+namespace+'/requests/cpu/'+name+'/'+finalInformation)
   /*axios.post('http://localhost:3001/'+type+'/resources/'+namespace+'/requests/cpu/'+name+'/'+finalInformation).then(response => 
    (
      console.log(response)
   ))*/
   //this.feedback('Request cpu','O request de cpu foi atualizado com sucesso.')
    
  }

/**
 * 
 * Function that calls the api yamlChanger in order to change the request memory of one service 
 * (deployment or statefulsets)
 * 
 */

  async updateRequestMemory(type:string,namespace:string,name:string,finalInformation:string){
      this.type=type
      this.urls.push('http://localhost:3001/'+type+'/resources/'+namespace+'/requests/memory/'+name+'/'+finalInformation)
    /*axios.post('http://localhost:3001/'+type+'/resources/'+namespace+'/requests/memory/'+name+'/'+finalInformation).then(response => 
    (
      console.log(response)
   ))*/
   //this.feedback('Request Memory','O request de  memória foi atualizado com sucesso.')
    
  }

  async startqueue(){
    console.log(this.urls)
    this.$root.$emit('onChanger')
    axios.post('http://localhost:3001/geral/queue', { data: this.urls }).then(response => 
    (
      console.log(response)
    ))
    while ( this.estado.id != "4") {
                await this.delay( 10000 );

                await this.getState()
            }
    this.$root.$emit('onChager')
  }

  async created(){
        await this.getQueue()
          await this.delay( 5000 );
        if(this.queue.number!="0"){
          this.$root.$emit('onChanger')
           while ( this.estado.id != "4") {
                await this.delay( 10000 );

                await this.getState()
            }
          this.$root.$emit('onChanger')
        }
        this.$root.$on( 'feedback',async ( title : string, str : string, type:string ) => {
            this.type=type;
            this.estado.id = "1"
            while ( this.estado.id != "4") {
                console.log("inside"+this.estado.id)
                await this.delay( 10000 );

                await this.getState()
            }
            console.log("completed the cicle")
            this.$bvToast.toast( str, {
                title: title,
                variant: 'success',
                solid: true
            } );
            this.estado.id=0
            this.estado.msg="";
            this.updateValue(this.estado)
            
        } );
        await this.$root.$on( 'updateReplicas',this.updateReplicas);
        await this.$root.$on( 'updateLimitCpu',this.updateLimitCpu);
        await this.$root.$on( 'updateLimitMemory',this.updateLimitMemory);
        await this.$root.$on( 'updateRequestCpu',this.updateRequestCpu);
        await this.$root.$on( 'updateRequestMemory',this.updateRequestMemory);
        await this.$root.$on( 'startQueue',this.startqueue);
        
    }
 
}
</script>