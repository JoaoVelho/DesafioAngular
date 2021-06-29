import { EventEmitter } from "@angular/core";

export class Emitters {
    static authEmitter = new EventEmitter<boolean>();

    static admEmitter = new EventEmitter<boolean>();
}