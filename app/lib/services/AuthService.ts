import { Modular } from "../di/service";
import { LoginResponse } from "../domain/models/LoginResponse";
import { IAuthRepository } from "../repositories/contracts/IAuthRepository";

const _AUTH_TOKEN_KEY = "authToken";

export class AuthService{
    constructor(private authRepository: IAuthRepository) {}

    private isClientSide(): boolean {
        return typeof window !== 'undefined';
    }

    saveCredentials(loginResponse: LoginResponse): void {
        if (!this.isClientSide()) return;
        localStorage.setItem(
            _AUTH_TOKEN_KEY, JSON.stringify(loginResponse));
    }

    getSavedToken(): LoginResponse | null {
        if (!this.isClientSide()) return null;
        const loginResponseData = localStorage.getItem(_AUTH_TOKEN_KEY);
        return  loginResponseData ? JSON.parse(loginResponseData) : null;
    }

    async login(email: string, password: string): Promise<LoginResponse | null> {
       try{
         const loginResponse = await this.authRepository.login(email, password);
         this.saveCredentials(loginResponse);
         return loginResponse;
       }catch(error){
         return null;
       }
    }

    async logout() : Promise<boolean> {
        await this.authRepository.logout().catch(() => {
            return false;
        });
        localStorage.removeItem(_AUTH_TOKEN_KEY);
        return true;
    }
}