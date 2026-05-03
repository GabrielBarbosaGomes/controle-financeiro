import { coreApi } from "../axiosConfig";

export interface IDeleteDebt {
    codUsuario: number,
    codDispesaFixa?: number,
    codDispesaVariavel?: number,
    nomeDispesa: 'fixed' | 'variable' | 'all'
}


export const deleteDebt = async (req: IDeleteDebt): Promise<void | Error> => {
    try {
        const urlRelative = `/Debt/delete`;

        await coreApi.delete(urlRelative, {
            data: {
                codUsuario: req.codUsuario,
                codDispesaFixa: req.codDispesaFixa,
                codDispesaVariavel: req.codDispesaVariavel,
                nomeDispesa: req.nomeDispesa,
            },
        });

        return;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message?: string })?.message || 'Erro ao excluir despesa.'
        );
    }
};