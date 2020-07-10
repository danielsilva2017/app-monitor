<template>
     <div class="container">
        <div class="row">
            <div class="col-md-4">
                <b-card  width="100"  class="bg-secondary small" border-variant="secondary" header="Id do Pod" header-border-variant="secondary" no-body>
                    <b-card-body>
                        <b-card-text  class="small">{{originalInformation.podId != null ? originalInformation.podId : 'Nenhum nó selecionado'}}</b-card-text>
                        
                    </b-card-body>
                </b-card>
                <b-card  class="bg-secondary small" border-variant="secondary" header="Nome do Pod" header-border-variant="secondary" no-body>
                    <b-card-body>
                        <b-card-text class="small">{{originalInformation.podName != null ? originalInformation.podName: 'Nenhum nó selecionado'}}</b-card-text>
                    </b-card-body>
                </b-card>
                <b-card title="Filtrar" class="bg-secondary small" border-variant="secondary" header="Réplicas" header-border-variant="secondary" no-body>
                    <b-card-body>
                        <b-card-text v-if="!isEditing" class="small">{{finalInformation.replicas != null ? finalInformation.replicas : 'Nenhum nó selecionado'}}</b-card-text>
                        <input type="text"  v-if="isEditing" class="form-control form-control-sm" v-model="finalInformation.replicas"/>
                        
                    </b-card-body>
                </b-card>
                <b-card title="Filtrar" class="bg-secondary small" border-variant="secondary" header="Limite de CPU" header-border-variant="secondary" no-body>
                    <b-card-body>
                        <b-card-text v-if="!isEditing" class="small">{{finalInformation.limitcpu != null ? originalInformation.limitcpu : 'Nenhum nó selecionado'}}</b-card-text>
                        <input type="text"  v-if="isEditing" class="form-control form-control-sm" v-model="finalInformation.limitcpu"/>
                    </b-card-body>
                </b-card>
                <b-card title="Filtrar" class="bg-secondary small" border-variant="secondary" header="Limite de Memória" header-border-variant="secondary" no-body>
                    <b-card-body>
                        <b-card-text v-if="!isEditing" class="small">{{finalInformation.limitmemory != null ? finalInformation.limitmemory : 'Nenhum nó selecionado'}}</b-card-text>
                        <input type="text"  class="form-control form-control-sm" v-if="isEditing" v-model="finalInformation.limitmemory"/>

                    </b-card-body>
                </b-card>
                <b-card title="Filtrar" class="bg-secondary small" border-variant="secondary" header="Request CPU" header-border-variant="secondary" no-body>
                    <b-card-body>
                        <b-card-text v-if="!isEditing" class="small">{{finalInformation.requestcpu != null ? finalInformation.requestcpu : 'Nenhum nó selecionado'}}</b-card-text>
                        <input type="text" class="form-control form-control-sm" v-if="isEditing" v-model="finalInformation.requestcpu"/>

                    </b-card-body>
                </b-card>
                <b-card title="Filtrar" class="bg-secondary small" border-variant="secondary" header="Request Memória" header-border-variant="secondary" no-body>
                    <b-card-body>
                        <b-card-text v-if="!isEditing" class="small">{{finalInformation.requestmemory != null ? finalInformation.requestmemory : 'Nenhum nó selecionado'}}</b-card-text>
                        <input type="text" class="form-control form-control-sm" v-if="isEditing" v-model="finalInformation.requestmemory"/>

                    </b-card-body>
                </b-card>
                <p></p>
                <b-button variant="primary"  v-if="isEditing" size="sm" @click="reset()">Cancelar</b-button>
                <b-button  :variant="variant" size="sm" @click="change()">{{button}}</b-button>

               
            </div>
            <div class="col-md-8">
                <div id="vizp"></div>
                <p></p>
            <div>  <b-progress :max="maximo" height="2rem">
                      <b-progress-bar :value="valor">
                        Estado - {{estado.msg}}: <strong>{{ valor.toFixed(2) }} / {{ maximo }}</strong>
                      </b-progress-bar>
                    </b-progress>
            </div>
            </div>
           
        </div>
    </div>

