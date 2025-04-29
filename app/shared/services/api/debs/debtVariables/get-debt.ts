import { Environment } from "~/shared/environment";
import { coreApi } from "../../axiosConfig";

export interface IPayloadDebtVariables{
    codUsuario: number,
    codDispesaVariable: number
}
export interface IDetailsDebtVariables{
    id: number,
    codUsuario: number,
    nome: string,
    valor: number,
    comentario?: string,
    data: Date,
}


type TDebtVariablesTotalCount = {
    data: IDetailsDebtVariables[];
    totalCount: number;
}

export const getDebtVariables = async (page = 1, filter = ''): Promise<TDebtVariablesTotalCount | Error> => {
    try{
        const urlRelative = `/Debt/variable/get?_codUsuario=1&_page=${page}&_limit=${Environment.LIMITE_DE_LINHA}&nomeDispesaVariavel=${filter}`;

        const {data} = await coreApi.get(urlRelative);

        if(data){
            return {
                data,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            }
        }

        return new Error('Erro ao despesas fixas');
    } catch(error) {
        console.log(error)
        return new Error((error as {message: string}).message || 'Erro ao listar as despesas fixas.');
    }
}

export const getDebtVariablesById = async (req: IPayloadDebtVariables): Promise<TDebtVariablesTotalCount | Error> => {
    try{
        const urlRelative = `/Debt/variable/get`;

        const {data} = await coreApi.get(urlRelative, {
            params: {
              codUsuario: req.codUsuario,
              codDispesaVariavel: req.codDispesaVariable,
            },
          });

        if(data){
            return {
                data,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            }
        }

        return new Error('Erro ao buscar despesa variavel');
    } catch(error) {
        console.log(error)
        return new Error((error as {message: string}).message || 'Erro ao buscar despesa variavel.');
    }
};