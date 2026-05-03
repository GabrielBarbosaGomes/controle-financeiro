import { coreApi } from "../../axiosConfig"

export type ICreateDebtVariablePayload = {
    id: number
    codUsuario: number
    nome: string
    valor: number | null
    comentario: string
    data: Date

}

export const createDebtVariable = async (payload: ICreateDebtVariablePayload): Promise<void | Error> => {
    try {
        const urlRelative = `/Debt/variable/insert`;

        if(payload.valor === null) return new Error('Valor não pode ser nulo.');

        await coreApi.post(urlRelative, {
            codUsuario: payload.codUsuario,
            nome: payload.nome,
            valor: payload.valor,
            comentario: payload.comentario,
            data: payload.data,
        })

        return;
    } catch(error) {
        console.log(error);
        return new Error(
            (error as { message?: string })?.message || 'Erro ao criar despesa variável.'
        );
     }
}