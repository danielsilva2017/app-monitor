<template>
  <div>
    <div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <b-card title="Filtrar" class="bg-secondary">
                  <b-card-sub-title class="mb-2">Recurso:</b-card-sub-title>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input checked  type="radio" name="neovis" class="custom-control-input" id="cpu" value="cputime">
                        <label class="custom-control-label"  for="cpu">CPU</label>
                      </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="neovis" class="custom-control-input" id="ram" value="rss">
                        <label class="custom-control-label" for="ram">RAM</label>
                    </div>
                    <p></p>
                      <b-card-sub-title class="mb-2">Organizar por:</b-card-sub-title>
                      <div class="custom-control custom-radio custom-control-inline">
                        <input checked  type="radio" name="orderBy" class="custom-control-input" id="instancia" value="normal">
                        <label class="custom-control-label"  for="instancia">Instância</label>
                      </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="orderBy" class="custom-control-input" id="process" value="process">
                        <label class="custom-control-label" for="process">Processo</label>
                    </div>
                    <p></p>
                        <b-card-sub-title class="mb-2">Primeiro Processo</b-card-sub-title>
                        <b-select v-model="process1" id="process1" >
                        <option value="0" selected>Todos</option>
                         <option v-for="item in labels" :value="item" :key="item.id">
      {{ item }}
    </option>
    
                        </b-select>
                        <p></p>
                        <b-card-sub-title class="mb-2">Segundo Processo</b-card-sub-title>
                         <b-select v-model="process2" id="process2" >
                        <option value="0" selected>Todos</option>
                         <option v-for="item in labels" :value="item" :key="item.id">
      {{ item }}
    </option>
    
                        </b-select>
                        <p></p>
                        <b-card-sub-title class="mb-2">Primeiro Host/Instância</b-card-sub-title>
                        <b-select v-model="instance1" id="instance1" >
                        <option value="0" selected>Todas</option>
                        <option value="1">Instância 1</option>
                        <option value="2">Instância 2</option>
                        <option value="3">Instância 3</option>
                        <option value="4">Instância 4</option>
                        </b-select>
                        <p></p>
                         <b-card-sub-title class="mb-2">Segundo Host/Instância</b-card-sub-title>
                        <b-select v-model="instance2" id="instance2">
                        <option value="0" selected>Todas</option>
                        <option value="1">Instância 1</option>
                        <option value="2">Instância 2</option>
                        <option value="3">Instância 3</option>
                        <option value="4">Instância 4</option>
                        </b-select>
                        <p></p>
                       <b-button type="submit" variant="outline-success float-right" class="card-link" v-on:click="reDraw" v-b-modal.privacy>Atualizar</b-button>
                       
                    
                </b-card>
            </div>
          <div class="col-md-8">
            <div id="viz"></div>
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
  
    <b-modal size="huge" v-model="modalShow" :title="choosenNode">
      <div>
        <b-card no-body>
          <b-tabs card>
            <b-tab title="Informacao" active>
              <b-card-text>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.comm"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.cmd"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.pid"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.host"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                   <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.rss"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
                  <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <b-form-input
                              id="profSituation"
                              :placeholder="information.cont"
                              trim
                              readonly>
                      </b-form-input>
                  </b-form-group>
              </b-card-text>
            </b-tab>
            <b-tab title="Ação">
              <b-card-text>Tipo : {{type}}

                <b-form-group>
                      <template v-slot:prepend>
                          <b-input-group-text>
                          </b-input-group-text>
                      </template>
                      <p></p>
                      <b-card-sub-title class="mb-2">Réplicas</b-card-sub-title>
                      <b-form-input
                              id="replicas  "
                              :placeholder="replicas"
                              v-model="finalInformation.replicas"
                              trim>
                      </b-form-input>
                      <p></p>
                       <b-card-sub-title class="mb-2">Limite de  CPU</b-card-sub-title>
                      <b-form-input
                              id="replicas "
                              :placeholder="replicas"
                              v-model="finalInformation.limitcpu"
                              trim>
                      </b-form-input>
                      <p></p>
                       <b-card-sub-title class="mb-2">Limite de Memória </b-card-sub-title>
                      <b-form-input
                              id="replicas  "
                              :placeholder="replicas"
                              v-model="finalInformation.limitmemory"
                              trim>
                      </b-form-input>
                      <p></p>
                       <b-card-sub-title class="mb-2">Request CPU</b-card-sub-title>
                      <b-form-input
                              id="replicas "
                              :placeholder="replicas"
                              v-model="finalInformation.requestcpu"
                              trim>
                      </b-form-input>
                      <p></p>
                       <b-card-sub-title class="mb-2">Request Memory</b-card-sub-title>
                      <b-form-input
                              id="replicas  "
                              :placeholder="replicas"
                              v-model="finalInformation.requestmemory"
                              trim>
                      </b-form-input>
                  </b-form-group>
             
              </b-card-text>
            </b-tab>
          </b-tabs>
        </b-card>
      </div>
      <template v-slot:modal-footer="{ cancel, ok }">
            <b-button variant="outline-secondary" v-on:click="cancel()">Cancelar</b-button>
            <span class="flex-fill"></span>
            <b-button variant="warning" v-on:click="updateAll();ok()">Gravar</b-button>
     </template>

    </b-modal>
  </div>
