interface User {
    id: string;
    name: string;
    email: string;
    role?: string;
}

interface LoginCredentials {
    email: string;
    password: string;
}

interface LoginResponseSuccess {
    ok: true;
    token: string;
    user: User;
}

interface LoginResponseFail {
    ok: false;
    message: string;
}

type LoginPageProps = {
    onLogin: (token: string, user: User) => void;
};

type LoginResponse = LoginResponseSuccess | LoginResponseFail;

interface RegisterResponseSuccess {
    ok: true;
    token: string;
    user: User;
}

interface RegisterResponseFail {
    ok: false;
    message: string;
}

type RegisterPageProps = {
    onRegister: (token: string, user: User) => void;
    className?: string;
};

type RegisterResponse = RegisterResponseSuccess | RegisterResponseFail;

type DashboardProps = {
    token: string;
    onLogout: () => void;
};

interface Module {
    id: number;
    title: string;
    href: string;
}

interface Formation {
    id: number;
    title: string;
    modules: Module[];
}