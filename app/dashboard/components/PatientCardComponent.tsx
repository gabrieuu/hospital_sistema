import { Patient } from "@/app/lib/domain/models";

type PacientComponentProp ={
    paciente: Patient,
}

export default function PatientCardComponent(props : PacientComponentProp) {
    const getUrgencyColor = (urgencia: 'alta' | 'media' | 'baixa' | null) => {
        if (!urgencia) return '';
        return {
        alta: 'text-red-500 bg-red-50 border-red-200',
        media: 'text-orange-500 bg-orange-50 border-orange-200',
        baixa: 'text-blue-500 bg-blue-50 border-blue-200'
        }[urgencia];
    };
    return (
        <div className="space-y-2">
                  <h3 className="font-semibold text-lg text-[#1A1A1A]">
                    {props.paciente.nome}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {props.paciente.atendimentos?.[0].tipo || 'Sem atendimentos recentes'}
                  </p>
                  {props.paciente.encaminhamentos?.[0].status && (
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(props.paciente.encaminhamentos[0].urgencia)}`}>
                      {props.paciente.encaminhamentos[0].status}
                    </div>
                  )}
                </div>
    )
}