</div>
</template>
<script >
var op;

async function draw(view) {
  op=view
  var config = {
    container_id: "viz",
    server_url: "neo4j://127.0.0.1:7687",
    server_user: "neo4j",
    server_password: "123456",
    labels: {
      Process: {
        caption: "cmd",
        size: "cputime",
        community: "host",
        clickEvent: properties => {
          console.log("op")
          var cmd = properties.properties
          if(properties.properties.fake==undefined){
            console.log("here")
            
             view.show(properties.properties.cont)
            view.choosenNode=properties.properties.cmd
            view.fill(properties.properties)
          }
        }
      }
    },
    relationships: {
      NoSocket2: {
        caption: false,
        thickness: "finish"
      }
    },

    initial_cypher:
      "match p=(p1)-[n:NoSocket2]-(p2) return p"
  };

  var viz = await new NeoVis.default(config);
  viz.registerOnEvent( 'completed', () => {
    view.nodes(viz._nodes)
} );
  
  var array = getArray()
  await viz.render(array,"normal");
  console.log("final")

}
function drawAgain(size, instance1, instance2,process1,process2,orderBy) {
  var conditions;
  if (size == undefined) {
    size="cputime"
  }
  
  if (instance1 != "0") {
    conditions = "p1.host contains '" + instance1 + "' ";
  } else {
    conditions = "p1.host contains 'inst' ";
  }
  if (instance2 != "0") {
    conditions += " and p2.host contains '" + instance2 + "' ";
  } else {
    conditions += " and p2.host contains 'inst' ";
  }
  if (process1 != "0") {
    conditions += " and p1.cmd contains '" + process1 + "' ";
  } 
  if (process2 != "0") {
    conditions += " and p2.cmd contains '" + process2 + "' ";
  } 
  
  
  var config = {
     container_id: "viz",
    server_url: "neo4j://127.0.0.1:7687",
    server_user: "neo4j",
    server_password: "123456",
    labels: {
      Process: {
        caption: "cmd",
        size: size,
        community: "host",
        clickEvent:properties =>{
            if(properties.properties.fake==undefined){
              console.log("here 2")
              op.show(properties.properties.cont)
              op.choosenNode=properties.properties.cmd
              op.fill(properties.properties)
          }

        }
      }
    },
    relationships: {
      CONNECTED_TO: {
        caption: false,
        thickness: "sent_bytes"
      }
    },
    initial_cypher:
      "match p=(p1)-[n:NoSocket2]-(p2) where " +
      conditions +
      " return p"
  };
  var viz = new NeoVis.default(config);
  var array = getArray()
 viz.render(array,orderBy);
}
function reDraw() {
  var a = document.getElementById("instance1");
  var b = document.getElementById("instance2");
  var d = document.getElementById("process1");
  var e = document.getElementById("process2");
  var c = document.getElementsByName("neovis");
  var f =document.querySelector('input[name = orderBy]:checked').value;
  var c_value;
  for (var i = 0; i < c.length; i++) {
    if (c[i].checked) {
      c_value = c[i].value;
      break;
    }
  }

  drawAgain(c_value, a.value, b.value,d.value,e.value,f);
}


