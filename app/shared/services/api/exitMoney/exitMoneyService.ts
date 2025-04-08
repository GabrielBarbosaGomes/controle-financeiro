import { Environment } from "~/shared/environment";
import { coreApi } from "../axiosConfig";

export interface IListDebts{
    codDispesaFixa: number,
    nomeDispesaFixa: string,
    valorDispesaFixa: number,
    comentarioDispesaFixa: string,
    dateTime: Date,
    codDispesaVariavel: number,
    nomeDispesaVariavel: string,
    valorDispesaVariavel: number,
    comentarioDispesaVariavel: string,
    dataDispesaVariavel: Date,
}

export interface IDetailsDebts{
    id: number,
    name: string,
    debtId: number,
}

type TDebtsTotalCount = {
    data: IListDebts[];
    totalCount: number;
}

const getAll = async (page = 1, filter = ''): Promise<TDebtsTotalCount | Error> => {
    try{
        const urlRelative = `/Debt/all/get?_page=${page}&_limit=${Environment.LIMITE_DE_LINHA}&NomeDispesaFixa=${filter}&NomeDispesaVariavel=${filter}`;
        const {data, headers} = await coreApi.get(urlRelative);
        if(data) {
            return {
                data,
                // totalCount: Number(headers['x-total-count']) || Environment.LIMITE_DE_LINHA,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            };
        }

        return new Error('Erro ao listar os meses.');

    } catch (error) {
        console.log(error)
        return new Error((error as {message: string}).message || 'Erro ao listar os meses.');
    }
};

const getById = async (): Promise<any> => {

};

const create = async (): Promise<any> => {

};

const updateById = async (): Promise<any> => {

};

const deleteById = async (id: number): Promise<any> => {

};

export const ExiteMoneyService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};