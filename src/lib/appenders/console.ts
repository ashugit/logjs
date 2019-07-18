import { LogAppender } from './../types';

export default class ConsoleAppender implements LogAppender{
    append(...args:any[]){
        console.log(args);
    }
}