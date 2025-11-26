import { create } from "zustand";
import { User } from "../domain/models";
import { Modular } from "../di/service";

interface UserStore{
    user: User | null,
    hospital: string,
    hospitalId: string,
}

export const useUserStore = create<UserStore>((set) => ({
    user: Modular.authService.getSavedToken()?.user || null,
    hospital: Modular.authService.getSavedToken()?.hospitalName || '',
    hospitalId: Modular.authService.getSavedToken()?.hospitalId || '',

}));