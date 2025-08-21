import type { LoginCredentials, LoginResponse, RegisterResponse, User } from "../types/types";

export async function fakeLogin({ email, password }: LoginCredentials): Promise<LoginResponse> {
    await new Promise(r => setTimeout(r, 500));
    if (email === "test@test.com" && password === "123456") {
        return {
            ok: true,
            token: "fake-jwt-token",
            user: {
                id: "1",
                name: "Jean Dupont",
                email: "test@test.com",
            }
        };
    } else {
        return { ok: false, message: "Identifiants invalides" };
    }
}

export async function fakeGetUserInfo(token: string): Promise<User> {
    await new Promise(r => setTimeout(r, 300));
    if (token === "fake-jwt-token") {
        return {
            id: "1",
            name: "Jean Dupont",
            email: "test@test.com",
            role: "Utilisateur",
        };
    }
    throw new Error("Token invalide");
}

export async function fakeRegister({
    email,
    password,
}: {
    email: string;
    password: string;
}): Promise<RegisterResponse> {
    await new Promise((r) => setTimeout(r, 1000));

    if (!email.includes("@")) {
        return {
            ok: false,
            message: "Email invalide.",
        };
    }

    if (password.length < 6) {
        return {
            ok: false,
            message: "Le mot de passe doit faire au moins 6 caractères.",
        };
    }

    return {
        ok: true,
        token: "fake-jwt-token",
        user: {
            id: "user-xyz",
            email,
            name: email.split("@")[0],
        },
    };
}
