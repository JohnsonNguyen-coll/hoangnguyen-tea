import { Pos } from './Pos';
import { Dim } from './Dim';
export declare class Box {
    readonly p: Pos;
    readonly d: Dim;
    constructor(p: Pos, d: Dim);
    static fromDomRect(rect: DOMRect): Box;
}
export declare function box(p: Pos, d: Dim): Box;
