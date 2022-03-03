"use strcit";

import { classCalculate } from "./classCalculate.mjs";
import { classOperation } from "./classOperation.mjs";

console.clear();

const jectCalculate = new classCalculate({

    arrayJectOperation: [

        new classOperation({

            numberPriority   : 0,
            stringOperation  : "+",
            functionOperation: function(numberOne = NaN, numberTwo = NaN) {
                
                if (numberOne && numberTwo && typeof(numberOne) === "number" && typeof(numberTwo) === "number") { return numberOne + numberTwo; };
            
            },

        }),
        new classOperation({

            numberPriority   : 0,
            stringOperation  : "-",
            functionOperation: function(numberOne = NaN, numberTwo = NaN) {
                
                if (numberOne && numberTwo && typeof(numberOne) === "number" && typeof(numberTwo) === "number") { return numberOne - numberTwo; };
            
            },

        }),
        new classOperation({

            numberPriority   : 1,
            stringOperation  : "/",
            functionOperation: function(numberOne = NaN, numberTwo = NaN) {
                
                if (numberOne && numberTwo && typeof(numberOne) === "number" && typeof(numberTwo) === "number") { return numberOne / numberTwo; };
            
            },

        }),
        new classOperation({

            numberPriority   : 1,
            stringOperation  : "*",
            functionOperation: function(numberOne = NaN, numberTwo = NaN) {
                
                if (numberOne && numberTwo && typeof(numberOne) === "number" && typeof(numberTwo) === "number") { return numberOne * numberTwo; };
            
            },

        }),

    ],

});

//jectCalculate.stringExpression = "5 + ((10 * 20 + 7.5 / 3) + 2 / 2) / (9 + 1)";
jectCalculate.stringExpression = "2 * 2 * 2";
jectCalculate.jectController.functionCalculate();
console.log(jectCalculate.arrayResultList);

//console.log("5 + 4 + 4".match(/[(]?[0-9]+(?:.[0-9]+)? (?:[+*/-] [0-9]+(?:.[0-9]+)? ?)+[)]?/g));