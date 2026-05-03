import { coreApi } from "../../axiosConfig";
import type { IDebtFixed } from "./create-debt";


export const updateDebtFixed = async (payload: IDebtFixed): Promise<void | Error> => {
    try {
        const urlRelative = `/Debt/fixed/update`;

        if(payload.valorParcela === null || payload.valor === null) return new Error('Valor ou valor da parcela não pode ser nulo.');
        if(payload.quantidadeParcelas <= 0) return new Error('Quantidade de parcelas deve ser maior que zero.');

         await coreApi.put(urlRelative, {
                codUsuario: payload.codUsuario,
                id: payload.CodDespesa,
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