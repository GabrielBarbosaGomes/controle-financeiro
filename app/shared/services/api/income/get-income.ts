import { Environment } from "~/shared/environment";
import { coreApi } from "../axiosConfig";

export interface IPayloadIncome{
    codUsuario: number,
    id?: number,
    origem?: string,
}

export interface IIncome {
    id: number;
    codUsuario: number;
    origem: string;
    valor: number;
    data: Date;
    comentario: string;
}

type TIncomeTotalCount = {
    data: IIncome[];
    totalCount: number;
}

export const getIncome = async (page = 1, filter = ''): Promise<TIncomeTotalCount | Error> => {
    try {
        const urlRelative = `/Income/all/get?codUsuario=1&_page=${page}&_limit=${Environment.LIMITE_DE_LINHA}&origem=${filter}`;

        const { data } = await coreApi.get(urlRelative);

        if (data) {
            return {
                data,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            }
        }

        return new Error('Erro ao listar as despesas fixas.');
    } catch (error) {
        console.log(error)
        return new Error((error as { message: string }).message || 'Erro ao listar as despesas fixas.');
    }
};

export const getIncomeById = async(payload: IPayloadIncome): Promise<TIncomeTotalCount | Error> => {
    try{
        const urlRelative = `/Income/all/get`;

        const {data} = await coreApi.get(urlRelative, {
            params: {
              codUsuario: payload.codUsuario,
              id: payload.id,
              origem: payload.origem,
            },
          });

          if(data){
            return {
                data,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            }
        }

        return new Error('Erro ao buscar faturamento.');
    } catch(error) {
        console.log(error)
        return new Error((error as { message: string }).message || 'Erro ao buscar faturamento.');
    }

}