</template>

<script>
//Render scripts
var op;
async function draw(view) {
  console.log("poderino")
  op=view
  var config = {
    container_id: "vizp",
    server_url: "neo4j://127.0.0.1:7687",
    server_user: "neo4j",
    server_password: "123456",
    labels: {
      Pod: {
        caption:"cont",
        clickEvent: properties => {
          console.log("Lol")
          view.show(properties.properties.cont)
        }
      }
    },
    relationships: {
      Pod: {
        caption: false,
        thickness: "sent_bytes"
      }
    },

    initial_cypher:
      "MATCH p=(p1)-[r:Pod]->(p2) RETURN p "
  };

  var viz =  new NeoVis.default(config);
  var array = getArray()
  console.log("hereee")
  viz.render(array,"normal","vizp");

}


//Imports
import { Component, Vue, Prop } from "vue-property-decorator";
import {nodes} from '../assets/nodes.js'
import {getArray, saveToArray} from '../../public/json'
import objectPath from 'object-path'
@Component()
export default class HostsComponent extends Vue {
 //pod's atributes  when  we clicked
  originalInformation={podId:null,podName:null,replicas:null,limitcpu:null,limitmemory:null,requestcpu:null,requestmemory:null}
  //pod's information when we close the modal
  finalInformation={replicas:null,limitcpu:null,limitmemory:null,requestcpu:null,requestmemory:null}
  modalShow=false;
  choosenTitle="";
  type="";
  estado={id:"0",msg:""}
  maximo=100;
  valor=0;
  isEditing=false;
  variant="info"
  button="Editar"
  change(){
      if(this.isEditing==true){
          this.isEditing=!this.isEditing
          this.updateAll()
          this.button="Gravar"
      }else{
          this.isEditing=!this.isEditing
          this.button="Editar"
      }
      
      
  }
  async  show(cont){
      this.choosenNode=cont
   /* var arr = cont.split('/')
    var temp;
    if(arr.length==4){
      temp= arr[2]
    }else{
      temp= arr[1]
    }
    console.log("response"+temp)*/
    console.log("conting "+cont)
    this.originalInformation.podId=cont
    var temp=cont
    var pods;
    var type;
    var name;
   
    await this.$http.get('http://localhost:3000/pods').then(response => 
    (
     
     pods=response.data[0].items
   ))
    for(let i=0;i<pods.length;i++){
     
      if(pods[i].metadata.uid==temp){
        this.type=pods[i].metadata.ownerReferences[0].kind.toLowerCase()
        this.name= pods[i].metadata.ownerReferences[0].name
        this.namespace=pods[i].metadata.namespace;
        break;
      }
   }
   console.log("UAAAA"+this.namespace)
    if(this.type=="replicaset"){
     var deploymentName;
     console.log('sippphttp://localhost:3000/'+this.type+'/'+this.name+'/'+this.namespace)
        await this.$http.get('http://localhost:3000/replicaset/'+this.name+"/"+this.namespace).then(response => 
        (
          this.name= response.data.metadata.ownerReferences[0].name
        ))
        this.type="deployment"
        
    }
   
    console.log('hiii http://localhost:3000/'+this.type+'/'+this.name)
    await this.$http.get('http://localhost:3000/'+this.type+'/'+this.name+'/'+this.namespace).then(response => 
      {
        this.originalInformation.podName=response.data.metadata.name
        this.finalInformation.replicas=this.verify(response.data.spec.replicas,0)
        this.finalInformation.limitcpu=this.verify(objectPath.get( response.data, 'spec.template.spec.containers.0.resources.limits.cpu' ),0)
        this.finalInformation.limitmemory=this.verify(objectPath.get( response.data, 'spec.template.spec.containers.0.resources.limits.memory' ),0)
        this.finalInformation.requestcpu=this.verify(objectPath.get( response.data,'spec.template.spec.containers.0.resources.requests.cpu'),0)
        this.finalInformation.requestmemory=this.verify(objectPath.get( response.data,'spec.template.spec.containers.0.resources.requests.memory'),0)
      })
    
    this.originalInformation.replicas=this.finalInformation.replicas
    this.originalInformation.limitcpu=this.finalInformation.limitcpu
    this.originalInformation.limitmemory=this.finalInformation.limitmemory
    this.originalInformation.requestcpu=this.finalInformation.requestcpu
    this.originalInformation.requestmemory=this.finalInformation.requestmemory
    
 }

