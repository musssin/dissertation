/* eslint-disable @typescript-eslint/no-explicit-any */
import httpContext from 'express-http-context';
function loggingBefore (request: any, response: any, next?: (err?: any) => any): any {
  console.log('set traceId = 123');
  httpContext.set('traceId', 123);
  next();
}

function loggingAfter (request: any, response: any, next?: (err?: any) => any): any {
  console.log(`tracedId = ${httpContext.get}`);
  next();
}
export {loggingAfter, loggingBefore};