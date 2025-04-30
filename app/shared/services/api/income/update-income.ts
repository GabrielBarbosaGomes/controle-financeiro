import { coreApi } from "../axiosConfig";
import type { ICreateIncome } from "./create-income";

export const updateIncome = async (payload: ICreateIncome): Promise<void | Error> => {
    try {
        const urlRelative = `/Income/update`;

         await coreApi.put(urlRelative, {
                codUsuario: payload.codUsuario,
                id: payload.CodFaturamento,
                origem: payload.origem,
                valor: payload.valor,
                comentario: payload.comentario,
                data: payload.data,
        });

        return;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message?: string })?.message || 'Erro ao Atualizar Faturamento.'
        );
    }
}