import { coreApi } from "../../axiosConfig";
import type { IDebtFixed } from "./create-debt";


export const updateDebtFixed = async (payload: IDebtFixed): Promise<void | Error> => {
    try {
        const urlRelative = `/Debt/fixed/update`;

         await coreApi.put(urlRelative, {
                codUsuario: payload.codUsuario,
                cod_dispesa_fixa: payload.Cod_dispesa_fixa,
                nome: payload.nome,
                valor: payload.valor,
                valorParcela: payload.valorParcela,
                quantidadeParcelas: payload.quantidadeParcelas,
                tempoIndeterminado: payload.tempoIndeterminado,
                finalizado: payload.finalizado,
                comentario: payload.comentario,
        });

        return;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message?: string })?.message || 'Erro ao excluir despesa.'
        );
    }
}