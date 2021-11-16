// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Express {
  export interface Request {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: { id: string; username: string; email: string };
  }
}
