import { use, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";
import { FDatePicker } from "~/shared/forms/FDatePicker";
import { FTextField } from "~/shared/forms/FTextField";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import {
  createIncome,
  type ICreateIncome,
} from "~/shared/services/api/income/create-income";
import { deleteIncome, type IDeleteIncome } from "~/shared/services/api/income/delete-income";
import {
  getIncomeById,
  type IPayloadIncome,
} from "~/shared/services/api/income/get-income";
import { updateIncome } from "~/shared/services/api/income/update-income";

export default function DetailsIncome() {
  const { id = "Novo" } = useParams<"id">();
  const [isLoading, setIsLoading] = useState(false);
  const [titleEdit, setTitleEdit] = useState("");
  const navigate = useNavigate();

  const defaultData:ICreateIncome = {
    codUsuario: 1,
    origem: "",
    valor: 0,
    comentario: "",
    data: new Date()
  };

  const methods = useForm<ICreateIncome>({
    defaultValues: defaultData,
  });

  useEffect(() => {
    if (id === "Novo") return methods.reset(defaultData);
    setIsLoading(true);

    const payload: IPayloadIncome = {
      codUsuario: 1,
      id: Number(id),
    };

    getIncomeById(payload).then((result) => {
      setIsLoading(false);

      if (result instanceof Error) {
        alert(result.message);
        navigate("/Faturamento");
      } else {
        setTitleEdit(result.data[0].origem);
        methods.reset(result.data[0]);
      }
    });
  }, [methods.reset, id]);

  const saveIncome = (back: boolean = false, data: ICreateIncome) => {
    setIsLoading(true);
    data.CodFaturamento = Number(id);
    createIncome(data).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
    });

    if (back) {
      navigate("/Faturamento");
    }
  };

  const updateDebt = (back: boolean = false, data: ICreateIncome) => {
    setIsLoading(true);

    data.CodFaturamento = Number(id);
    updateIncome(data).then((result) => {
      setIsLoading(false);
      if (result instanceof Error) {
        alert(result.message);
        return;
      }
    });

    if (back) {
      navigate("/Faturamento");
    }
  };

   const deleteDebts = () => {
      if (confirm("Realmente deseja apagar?")) {
        const reqDelete: IDeleteIncome = {
          codUsuario: 1,
          id: Number(id),
        };
  
        deleteIncome(reqDelete).then((result) => {
          if (result instanceof Error) {
            alert(result.message);
            return;
          }
          alert("registro apagado com sucesso!");
          navigate("/Faturamento");
        });
      }
    };

  return (
    <LayoutPage
      titulo={id === "Novo" ? "Novo Faturamento" : titleEdit}
      isLoading={isLoading}
      barraDeFerramentas={
        <ToolsDetails
          textNewButton="Novo"
          showSaveAndBackButton
          showNewButton={id !== "Novo"}
          showDeleteButton={id !== "Novo"}
          clickNew={() => navigate("/Faturamento/Novo")}
          clickBack={() => navigate("/Faturamento")}
          clickDelete={() => deleteDebts()}
          clickSave={() =>
            id === "Novo"
              ? saveIncome(false, methods.getValues())
              : updateDebt(false, methods.getValues())
          }
          clickSaveAndBack={() =>
            id === "Novo"
              ? saveIncome(true, methods.getValues())
              : updateDebt(true, methods.getValues())
          }
        />
      }
    >
      <FormProvider {...methods}>
        <form className="flex flex-col gap-4">
          <FTextField name="origem" label="Origem Faturamento" type="text" />

          <FTextField name="valor" label="Valor" type="number" />

          <FTextField name="comentario" label="Comentário" type="text" />

          <FDatePicker name="data" label="Data" />
        </form>
      </FormProvider>
    </LayoutPage>
  );
}
