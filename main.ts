
import { Observable, Observer } from "rxjs";
import { filter } from "rxjs/operators";
import { max } from "rxjs/operator/max";

interface ServicePersona{
    getAllPerson(url : string):any;
}
let ouput = document.getElementById("output");
let button = document.getElementById("button");
let click = Observable.fromEvent(button, 'click');

class ServicePersonaImpl implements ServicePersona {
    getAllPerson(url: string) {
        return Observable.create(Observer => {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener('load', () => {
                let fileJoson = JSON.parse(xhr.responseText);
                if (xhr.status === 200) {
                    Observer.next(fileJoson);
                    Observer.complete();
                } else {
                    Observer.error(xhr.statusText)
                }
            });
            xhr.open('GET', url);
            xhr.send();
        });
    }
   alumnosAprobados(Argumen){
       Argumen.forEach(element => {
           console.log(`Alumno aprovado : ${element.nombre} ${element.calificacion} `);
       });
   }
   calificacionAlta(Argumen){
       Argumen.forEach(element => {
           console.log(`Alumno Con calificacion mas alta : ${element.nombre} ${element.calificacion} `);
       });
   }
}
var service: ServicePersonaImpl = new ServicePersonaImpl();
click.subscribe(
    value => {
         service.getAllPerson('personas.json').
            subscribe(value => Observable.from(value)
             .filter((x:any) => x.calificacion >= 60).toArray()
                .subscribe(value => console.log(`${service.alumnosAprobados(value)}   ${Observable.from(value).max().toArray().subscribe(value => service.calificacionAlta(value))}`)));
    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);