/**

  * This a Vue js Page but has an neovis component that is pure HTMl thats why some functions are duplicated.
  * Imports:
  * @param {string} objectPath is used to recursively verify if any part of the json is undefined
*/

//xd
import { Component, Vue, Prop } from "vue-property-decorator";
import {nodes} from '../assets/nodes.js'
import {getArray, saveToArray} from '../../public/json'
import objectPath from 'object-path'
@Component()
export default class NeoVisComponent extends Vue {
  modalShow=false;
  information="teste"
  labels =[];
  instance1="0";
  instance2="0";
  process1="0";
  process2="0";
  choosenNode=null;
  type="teste";
  name="teste";
  estado={id:"0",msg:""}
  maximo=100;
  valor=0;
  replicas=0;
  originalInformation={replicas:null,limitcpu:null,limitmemory:null,requestcpu:null,requestmemory:null}
  finalInformation={replicas:null,limitcpu:null,limitmemory:null,requestcpu:null,requestmemory:null}
  information={cmd:null,host:null,rss:null,pid:null,cont:null,comm:null}
  
  reDraw() {
    reDraw();
  }
  drawAgain(a,b,c){
    drawAgain(a,b,c);
  }
  nodes(arr){
    
    for(let key in arr){
      if(!this.labels.includes(arr[key].label)  && arr[key].label!="Socket" && arr[key].label!=undefined && arr[key].originalProperties.fake!="true" ){
        this.labels.push(arr[key].label)
      }
    }
    
  }

