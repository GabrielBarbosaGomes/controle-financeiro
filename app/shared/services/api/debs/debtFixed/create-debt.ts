import { coreApi } from "../../axiosConfig";

export interface IDebtFixed {
    codUsuario: number,
    CodDespesa: number,
    nome: string,
    valor: number,
    valorParcela: number,
    quantidadeParcelas: number,
    tempoIndeterminado: boolean,
    finalizado: boolean,
    comentario: string
    data: Date,
}

export const createDebtFixed = async (req: IDebtFixed): Promise<void | Error> => {
    try {
        const urlRelative = `/Debt/fixed/insert`;

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