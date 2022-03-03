export class classOperation {

    constructor(

        jectTransmit = {

            numberPriority   : 0,
            stringOperation  : "",
            functionOperation: function() {},

        },

    ) {

        const {

            numberPriority,
            stringOperation,
            functionOperation,

        } = jectTransmit;

        if (stringOperation) {

            if (typeof(stringOperation) !== "string") {
                
                throw new Error(" X - 1001 - переданный символ операции не является строкой;");
            
            };
            if (stringOperation.match(/[0-9 )(]/)) {
                
                throw new Error();
            
            };

        } else {
            
            throw new Error(` X - 1003 - строка операции не указана;`);
        
        };
        if (functionOperation) {

            if (!(functionOperation instanceof Function)) {

                throw new Error(` X - 1004 - переданная функция операции не является функцией;`);

            };

        } else {
            
            throw new Error(` X - 1005 - функция операции не указана;`);
        
        }

        this.numberPriority    = numberPriority;
        this.stringOperation   = stringOperation;
        this.functionOperation = functionOperation;

    };

};