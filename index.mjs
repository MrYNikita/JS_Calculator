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
        new classOperation({

            numberPriority   : 1,
            stringOperation  : "\\^",
            functionOperation: function(numberOne = NaN, numberTwo = NaN) {
                
                if (numberOne && numberTwo && typeof(numberOne) === "number" && typeof(numberTwo) === "number") { return numberOne ** numberTwo; };
            
            },

        }),

    ],

});