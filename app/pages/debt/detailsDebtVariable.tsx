import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";
import { FDatePicker } from "~/shared/forms/FDatePicker";
import { FTextField } from "~/shared/forms/FTextField";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import {
  createDebtVariable,
  type ICreateDebtVariablePayload,
} from "~/shared/services/api/debs/debtVariables/create-debt";
import {
  getDebtVariablesById,
} from "~/shared/services/api/debs/debtVariables/get-debt";
import { updateDebtVariable } from "~/shared/services/api/debs/debtVariables/update-debt";
import { deleteDebt, type IDeleteDebt } from "~/shared/services/api/debs/delete-debt";

export default function DetailsDebtVariable() {
  const { id = "Nova" } = useParams<"id">();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");

  const defaultData = {
    codUsuario: 1,
    nome: "",
    valor: 0,
    comentario: "",
    data: dayjs().toDate(),
  };

  const methods = useForm<ICreateDebtVariablePayload>({
    defaultValues: defaultData,
  });

  useEffect(() => {
    if (id === "Nova") return methods.reset(defaultData);
    setIsLoading(true);

    const payload = {
      codUsuario: 1,
      codDispesaVariable: Number(id),
    };

    getDebtVariablesById(payload).then((result) => {
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

  const creatNewDebt = (
    back: boolean = false,
    data: ICreateDebtVariablePayload
  ) => {
    setIsLoading(true);
    
    createDebtVariable(data).then((result) => {
      setIsLoading(false)
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
    });

    if (back) {
      navigate("/Despesas");
    }
  };

  const updateDebt = (
    back: boolean = false,
    data: ICreateDebtVariablePayload
  ) => {
    setIsLoading(true);

    data.id = Number(id);
    updateDebtVariable(data).then((result) => {
      setIsLoading(false)
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
    });
    
    if (back) {
      navigate("/Despesas");
    }
  };

  const deleteDebts = () => {
      if (confirm("Realmente deseja apagar?")) {
        const reqDelete: IDeleteDebt = {
          codUsuario: 1,
          codDispesaFixa: Number(id),
          nomeDispesa: "variable",
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

  return (
    <LayoutPage
      titulo={id === "Nova" ? "Nova Despesa Variável" : titleEdit}
      isLoading={isLoading}
      barraDeFerramentas={
        <ToolsDetails
          textNewButton="Nova"
          showNewButton
          showSaveButton
          showSaveAndBackButton
          showDeleteButton
          showBackButton
          clickNew={() => navigate("/Despesas/Variable/Detalhe/Nova")}
          clickSave={methods.handleSubmit((data) =>
            id === "Nova" ? creatNewDebt(false, data) : updateDebt(false, data))}
          clickSaveAndBack={methods.handleSubmit((data) =>
            id === "Nova" ? creatNewDebt(true, data) : updateDebt(true, data))}
          clickDelete={() => deleteDebts()}
          clickBack={() => navigate("/Despesas")}
        />
      }
    >
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4">
          <FTextField name="nome" label="Nome" type="text" isRequired/>

          <FTextField name="valor" label="Valor" type="number" isRequired/>

          <FTextField name="comentario" label="Comentário" type="text" />

          <FDatePicker name="data" label="Data" isRequired />
        </form>
      </FormProvider>
    </LayoutPage>
  );
}
