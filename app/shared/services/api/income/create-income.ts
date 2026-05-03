import { coreApi } from "../axiosConfig";


export interface ICreateIncome {
    codUsuario: number,
    CodFaturamento?: number,
    origem: string,
    valor: number | null,
    comentario: string
    data: Date,
}

export const createIncome = async (req: ICreateIncome): Promise<void | Error> => {
    try {
        const urlRelative = "/Income/insert";

        if(req.valor === null) return new Error('Valor não pode ser nulo.');

         await coreApi.post(urlRelative, {
                codUsuario: req.codUsuario,
                origem: req.origem,
                valor: req.valor,
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