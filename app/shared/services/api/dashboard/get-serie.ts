import { coreApi } from "../axiosConfig";

export type TPeriodoGrafico = "ano" | "mes" | "semana";

export interface ISaldoPeriodo {
  periodo: Date;
  receita: number;
  despesa: number;
  saldo: number;
}

export interface IFiltroSerie {
  periodo: TPeriodoGrafico;
  ano?: number;
  mes?: number;
}

export const getDashboardSerie = async (
  codUsuario: number,
  filtro: IFiltroSerie
): Promise<ISaldoPeriodo[] | Error> => {
  try {
    const urlRelative = `/Dashboard/serie`;

    const { data } = await coreApi.get(urlRelative, {
      params: { codUsuario, periodo: filtro.periodo, ano: filtro.ano, mes: filtro.mes },
    });

    if (data) {
      return data;
    }

    return new Error("Erro ao buscar a série do gráfico.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message?: string })?.message || "Erro ao buscar a série do gráfico."
    );
  }
};
