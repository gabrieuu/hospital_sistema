interface AuthStore{
    password: string;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    setPassword: (password: string) => void;
}