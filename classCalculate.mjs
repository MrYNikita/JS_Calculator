import { classOperation } from "./classOperation.mjs";

export class classCalculate {

    stringSymbolUse    = "";
    stringExpression   = "";
    arrayResultList    = [];
    arrayJectOperation = [];

    constructor(

        jectTransmit = {

            stringExpression: "",
            arrayJectOperation: [],

        },

    ) {

        const {
            
            stringExpression,
            arrayJectOperation,
        
        } = jectTransmit;

        if (stringExpression) {

            if (typeof(stringExpression) !== "string") {
                
                throw new Error();
            
            };
            if (stringExpression.match(new RegExp(`[^0-9 ${this.stringSymbolUse}]`))) {
                
                throw new Error(); 
            
            };

        };
        if (arrayJectOperation) {

            if (!(arrayJectOperation instanceof Array)) {};
            
            this.arrayJectOperation = arrayJectOperation.filter((jectOperationNow) => {
                
                return jectOperationNow instanceof classOperation;

            });
            this.arrayJectOperation = this.arrayJectOperation.sort((jectOperationOne,jectOperationTwo) => {
                
                return jectOperationTwo.numberPriority - jectOperationOne.numberPriority;
            
            });
            
            this.arrayJectOperation.forEach((jectOperationNow) => {

                Array.from(jectOperationNow.stringOperation).forEach((stringSymbolNow) => {

                    if (!this.stringSymbolUse.includes(stringSymbolNow)) { this.stringSymbolUse += stringSymbolNow; }

                });

            });

        };

        this.jectController = new classCalculateController(this);
        this.jectOperationer = new classCalculateOperationer(this);

    };

};

class classCalculateModule {

    constructor(jectCalculate) {

        if (jectCalculate instanceof classCalculate) {

            this.jectCalculate = jectCalculate;

        } else {

            throw new Error(" X - 2101 - переданный экземпляр не является экземпляром jectCalculate;");

        };

    };

};
class classCalculateController extends classCalculateModule {

    constructor(jectCalculate) { super(jectCalculate); };

    functionCalculate() {

        const {
            
            stringSymbolUse,
            stringExpression,
        
        } = this.jectCalculate;

        let stringResult = stringExpression;

        while (stringResult.match(/[(][0-9]+(?:.[0-9]+)? (?:[+*/-] [0-9]+(?:.[0-9]+)? ?)+[)]/g)) {

            let stringFind = stringResult.match(/[(][0-9]+(?:.[0-9]+)? (?:[+*/-] [0-9]+(?:.[0-9]+)? ?)+[)]/g)[0];
            let stringResultLocal = stringFind;

            this.jectCalculate.arrayJectOperation.forEach((jectOperationNow) => {

                while(stringResultLocal.match(new RegExp(`([0-9]+(?:.[0-9]+)?) [${jectOperationNow.stringOperation}] ([0-9]+(?:.[0-9]+)?)`))) {

                    let numberD = stringResultLocal.match(new RegExp(`([0-9]+(?:.[0-9]+)?) [${jectOperationNow.stringOperation}] ([0-9]+(?:.[0-9]+)?)`));

                    numberD = jectOperationNow.functionOperation(numberD[1] - 0, numberD[2] - 0);
                    stringResultLocal = stringResultLocal.replace(new RegExp(`([0-9]+(?:.[0-9]+)?) [${jectOperationNow.stringOperation}] ([0-9]+(?:.[0-9]+)?)`),numberD);
        
                };

            });

            stringResult = stringResult.replace(stringFind,stringResultLocal.match(/[(]([^)]*)/)[1]);

        };

        let stringFind = stringResult.match(/[0-9]+(?:.[0-9]+)? (?:[+*/-] [0-9]+(?:.[0-9]+)? ?)+/g)[0];
        let stringResultLocal = stringFind;

        this.jectCalculate.arrayJectOperation.forEach((jectOperationNow) => {

            while(stringResultLocal.match(new RegExp(`([0-9]+(?:.[0-9]+)?) [${jectOperationNow.stringOperation}] ([0-9]+(?:.[0-9]+)?)`))) {

                let numberD = stringResultLocal.match(new RegExp(`([0-9]+(?:.[0-9]+)?) [${jectOperationNow.stringOperation}] ([0-9]+(?:.[0-9]+)?)`));

                numberD = jectOperationNow.functionOperation(numberD[1] - 0, numberD[2] - 0);
                stringResultLocal = stringResultLocal.replace(new RegExp(`([0-9]+(?:.[0-9]+)?) [${jectOperationNow.stringOperation}] ([0-9]+(?:.[0-9]+)?)`),numberD);
    
            };

        });

        stringResult = stringResult.replace(stringFind,stringResultLocal);
        
        this.jectCalculate.arrayResultList.push(stringResult);

    };

};
class classCalculateOperationer extends classCalculateModule {

    constructor(jectCalculate) { super(jectCalculate); };

    functionOperationAdd(

        jectTransmit = {

            stringOperation: "",
            functionOperation: function() {}, 

        },

    ) {
        
        this.jectCalculate.arrayJectOperation.push(new classOperation(jectTransmit));
    
    };
    functionOperationRemove(

        stringOperation = "",

    ) {

        const numberIndex = this.jectCalculate.arrayJectOperation.findIndex((jectOperationNow) => {

            if (stringOperationNow instanceof classOperation) {

                return stringOperationNow.stringOperation === stringOperation;

            };

        });

        this.jectCalculate.arrayJectOperation.splice(numberIndex,1);

    };
    functionOperationCalculate() {};

};