 verify ( a, b ) { return a != undefined ? a : b }
  async updateAll(){
    if(this.originalInformation.replicas!=this.finalInformation.replicas) await this.updateReplicas()
    if(this.originalInformation.limitcpu!=this.finalInformation.limitcpu) await this.updateLimitCpu()
    if(this.originalInformation.limitmemory!=this.finalInformation.limitmemory) await this.updateLimitMemory()
    if(this.originalInformation.requestcpu!=this.finalInformation.requestcpu) await this.updateRequestCpu()
    if(this.originalInformation.requestmemory!=this.finalInformation.requestmemory) await this.updateRequestMemory()
    
    
  }

  /**
   * 
   * Function used to update the value presented in the Progress   depending on the state
   * @param {string} state current state 
   * 
   */

  async updateValue(state){
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
    this.$http.get('http://localhost:3000/'+this.type+'/state/state/state').then(response => 
    {
      this.estado.id=response.data.id
      this.estado.msg=response.data.msg
      
    })  
    await this.updateValue(this.estado)
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

  async feedback(title,str){
     this.estado.id = "1"
    
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

delay ( time ) {
    return new Promise( resolve => setTimeout( resolve, time ) )
}

/**
 * 
 * Function that calls the api yamlChanger in order to change the number of replicas of one service 
 * (deployment or statefulsets)
 * 
 */

 async updateReplicas(){
    
      this.$http.post('http://localhost:3000/'+this.type+'/replicas/'+this.namespace+'/'+this.name+'/'+this.finalInformation.replicas).then(response => 
    (
      console.log(response)
   ))
  this.feedback('Número Réplicas','O número de réplicas foi atualizado com sucesso.')
}


/**
 * 
 * Function that calls the api yamlChanger in order to change the cpu limit of one service 
 * (deployment or statefulsets)
 * 
 */

 async updateLimitCpu(){
    console.log('http://localhost:3000/'+this.type+'/resources/limits/cpu/'+this.name+'/'+this.finalInformation.limitcpu)

      this.$http.post('http://localhost:3000/'+this.type+'/resources/'+this.namespace+'/limits/cpu/'+this.name+'/'+this.finalInformation.limitcpu).then(response => 
    (
      console.log("tag"+response)
   ))
    this.feedback('Limite cpu','O limite de cpu foi atualizado com sucesso.')
  }

  /**
 * 
 * Function that calls the api yamlChanger in order to change the memory limit of one service 
 * (deployment or statefulsets)
 * 
 */
  async updateLimitMemory(){
    
      this.$http.post('http://localhost:3000/'+this.type+'/resources/'+this.namespace+'/limits/memory/'+this.name+'/'+this.finalInformation.limitmemory).then(response => 
    (
      console.log(response)
   ))

   this.feedback('Limite memória','O limite de memória foi atualizado com sucesso.')
    
  }

/**
 * 
 * Function that calls the api yamlChanger in order to change the request cpu of one service 
 * (deployment or statefulsets)
 * 
 */

  async updateRequestCpu(){
    console.log("poro cpu")
  console.log('http://localhost:3003/'+this.type+'/resources/requests/cpu/'+this.name+'/'+this.finalInformation.requestcpu)
      this.$http.post('http://localhost:3000/'+this.type+'/resources/'+this.namespace+'/requests/cpu/'+this.name+'/'+this.finalInformation.requestcpu).then(response => 
    (
      console.log("tag"+response)
   ))
   this.feedback('Request cpu','O request de cpu foi atualizado com sucesso.')
    
  }

/**
 * 
 * Function that calls the api yamlChanger in order to change the request memory of one service 
 * (deployment or statefulsets)
 * 
 */

  async updateRequestMemory(){
    
      this.$http.post('http://localhost:3000/'+this.type+'/resources/'+this.namespace+'/requests/memory/'+this.name+'/'+this.finalInformation.requestmemory).then(response => 
    (
      console.log(response)
   ))
   this.feedback('Request Memory','O request de  memória foi atualizado com sucesso.')
    
  }
  
 reset(){
    this.finalInformation.replicas=this.originalInformation.replicas
    this.finalInformation.limitcpu=this.originalInformation.limitcpu
    this.finalInformation.limitmemory=this.originalInformation.limitmemory
    this.finalInformation.requestcpu=this.originalInformation.requestcpu
    this.finalInformation.requestmemory=this.originalInformation.requestmemory
    this.isEditing=!this.isEditing
    this.button="Editar"
 }
  


mounted(){
    draw(this)
}
}
</script>
<style scoped>
#vizp {
  
  height: 500px;
  border: 1px solid lightgray;
  font: 22pt arial;
}

.card-header{
    padding: 0.5rem 1.25rem;
}

.card-body{
    padding: 0.5rem 1.25rem;
}

.op{
    padding: 0.5rem  !important;
}
</style>

<!-- <b-modal size="huge" v-model="modalShow" :title="choosenNode">
            
