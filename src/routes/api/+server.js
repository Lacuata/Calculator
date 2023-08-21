
import { calculateExpression } from "$lib/calculation";

export const GET = async ({ query }) => {
  const expression = query.get('expression') || '';
  const result = calculateExpression(expression);

  return {
    body: {
      result,
    },
  };
};





// import {json } from '@sveltejs/kit'
// import {calculateExpression} from '$lib/calculation.js'

// export function GET(){
//     return json(calculateExpression)
// }