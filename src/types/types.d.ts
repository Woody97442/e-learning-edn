interface User {
    id?: string;
    name: string;
    email: string;
    role?: string;
    badges?: Badge[];
}

interface Badge {
    id?: string;
    title: string;
    score: number;
    tentative: number;
    validated: boolean;
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

interface ModuleContent {
    id: number;
    subtitle: string;
    text: string;
}

interface Module {
    id: number;
    title: string;
    href: string;
    position: number;
    urlIllustration: string;
    content?: ModuleContent[];
}

interface Formation {
    id: number;
    title: string;
    modules: Module[];
    quizzes?: Quizz[];
}

interface Quizz {
    id: number;
    title: string;
    numberOfQuestions: number;
    questions: Question[];
}

interface Question {
    id: number;
    question: string;
    answers: Answer[]; // plusieurs réponses
}

interface Answer {
    id: number;
    text: string;
    isCorrect: boolean; // true si c'est la bonne réponse
}