import type { SafeUser } from "../modules/users/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: SafeUser;
      requestId?: string;
    }
  }
}

export {};
