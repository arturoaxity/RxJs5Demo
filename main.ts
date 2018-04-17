import { Observable, Observer } from "rxjs";

let ouput = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button,'click');
function load(url :string){
let xhr = new XMLHttpRequest();
xhr.addEventListener('load',() =>{
let jsonStar =JSON.parse(xhr.responseText);
jsonStar.forEach(element => {
    let div = document.createElement('div');
    div.innerText = element.name;
    ouput.appendChild(div);
});
});
xhr.open('GET', url);
xhr.send();
}
click.subscribe(
    value => {
        console.log(`click`);
        load("starwars.json");
    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);