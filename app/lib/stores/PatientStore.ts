import { create } from "zustand";
import { Patient } from "../domain/models";
import { Modular } from "../di/service";

interface PatientStore {
    patients : Patient[],
    filteredPatients: Patient[],
    isLoading: boolean,
    fetchPatients: () => Promise<void>,
    fetchFilteredPatients: (query: string) => Promise<void>,
}

export const usePatientStore = create<PatientStore>((set) => ({
    patients: [],
    filteredPatients: [],   
    isLoading: false,
    fetchPatients: async () => {
        const pacientes = await Modular.patientService.getAllPatients();
        set({ patients: pacientes });
    },
    fetchFilteredPatients: async (query: string) => {
        const pacientes: Patient[] = await Modular.patientService.getAllPatients();
        const filtered = pacientes.filter(p =>
        p.nome.toLowerCase().includes(query.toLowerCase())
        );
        set({ filteredPatients: filtered });
    }
}));