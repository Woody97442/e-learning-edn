
export async function fakeLogin({ email, password }: LoginCredentials): Promise<LoginResponse> {
    await new Promise(r => setTimeout(r, 500));
    if (email === "test@user.com" && password === "123456") {
        return {
            ok: true,
            token: "fake-jwt-token-user",
            user: {
                name: "Jean Dupont",
                email: "test@user.com",
            }
        };
    } else if (email === "test@admin.com" && password === "123456") {
        return {
            ok: true,
            token: "fake-jwt-token-admin",
            user: {
                name: "Jean Dujardin",
                email: "test@admin.com",
            }
        };
    } else {
        return { ok: false, message: "Identifiants invalides" };
    }
}

export async function fakeGetUserInfo(token: string): Promise<User> {
    await new Promise(r => setTimeout(r, 300));
    if (token === "fake-jwt-token-user") {
        return {
            id: "user-xyz",
            name: "Jean Dupont",
            email: "test@user.com",
            role: "user",
            badges: [
                { id: "1", title: "Cybersécurité", score: 89, tentative: 2, validated: true },
                { id: "2", title: "Dév Web", score: 100, tentative: 1, validated: true },
                { id: "3", title: "Quiz Cybersécurité", score: 100, tentative: 1, validated: true },
                { id: "4", title: "Quiz Dév Web", score: 100, tentative: 1, validated: true },
            ]
        };
    } else if (token === "fake-jwt-token-admin") {
        return {
            id: "admin-xyz",
            name: "Jean Dujardin",
            email: "test@admin.com",
            role: "admin",
            badges: []
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
