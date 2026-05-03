import { coreApi } from "../../axiosConfig";
import type { ICreateDebtVariablePayload } from "./create-debt";

export const updateDebtVariable = async (payload: ICreateDebtVariablePayload): Promise<void | Error> => {
    try {
        const urlRelative = `/Debt/variable/update`;

        if(payload.valor === null) return new Error('Valor não pode ser nulo.');

        await coreApi.put(urlRelative, {
            id: payload.id,
            codUsuario: payload.codUsuario,
            nome: payload.nome,
            valor: payload.valor,
            comentario: payload.comentario,
            data: payload.data,
        });

        return;
    } catch(error) {
        console.log(error);
        return new Error(
            (error as { message?: string })?.message || 'Erro ao atualizar despesa variável.'
        );
    }
}