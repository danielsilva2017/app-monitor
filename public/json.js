var fs = require('browserify-fs');
var array = require('./load.json');
var a = {"teste":"lol"}
export function getArray(){
    return array
}



export async function saveToArray(){
    var same = false;
    for(var key in a){
        for(var key2 in array){
            if(key==key2){
                same=true
                break;
            }
        }
        if(same==false){
            array[key]=a[key]
        
        }
    }
    var jsonArray= JSON.stringify(array)
    function writeFile() {
        return new Promise((resolve, reject) => {
        fs.writeFile('./load.json', jsonArray,(writeErr) => {
            console.log('written in writeFile callback')
            if (writeErr) reject(writeErr)
            else resolve(null)
        })
    })}

    

}