  verify ( a, b ) { 
    console.log("inside now"+a)
    return a != undefined ? a : b }
  async  show(cont){
    var arr = cont.split('/')
    var temp= arr[2]
    temp=temp.substr(3)
    var pods;
    var type;
    var name;
   
    await this.$http.get('http://localhost:3000/pods').then(response => 
    (
     
     pods=response.data[0].items
   ))
    for(let i=0;i<pods.length;i++){
     
      if(pods[i].metadata.uid==temp){
        console.log("inside")
        this.type=pods[i].metadata.ownerReferences[0].kind.toLowerCase()
        this.name= pods[i].metadata.ownerReferences[0].name
        break;
      }
   }
    if(this.type=="replicaset"){
     var deploymentName;
     console.log('sippphttp://localhost:3000/replicaset/'+this.name)
        await this.$http.get('http://localhost:3000/replicaset/'+this.name).then(response => 
        (
          this.name= response.data.metadata.ownerReferences[0].name
        ))
        this.type="deployment"
        
    }
   
    console.log('hiii http://localhost:3000/'+this.type+'/'+this.name)
    await this.$http.get('http://localhost:3000/'+this.type+'/'+this.name).then(response => 
      {
        console.log(JSON.stringify(response.data))
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
    this.modalShow=true
 }

  async updateAll(){
    if(this.originalInformation.replicas!=this.finalInformation.replicas) await this.updateReplicas()
    if(this.originalInformation.limitcpu!=this.finalInformation.limitcpu) await this.updateLimitCpu()
    if(this.originalInformation.limitmemory!=this.finalInformation.limitmemory) await this.updateLimitMemory()
    if(this.originalInformation.requestcpu!=this.finalInformation.requestcpu) await this.updateRequestCpu()
    if(this.originalInformation.requestmemory!=this.finalInformation.requestmemory) await this.updateRequestMemory()

    
  }

  async updateValue(state){
    console.log("lll"+state)
    if(state.id=="1"){this.valor=25}
    else if(state.id=="2"){this.valor=50}
    else if(state.id=="3"){this.valor=75}
    else if (state.id=="4"){this.valor=100}
    else{this.valor=0}
    this.estado.msg=state.msg
  }

  async getState(){
    console.log("getting state")
    this.$http.get('http://localhost:3000/'+this.type+'/state/state').then(response => 
    {
      this.estado.id=response.data.id
      this.estado.msg=response.data.msg
      
    })
    await this.updateValue(this.estado)
    console.log("estado"+this.estado.id)
  }

  async feedback(title,str){
     this.estado.id = "1"
    
    while ( this.estado.id != "4") {
        await this.delay( 10000 );

        await this.getState()
    }
      this.$bvToast.toast( str, {
          title: title,
          variant: 'success',
          solid: true
      } );
      this.estado.id=0
      this.estado.msg="";
  }
 async updateReplicas(){
    
      this.$http.post('http://localhost:3000/'+this.type+'/replicas/'+this.name+'/'+this.finalInformation.replicas).then(response => 
    (
      console.log(response)
   ))
  this.feedback('Número Réplicas','O número de réplicas foi atualizado com sucesso.')
}

delay ( time ) {
    return new Promise( resolve => setTimeout( resolve, time ) )
}
 async updateLimitCpu(){
    console.log('http://localhost:3000/'+this.type+'/resources/limits/cpu/'+this.name+'/'+this.finalInformation.limitcpu)

      this.$http.post('http://localhost:3000/'+this.type+'/resources/limits/cpu/'+this.name+'/'+this.finalInformation.limitcpu).then(response => 
    (
      console.log("tag"+response)
   ))
    this.feedback('Limite cpu','O limite de cpu foi atualizado com sucesso.')
  }
  async updateLimitMemory(){
    
      this.$http.post('http://localhost:3000/'+this.type+'/resources/limits/memory/'+this.name+'/'+this.finalInformation.limitmemory).then(response => 
    (
      console.log(response)
   ))

   this.feedback('Limite memória','O limite de memória foi atualizado com sucesso.')
    
  }

   async updateRequestCpu(){
    console.log("poro cpu")
  console.log('http://localhost:3003/'+this.type+'/resources/requests/cpu/'+this.name+'/'+this.finalInformation.requestcpu)
      this.$http.post('http://localhost:3000/'+this.type+'/resources/requests/cpu/'+this.name+'/'+this.finalInformation.requestcpu).then(response => 
    (
      console.log("tag"+response)
   ))
   this.feedback('Request cpu','O request de cpu foi atualizado com sucesso.')
    
  }
  async updateRequestMemory(){
    
      this.$http.post('http://localhost:3000/'+this.type+'/resources/requests/memory/'+this.name+'/'+this.finalInformation.requestmemory).then(response => 
    (
      console.log(response)
   ))
   this.feedback('Request Memory','O request de  memória foi atualizado com sucesso.')
    
  }
   
  async fill(information){
    this.information.cmd=information.cmd
    this.information.host=information.host
    this.information.comm=information.comm
    this.information.rss=information.rss/1024
    this.information.rss=this.information.rss.toString()+" MB"
    this.information.pid=information.ppid
    this.information.cont=information.cont
  }
  
  mounted() {
    draw(this); 
  }

  
}
</script>
<style>
html,
body {
  font: 12pt arial;
}

#viz {
  
  height: 500px;
  border: 1px solid lightgray;
  font: 22pt arial;
}

.modal .modal-huge {
  max-width: 80%;
  width: 80%;
}

.form{
   font-size: 40px important!
}
.syntax--comment.syntax--block {
  color: cadetblue;
}
</style>