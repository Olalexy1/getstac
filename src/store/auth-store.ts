import { AuthUser } from "@/types/auth";

export interface AuthUserWithPassword extends AuthUser {
  password: string;
}

export const mockUsers: AuthUserWithPassword[] = [
  {
    id: "1",
    email: "jane.doe@gmail.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Doe",
  },
  {
    id: "2",
    email: "john.smith@gmail.com",
    password: "password456",
    firstName: "John",
    lastName: "Smith",
  },
];

export function setAuthSession(user: AuthUser, durationMs?: number) {
  if (typeof window !== "undefined") {
    const session = durationMs
      ? { ...user, expiresAt: Date.now() + durationMs }
      : user;
    localStorage.setItem("auth-session", JSON.stringify(session));
  }
}

export function getAuthSession(): AuthUser | null {
  if (typeof window !== "undefined") {
    const sessionStr = localStorage.getItem("auth-session");
    if (!sessionStr) return null;
    try {
      const session = JSON.parse(sessionStr);
      if (session.expiresAt && typeof session.expiresAt === "number") {
        if (Date.now() > session.expiresAt) {
          localStorage.removeItem("auth-session");
          return null;
        }
        // Remove expiresAt from the returned user value
        delete session.expiresAt;
        return session as AuthUser;
      }
      return session as AuthUser;
    } catch {
      localStorage.removeItem("auth-session");
      return null;
    }
  }
  return null;
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth-session");
  }
}
