if (!Array.prototype.filterMap) {
    Array.prototype.filterMap = function filterMap(
            filterCallback: (element: any, index?: number, origArray?: any[]) => boolean,
            mapCallback: (element: any, index?: number, origArray?: any[]) => any,
            thisArg?: any
        ) {
        let origArrayIndex, newArrayIndex;
        if (this == null) {
            throw new TypeError('this is null or not defined');
        }
        if (typeof filterCallback !== 'function') {
            throw new TypeError(filterCallback + ' is not a function');
        }
        if (typeof mapCallback !== 'function') {
            throw new TypeError(mapCallback + ' is not a function');
        }
        if (filterCallback.length > 1) {
            console.warn('WARNING: use of the index parameter in "filterCallback"\
 for mapFilter may not operate as you expect. Array elements may not be mapped to the\
 same index in the returned array depending on the result of filterCallback.');
        }
        if (mapCallback.length > 1) {
            console.warn('WARNING: use of the index parameter in "mapCallback" or\
 for mapFilter may not operate as you expect. Array elements may not be mapped to the\
 same index in the returned array depending on the result of filterCallback.');
        }

        const len = this.length >>> 0;
        const newArray = new Array(len);

        origArrayIndex = 0;
        newArrayIndex = 0;

        while (origArrayIndex < len) {
            let mappedValue;
            if (origArrayIndex in this) {
                if (filterCallback.call(thisArg, this[origArrayIndex], origArrayIndex, this)) {
                    mappedValue = mapCallback.call(thisArg, this[origArrayIndex], origArrayIndex, this);
                    newArray[newArrayIndex++] = mappedValue;
                }
            }
            origArrayIndex++;
        }
        newArray.length = newArrayIndex;
        return newArray;
    };
}
