import { coreApi } from "../axiosConfig";

export const getAnosDisponiveis = async (codUsuario: number): Promise<number[] | Error> => {
  try {
    const urlRelative = `/Dashboard/anos-disponiveis`;

    const { data } = await coreApi.get(urlRelative, { params: { codUsuario } });

    if (data) {
      return data;
    }

    return new Error("Erro ao buscar os anos disponíveis.");
  } catch (error) {
    console.log(error);
    return new Error(
      (error as { message?: string })?.message || "Erro ao buscar os anos disponíveis."
    );
  }
};
