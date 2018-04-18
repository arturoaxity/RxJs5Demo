import { Observable, Observer } from "rxjs";

let ouput = document.getElementById("output");
let button = document.getElementById("button");

let click = Observable.fromEvent(button,'click');
function load(url :string){
return Observable.create(observer => {
    let xhr = new XMLHttpRequest();
   
    xhr.addEventListener('load', () => {
      
        if (xhr.status === 200) {
            let jsonStar = JSON.parse(xhr.responseText);
            observer.next(jsonStar);
            observer.complete();
        } else {
            observer.error(xhr.statusText); 
        }
    });
    xhr.open('GET', url);
    xhr.send();
   
});
}

function renderStarWars(jsonStar){
    jsonStar.forEach(element => {
        let div = document.createElement('div');
        div.innerText = element.name;
        ouput.appendChild(div);
    });
}

click.subscribe(
    value => {
        load("starwars.json").subscribe(value => {
                                            renderStarWars(value);
                                        },
                                        error => {
                                            console.log(`Error : ${error}`);
                                        });
    },
    error => {
    },
    () => {
        console.log('Complete');
    }
);