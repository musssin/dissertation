/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after' })
export class GlobalErrorHandler implements ExpressErrorMiddlewareInterface {
  error (error: any, request: any, response: any, next: () => any) {
    response.send({ ERROR: error.errors });
    next();
  }
}