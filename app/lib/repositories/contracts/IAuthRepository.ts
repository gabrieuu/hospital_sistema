import { LoginResponse } from "../../domain/models/LoginResponse";

export interface IAuthRepository {
    login(email: string, password: string): Promise<LoginResponse>;
    logout(): Promise<boolean>;
}