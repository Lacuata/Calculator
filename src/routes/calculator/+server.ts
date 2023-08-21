// calculator/+server.ts
// import { calculateExpression } from "../../lib/calculation";


// export const GET = async () => {
//     const initialData = {
//         calculationResult: '',
//     };
//     return {
//         body: initialData,
//     };
// };



import { calculateExpression } from "../../lib/calculation";

export const GET = async ({ params }) =>{
  const { expression } = params;

  if (expression) {
    const result = calculateExpression(expression);
    return {
      body: {
        result
      }
    };
  } else {
    return {
      status: 400,
      body: 'Invalid expression'
    };
  }
}


