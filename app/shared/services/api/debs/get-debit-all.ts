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

export const getAllDebts = async (page = 1, filter = ''): Promise<TDebtsTotalCount | Error> => {
    try{
        const urlRelative = `/Debt/all/get?_page=${page}&_limit=${Environment.LIMITE_DE_LINHA}&mesAno=${filter}`;
        const {data} = await coreApi.get(urlRelative);
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