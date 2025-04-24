import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import {
  FormProvider,
  useForm,
} from "react-hook-form";
import {
  deleteDebt,
  type IDeleteDebt,
} from "~/shared/services/api/debs/delete-debt";
import {
  getDebtFixedById,
  type IReqDebtFixed,
} from "~/shared/services/api/debs/debtFixed/get-debt";
import {
  createDebtFixed,
  type IDebtFixed,
} from "~/shared/services/api/debs/debtFixed/create-debt";
import { FTextField } from "~/shared/forms/FTextField";

import dayjs from "dayjs";
import { FCheckbox } from "~/shared/forms/FCheckbox";
import { FDatePicker } from "~/shared/forms/FDatePicker";
import { updateDebtFixed } from "~/shared/services/api/debs/debtFixed/update-debt";

export default function DetailsDebtFixed() {
  const { id = "Nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");

  const defaultData = {
    codUsuario: 1,
    nome: "",
    valor: 0,
    valorParcela: 0,
    quantidadeParcelas: 0,
    tempoIndeterminado: false,
    finalizado: false,
    comentario: "",
    data: dayjs().toDate(),
  };

  const methods = useForm<IDebtFixed>({
    defaultValues: defaultData,
  });

  useEffect(() => {
    if (id === "Nova") return methods.reset(defaultData);

    setIsLoading(true);
    const req: IReqDebtFixed = {
      codUsuario: 1,
      codDispesaFixa: Number(id),
    };

    getDebtFixedById(req).then((result) => {
      setIsLoading(false);

      if (result instanceof Error) {
        alert(result.message);
        navigate("/Despesas");
      } else {
        setTitleEdit(result.data[0].nome);
        methods.reset(result.data[0]);
      }
    });
  }, [methods.reset, id]);

  const deleteDebts = (id: number) => {
    if (confirm("Realmente deseja apagar?")) {
      const reqDelete: IDeleteDebt = {
        codUsuario: 1,
        codDispesaFixa: id,
        nomeDispesa: "fixed",
      };

      deleteDebt(reqDelete).then((result) => {
        if (result instanceof Error) {
          alert(result.message);
          return;
        }
        alert("registro apagado com sucesso!");
      });
    }
  };

  const saveDebt = (back: boolean = false, data: IDebtFixed) => {
    createDebtFixed(data);
    if (back) {
      navigate("/Despesas");
    }
  };

  const updateDebt = (back: boolean = false, data: IDebtFixed) => {
    data.CodDespesa = Number(id);
    updateDebtFixed(data);
    if (back) {
      navigate("/Despesas");
    }
  };

  return (
    <LayoutPage
      titulo={id === "Nova" ? "Nova Despesa" : titleEdit}
      barraDeFerramentas={
        <ToolsDetails
          textNewButton="Nova"
          showSaveAndBackButton
          showSaveButton
          showNewButton={id !== "Nova"}
          showDeleteButton={id !== "Nova"}
          clickNew={() => navigate("/Despesas/Fixed/Detalhe/Nova")}
          clickBack={() => navigate("/Despesas")}
          clickDelete={() => deleteDebts(Number(id))}
          clickSave={methods.handleSubmit((data) =>
            id === "Nova" ? saveDebt(false, data) : updateDebt(false, data)
          )}
          clickSaveAndBack={() =>
            methods.handleSubmit((data) =>
              id === "Nova" ? saveDebt(true, data) : updateDebt(true, data)
            )
          }
        />
      }
    >
      {isLoading && <LinearProgress variant="indeterminate" />}

          <FormProvider {...methods}>
            <form>
              <FTextField name="nome" label="Nome" type="text" />

              <FTextField name="valor" label="Valor" type="number" />

              <FTextField
                name="valorParcela"
                label="Valor da Parcela"
                type="number"
              />

              <FTextField
                name="quantidadeParcelas"
                label="Quantidade de parcelas"
                type="number"
              />

              <FCheckbox
                name="tempoIndeterminado"
                label="não possui data final para essa despesa."
              />

              <FCheckbox name="finalizado" label="Débito finalizado." />

              <FTextField name="comentario" label="Comentário" type="text" />

              <FDatePicker name="data" label="Data" />
            </form>
          </FormProvider>
    </LayoutPage>
  );
}
