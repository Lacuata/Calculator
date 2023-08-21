<script>
    

    import { onMount } from "svelte";
    import { calculateExpression } from "$lib/calculation.js";
    // console.log(calculateExpression)

    let calculationResult = ''
    const colorGray = 'calculator-button gray-button" '
    const colorOrange = 'calculator-button orange-button'


    // const operators =['+', '-', '*', '/'];

    const calculatorButton = (value) =>{
            calculationResult += value;
            console.log(calculationResult)
            savedToLocalStorage();
    }
    // addded
    const fetchResultFromAPI = async (expression) => {
    const response = await fetch(`/api?expression=${encodeURIComponent(expression)}`);
    const data = await response.json();
    return parseFloat(data.result); // Parse the result as a number
};


//     function computeResult() {
//     const expression = calculationResult;
  
    // // Helper function to check if a character is an operator  and if it's exist in variable operatos if it's true
    // // if yes includes it in operators like + - / * to check 
    // const isOperator =(char) => { 
    //   return operators.includes(char); //returns it 
    // }
  
//     // Helper function to perform a single arithmetic operation the code is in below
//     const performOperation = (a, operator, b) => {
//       switch (operator) {
//         case '+':
//           return a + b;
//         case '-':
//           return a - b;
//         case '*':
//           return a * b;
//         case '/':
//           return a / b;
//         default:
//           throw new Error(`Invalid operator: ${operator}`);
//       }
//     }
  
//     //     \d+: This part matches one or more digits (numbers).
//     // |: This acts as an OR operator in the regular expression.
//     // \+|\-|\*|\/: These parts match the operators +, -, *, and /.

//     // Splitting the expression into numbers and operators and check if 
//     const tokens = expression.match(/(\d+|\+|\-|\*|\/)/g); //return an array of token where each token can be a digt number or operator
  
//     let currentNumber = parseFloat(tokens[0]); //get the first number
//     let currentOperator = null; //gonna become a operator
  
//     for (let i = 1; i < tokens.length; i++) {
//       const token = tokens[i];
//       if (isOperator(token)) { // token is an operator 
//         currentOperator = token; //reassigned it to currentOperator 
//       } else { 
//         const nextNumber = parseFloat(token); //if not a store in in nextNumber 
//         if (currentOperator) { // then since currentOperator will be updated it will run this because currentOperator is true
//           currentNumber = performOperation(currentNumber, currentOperator, nextNumber);
//           currentOperator = null; // then reassigned the currentOperator as null
//         }
//       }
//     }
  
//     calculationResult = currentNumber.toString(); // change the currentNumber to string so we can merge them not count 

//     savedToLocalStorage();

//   }


 const computeResult = async () => {
    const expression = calculationResult;
    try {
        const result = calculateExpression(expression); // Calculate locally
        if (result !== null) {
            calculationResult = result.toString();
            savedToLocalStorage();
        } else {
            console.error('Expression is empty or invalid');
        }
    } catch (error) {
        console.error('Local calculation error:', error);
        try {
            if (expression.trim()) { // Only call API if expression is not empty
                const result = await fetchResultFromAPI(expression); // Fetch from API
                calculationResult = result.toString();
                savedToLocalStorage();
            } else {
                console.error('Expression is empty');
            }
        } catch (apiError) {
            console.error('API fetch error:', apiError);
        }
    }

}


        const clearCalculator = () => {
            calculationResult =''
            savedToLocalStorage();

    }
    // to save the calculation result in localStorage
    const savedToLocalStorage = () =>{
        localStorage.setItem('calculationResult', JSON.stringify(calculationResult))

}

        // // to  get the localStorage and render it in calculationResult so even if we refresh the page their still there we are using onMount means everytime we go the the page it's gonna mount the calculationResult without destroying it
        onMount (() => {
            calculationResult = JSON.parse(localStorage.getItem('calculationResult')) ||'';

        })

</script>

<div id="calculator-apps">
        <h1>Calcu<span>lator</span></h1>
        <input type="text" class="calculation input" bind:value={calculationResult}>
        
        <p>
            <button class={colorGray} on:click={() => {
                calculatorButton(1)
            }}>1</button>
            <button class={colorGray} on:click={() => {
                calculatorButton(2)
            }}>2</button>
            <button class={colorGray} on:click={() => {
                calculatorButton(3)
            }}>3</button>
            <button class={colorOrange} on:click={() => {
                calculatorButton(' + ')
            }}>+</button>
        </p>
        <p>
            <button class={colorGray} on:click={() => {
                calculatorButton(4)
            }}>4</button>
            <button class={colorGray} on:click={() => {
                calculatorButton(5)
            }}>5</button>
            <button class={colorGray} on:click={() => {
                calculatorButton(6)
            }}>6</button>
            <button class={colorOrange} on:click={() => {
                calculatorButton(' - ')
            }}>-</button>
        </p>
        <p>
            <button class={colorGray} on:click={() => {
                calculatorButton(7)
            }}>7</button>
            <button class={colorGray} on:click={() => {
                calculatorButton(8)
            }}>8</button>
            <button class={colorGray} on:click={() => {
                calculatorButton(9)
            }}>9</button>
            <button class={colorOrange} on:click={() => {
                calculatorButton(' * ')
            }}>*</button>
        </p>
        <p>
            <button class={colorGray} on:click={() => {
                calculatorButton(0)
            }}>0</button>
            <button class={colorGray} on:click={() => {
                calculatorButton('.')
            }}>.</button>
            <button class={colorGray} on:click={computeResult}>=</button>
            <button class={colorOrange} on:click={() => {
                calculatorButton(' / ')
            }}>/</button>
        </p>
        <!-- class={type}-clear -->
        <p >
            <button class='{colorGray} clear-button' on:click={clearCalculator}>Clear</button>
        </p>
        <!-- <p class="result">
            Result: {calculationResult}
          </p> -->
    </div>


<style>
    h1{
    text-align: center;
    color: #fff;
}
span {
    color: red;
}

#calculator-apps {
    flex-direction: column;
    width: 400px;
    margin: 5% auto;
    text-align: center;
}

.calculation {
    color: #fff;
    width: 250px;
    font-size: 16px;
    height: 30px;
    margin-top: 15px;
    margin-bottom: 5px;
    padding: 0 10px;
    /* border: 1px solid red; */
}
.input{
    background-color: rgb(0, 0, 0);
}

p {
    display: block;
}

.gray-button {
    background-color: rgb(51, 51, 51);
    color: #fff;
}

.calculator-button {
    height: 60px;
    width: 60px;
    border-radius: 60px;
    border: none;
    font-size: 26px;
    cursor: pointer;
    margin-right: 5px;

}

.orange-button {
    background-color: rgb(254, 160, 10);
    color: white;
}


.clear-button {
    position: relative;
    right:100px;
    height: 60px;
    width: 60px;
    border-radius: 60px;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-left: 0px;
}
</style>

