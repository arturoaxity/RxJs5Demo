import { Observable, Observer } from "rxjs";
let source = Observable.fromEvent(document,'mousemove').map((event:MouseEvent) => {
    return {
        x:event.clientX,
        y: event.clientY
    }
}).filter(elemen => {
    return elemen.x > 500;
});

source.subscribe(
    value => {
        console.log(`value: ${value.x} ${value.y}`);
    },
    error => {
        console.log(`Error: ${error}`);
    },
    () => {
        console.log('Complete');
    }
);