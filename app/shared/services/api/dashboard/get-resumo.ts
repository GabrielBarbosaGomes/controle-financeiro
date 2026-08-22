import { coreApi } from "../axiosConfig";

export interface IDashboardResumo {
  saldoAtual: number;
  maiorCategoriaGasto: string | null;
  maiorCategoriaValor: number;
  saudeFinanceiraPercentual: number;
  saudeFinanceiraStatus: string;
}

export const getDashboardResumo = async (codUsuario: number): Promise<IDashboardResumo | Error> => {
  try {
    const urlRelative = `/Dashboard/resumo`;

    const { data } = await coreApi.get(urlRelative, { params: { codUsuario } });

    if (data) {
      return data;
    }

    return new Error("Erro ao buscar o resumo do dashboard.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message?: string })?.message || "Erro ao buscar o resumo do dashboard."
    );
  }
};
