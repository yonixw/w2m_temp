import * as Comlink from 'comlink';

export type IWorker = {
    counter: number,
    inc: ()=>void
}

const obj = {
  counter: 0,
  inc() {
    this.counter++;
    console.log(this.counter);
  }
};

Comlink.expose(obj);