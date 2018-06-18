declare interface Array<T> {
    filterMap(filterCallback: (element: any, index?: number, origArray?: Array<T>) => boolean,
              mapCallback: (element: any, index?: number, origArray?: Array<T>) => Array<any>,
              thisArg?: any
    ): Array<any>;
}