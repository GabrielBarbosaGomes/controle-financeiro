import { coreApi } from "../../axiosConfig";

export interface IDebtFixed {
    codUsuario: number,
    CodDespesa: number,
    nome: string,
    valor: number | null,
    valorParcela: number | null,
    quantidadeParcelas: number,
    tempoIndeterminado: boolean,
    finalizado: boolean,
    comentario: string
    data: Date,
}

export const createDebtFixed = async (req: IDebtFixed): Promise<void | Error> => {
    try {
        const urlRelative = `/Debt/fixed/insert`;

        if(req.valorParcela === null || req.valor === null) return new Error('Valor ou valor da parcela não pode ser nulo.');
        if(req.quantidadeParcelas <= 0) return new Error('Quantidade de parcelas deve ser maior que zero.');

         await coreApi.post(urlRelative, {
                codUsuario: req.codUsuario,
                nome: req.nome,
                valor: req.valor,
                valorParcela: req.valorParcela,
                quantidadeParcelas: req.quantidadeParcelas,
                tempoIndeterminado: req.tempoIndeterminado,
                finalizado: req.finalizado,
                comentario: req.comentario,
                data: req.data,
        });

        return;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message?: string })?.message || 'Erro ao criar despesa Fixa.'
        );
    }
}