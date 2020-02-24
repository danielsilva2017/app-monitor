<template>
  <div>
    <div>
    <div class="container">
        <div class="row">
            <div class="col-md-4">
                <b-card title="Filtrar" class="bg-secondary">
                  
                      <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="neovis" class="custom-control-input" id="cpu" value="cputime">
                        <label class="custom-control-label" for="cpu">CPU</label>
                      </div>
                    <div class="custom-control custom-radio custom-control-inline">
                        <input type="radio" name="neovis" class="custom-control-input" id="ram" value="rss">
                        <label class="custom-control-label" for="ram">RAM</label>
                    </div>
                    <p></p>
                    <div class="col-md-12">
                        <b-select id="instance1" >
                        <option value="0" selected>Todas</option>
                        <option value="1">Instância 1</option>
                        <option value="2">Instância 2</option>
                        <option value="3">Instância 3</option>
                        <option value="4">Instância 4</option>
                        </b-select>

                        <b-select id="instance2">
                        <option value="0" selected>Todas</option>
                        <option value="1">Instância 1</option>
                        <option value="2">Instância 2</option>
                        <option value="3">Instância 3</option>
                        <option value="4">Instância 4</option>
                        </b-select>
                        <p></p>
                      <div class="col-md-11">
                       <b-button type="submit" variant="outline-success float-right" class="card-link" v-on:click="reDraw" v-b-modal.privacy>Atualizar</b-button>
                      </div>
                    
                    </div>
                </b-card>
            </div>
          
            <div id="viz" class="col-md-8" ></div>
              
        </div>
   </div>
    <b-modal size="huge" v-model="modalShow" title="Mais informação">
      
    </b-modal>
  </div>
</div>
</template>
<script >
var op;
async function draw(view) {
  op=view
  console.log("here");
  var config = {
    container_id: "viz",
    server_url: "bolt://localhost:7687",
    server_user: "snow",
    server_password: "snow123",
    labels: {
      Process: {
        caption: "cmd",
        size: "cputime",
        community: "community",
        clickEvent: properties => {
          
          var cmd = properties.properties
          view.show(cmd)
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
      "match p=(p1:Process)-[c1:CONNECTED_TO]->()<-[c2:CONNECTED_TO]-(p2:Process)    with sum(c1.sent_bytes+c2.sent_bytes)/1048576  as xd,p1,p2,c1,c2 match px=(p1)-[c1]->()<-[c2]-(p2) with sum(xd) as sumatorio,p1,p2,c1,c2 match pn=(p1)-[c1]->()<-[c2]-(p2) where sumatorio <> 0  return pn,p1.cmd,p2.cmd,p1.host,p2.host,sumatorio"
  };
  console.log(config);

  var viz = await new NeoVis.default(config);
  console.log(viz._nodes)
  view.nodes(viz._nodes)
  viz.render();

}
function drawAgain(size, instance1, instance2) {
  var conditions;
  console.log("x" + size);
  if (size == undefined) {
    console.log("xd");
  }
  if (instance1 != "0") {
    conditions = "p1.host contains '" + instance1 + "'";
  } else {
    conditions = "p1.host contains 'inst'";
  }
  if (instance2 != "0") {
    conditions += " and p2.host contains '" + instance2 + "'";
  } else {
    conditions += " and p2.host contains 'inst'";
  }
  var config = {
    container_id: "viz",
    server_url: "bolt://localhost:7687",
    server_user: "snow",
    server_password: "snow123",
    labels: {
      Process: {
        caption: "cmd",
        size: size,
        community: "community",
        clickEvent:properties =>{
          console.log("xd")
          op.show()
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
      "match p=(p1:Process)-[c1:CONNECTED_TO]->()<-[c2:CONNECTED_TO]-(p2:Process)    with sum(c1.sent_bytes+c2.sent_bytes)/1048576  as xd,p1,p2,c1,c2 match px=(p1)-[c1]->()<-[c2]-(p2) with sum(xd) as sumatorio,p1,p2,c1,c2 match pn=(p1)-[c1]->()<-[c2]-(p2) where sumatorio <> 0 and " +
      conditions +
      " return pn,p1.cmd,p2.cmd,p1.host,p2.host,sumatorio,p1.rss,p2.rss"
  };
  console.log(config.initial_cypher);
  var viz = new NeoVis.default(config);
  console.log(viz)
  viz.render();
}
function reDraw() {
  console.log("here boys")
  var a = document.getElementById("instance1");
  var b = document.getElementById("instance2");
  var c = document.getElementsByName("neovis");
  var c_value;
  for (var i = 0; i < c.length; i++) {
    if (c[i].checked) {
      c_value = c[i].value;
      break;
    }
  }

  drawAgain(c_value, a.value, b.value);
}

import { Component, Vue, Prop } from "vue-property-decorator";

@Component()
export default class NeoVisComponent extends Vue {
  modalShow=false;
  information="teste"
  
  reDraw() {
    reDraw();
  }
  drawAgain(a,b,c){
    drawAgain(a,b,c);
  }
  async nodes(arr){
    console.log(arr[Prop])
    console.log("here"+JSON.stringify(arr))

  }
  show(information){
    console.log("supp")
    this.information=information
    this.modalShow=!this.modalShow
    console.log(this.modalShow)
   
    
  }
  mounted() {
    draw(this);
    console.log(this.modalShow)
  }

  
}
</script>
<style>
html,
body {
  font: 16pt arial;
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
</style>