import { Environment } from "~/shared/environment";
import { coreApi } from "../axiosConfig";

export interface IListDebts{
    mesAno: Date,
    totalGasto: number
}

type TDebtsTotalCount = {
    data: IListDebts[];
    totalCount: number;
}

export type IPropsPayloadGetAllDebts = {
    page: number;
    filter: Date;
}

export const getAllDebts = async (payload: IPropsPayloadGetAllDebts): Promise<TDebtsTotalCount | Error> => {
    try{
        const urlRelative = `/Debt/all/get`;
        const params = {
            _page: payload.page,
            _limit: Environment.LIMITE_DE_LINHA,
            mesAno: payload.filter,
        }

        const {data} = await coreApi.get(urlRelative, {params});
        if(data) {
            return {
                data,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            };
        }

        return new Error('Erro ao listar os despesas.');

    } catch (error) {
        console.log(error)
        return new Error((error as {message: string}).message || 'Erro ao listar as despesas.');
    }
};