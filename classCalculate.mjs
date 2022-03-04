import * as readline from 'node:readline';
import { stdin as input, stdout as output } from 'node:process';
import { classOperation } from "./classOperation.mjs";
import { emitKeypressEvents } from 'node:readline';

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

        this.jectInputer = new classCalculateInputer(this);
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
class classCalculateInputer extends classCalculateModule {

    constructor(jectCalculate) {
        
        super(jectCalculate)
    
        this.jectReadlineInterface = readline.createInterface({ input, output });

        process.stdin.on("keypress",(key,keyInfo) => {

            //console.log(keyInfo);

            switch(keyInfo.sequence) {

                case "\r"  : { this.jectCalculate.jectController.functionCalculate(); }; break;
                case "\b"  : { this.jectCalculate.stringExpression = this.jectCalculate.stringExpression.slice(0,this.jectCalculate.stringExpression.length - 1); } break;
                case "\x1B": { this.jectReadlineInterface.close(); }; break;
                default    : { this.jectCalculate.stringExpression += key; }; break;

            };
            //this.jectCalculate.stringExpression += key;
            console.clear();
            console.log(this.jectCalculate.stringExpression);

        });
    
    };

};
class classCalculateController extends classCalculateModule {

    constructor(jectCalculate) { super(jectCalculate); };

    functionCalculate() {

        const {
            
            stringSymbolUse,
            stringExpression,
        
        } = this.jectCalculate;

        let stringFind;

        while (
            
            stringFind = this.jectCalculate.stringExpression.match(new RegExp(`[(]-?[0-9]+(?:.[0-9]+)? (?:[${stringSymbolUse}] -?[0-9]+(?:.[0-9]+)? ?)+[)]`,"g"))?.[0] ??
            this.jectCalculate.stringExpression.match(new RegExp(`-?[0-9]+(?:.[0-9]+)? (?:[${stringSymbolUse}] -?[0-9]+(?:.[0-9]+)? ?)+`))?.[0]
            
        ) {

            let arrayNumberPair;
            let stringResultLocal = stringFind;

            this.jectCalculate.arrayJectOperation.forEach((jectOperationNow) => {

                const regexpParseOperation = new RegExp(`(?<numberOne>-?[0-9]+(?:.[0-9]+)?) [${jectOperationNow.stringOperation}] (?<numberTwo>-?[0-9]+(?:.[0-9]+)?)`); 

                while(arrayNumberPair = stringResultLocal.match(regexpParseOperation)) {

                    stringResultLocal = stringResultLocal.replace(
                        
                        regexpParseOperation,
                        jectOperationNow.functionOperation(arrayNumberPair.groups.numberOne - 0,arrayNumberPair.groups.numberTwo - 0)
                          
                    );
        
                };

            });

            this.jectCalculate.stringExpression = this.jectCalculate.stringExpression.replace(stringFind,stringResultLocal.match(/[(]?([^)]*)/)[1] + " ");

        };

        this.jectCalculate.arrayResultList.push(this.jectCalculate.stringExpression);

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