import { Environment } from "~/shared/environment";
import { coreApi } from "../../axiosConfig";

export interface IReqDebtFixed{
    codUsuario: number,
    codDispesaFixa: number
}

export interface IDetailsDebtsFixed{
    id: number,
    codUsuario: number,
    nome: string,
    valor: number,
    valorParcela: number,
    quantidadeParcelas: number,
    tempoIndeterminado: boolean,
    finalizado: boolean,
    comentario?: string,
    data: Date,
    dataAtualizacao?: Date,
}


type TDebtsFixedTotalCount = {
    data: IDetailsDebtsFixed[];
    totalCount: number;
}

export type filter = {
    busca: string,
    dateDespesa: Date,
    pagina: number,
}

export const getDebtFixed = async (searchFilters: filter): Promise<TDebtsFixedTotalCount | Error> => {
    try{
        const urlRelative = `/Debt/fixed/get`;

        const params = {
            codUsuario: 1,
            _page: searchFilters.pagina,
            _limit: Environment.LIMITE_DE_LINHA,
            nomeDispesaFixa: searchFilters.busca,
            dataDispesaFixa: searchFilters.dateDespesa,
        };

        const { data } = await coreApi.get(urlRelative, { params });

        if(data){
            return {
                data,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            }
        }

        return new Error('Erro ao listar as despesas fixas.');
    } catch(error) {
        console.log(error)
        return new Error((error as {message: string}).message || 'Erro ao listar as despesas fixas.');
    }
};

export const getDebtFixedById = async (req: IReqDebtFixed): Promise<TDebtsFixedTotalCount | Error> => {
    try{
        const urlRelative = `/Debt/fixed/get`;

        const {data} = await coreApi.get(urlRelative, {
            params: {
              codUsuario: req.codUsuario,
              codDispesaFixa: req.codDispesaFixa,
            },
          });

        if(data){
            return {
                data,
                totalCount: data.length || Environment.LIMITE_DE_LINHA,
            }
        }

        return new Error('Erro ao buscar despesa fixa');
    } catch(error) {
        console.log(error)
        return new Error((error as {message: string}).message || 'Erro ao buscar despesa fixa.');
    }
};