import { coreApi } from "../axiosConfig";

export interface IDeleteIncome {
    codUsuario: number,
    id?: number,
}


export const deleteIncome = async (req: IDeleteIncome): Promise<void | Error> => {
    try {
        const urlRelative = `/Income/delete`;

        await coreApi.delete(urlRelative, {
            data: {
                codUsuario: req.codUsuario,
                id: req.id,
            },
        });

        return;
    } catch (error) {
        console.log(error);
        return new Error(
            (error as { message?: string })?.message || 'Erro ao excluir Faturamento.'
        );
    }
};