            <b-card no-body>
          
              <b-card-text class="op">
                Tipo : {{type}}
              </b-card-text>
               <b-card-text class="op"> Nome: {{originalInformation.podName}}</b-card-text>

                <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <p></p>
                      <b-card-sub-title class="mb-2">
                        Número de Réplicas
                        <span class="ml-1" v-b-tooltip.hover title="A alteração deste número pode levar a sob ou sobrecargas da orquestração">
                          <b-icon-info></b-icon-info>
                        </span>
                      </b-card-sub-title>
                      <b-form-input
                              v-model="finalInformation.replicas"
                              trim>
                      </b-form-input>
                      <p></p>
                      <b-card-sub-title class="mb-2">
                        Limite de Cpu
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre maior ou igual ao request cpu e deve ter em conta a orquestração podendo levar a falhas ">
                          <b-icon-info></b-icon-info>
                        </span>
                      </b-card-sub-title>
                      <b-form-input
                              v-model="finalInformation.limitcpu"
                              trim>
                      </b-form-input>
                      <p></p>
                      <b-card-sub-title class="mb-2">
                        Limite de Memória
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre maior ou igual ao request memory e deve ter em conta a orquestração podendo levar a falhas ">
                          <b-icon-info></b-icon-info>
                        </span>
                      </b-card-sub-title>
                      <b-form-input
                              v-model="finalInformation.limitmemory"
                              trim>
                      </b-form-input>
                      <p></p>
                      <b-card-sub-title class="mb-2">
                        Request CPU
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre menor ou igual ao limite de cpu">
                          <b-icon-info></b-icon-info>
                        </span>
                      </b-card-sub-title>
                      <b-form-input
                              v-model="finalInformation.requestcpu"
                              trim>
                      </b-form-input>
                      <p></p>
                      <b-card-sub-title class="mb-2">
                        Request Memory
                        <span class="ml-1" v-b-tooltip.hover title="Este número deve ser sempre menor ou igual ao limite de memória">
                          <b-icon-info></b-icon-info>
                        </span>
                      </b-card-sub-title>
                      <b-form-input
                              v-model="finalInformation.requestmemory"
                              trim>
                      </b-form-input>
                  </b-form-group>
             
        </b-card>
          <template v-slot:modal-footer="{ cancel, ok }">
            <b-button variant="outline-secondary" v-on:click="cancel()">Cancelar</b-button>
            <span class="flex-fill"></span>
            <b-button variant="warning" v-on:click="updateAll();ok()">Gravar</b-button>
     </template>
            </b-modal>-->