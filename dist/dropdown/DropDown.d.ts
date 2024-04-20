import * as React from 'react';
import { Box, Dim } from '../common';
import { Cmd, Maybe, Result, Sub, Task } from 'react-tea-cup';
export declare type Model = {
    tag: 'fresh';
} | {
    tag: 'ready';
    initData: InitData;
    placed: Maybe<Box>;
} | {
    tag: 'error';
    e: Error;
};
interface InitData {
    readonly refBox: Box;
    readonly windowDimensions: Dim;
    readonly uuid: string;
}
export declare type Msg = {
    tag: 'got-init-data';
    r: Result<Error, InitData>;
} | {
    tag: 'got-rendered-box';
    r: Result<Error, Box>;
} | {
    tag: 'request-close';
} | {
    tag: 'noop';
};
export declare type Renderer = () => React.ReactNode;
export declare function open(getRefBox: Task<Error, Box>): [Model, Cmd<Msg>];
export interface ViewDropDownProps {
    readonly renderer: Renderer;
    readonly model: Model;
}
export declare function ViewDropDown(props: ViewDropDownProps): React.ReactElement;
export declare type RequestClose = boolean;
export declare function update(msg: Msg, model: Model): [Model, Cmd<Msg>, RequestClose];
export declare function subscriptions(): Sub<Msg>;
export {};
