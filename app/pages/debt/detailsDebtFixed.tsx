import { LinearProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";
import { LayoutPage } from "~/shared/layouts/layoutPages";
import { deleteDebt, type IDeleteDebt } from "~/shared/services/api/debs/delete-debt";
import { getDebtFixedById, type IReqDebtFixed } from "~/shared/services/api/debs/debtFixed/get-debt";

export default function DetailsDebtFixed() {
    const {id = 'Nova'} = useParams<'id'>();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [titleEdit, setTitleEdit] = useState('');

    useEffect(()=>{
        if(id === 'Nova') return;
        setIsLoading(true);

        const req:IReqDebtFixed = {
            codUsuario: 1,
            codDispesaFixa: Number(id)
        }

        getDebtFixedById(req).then((result)=>{
            setIsLoading(false);

            if(result instanceof Error){
                alert(result.message)
                navigate('/Despesas')
            } else {
                setTitleEdit(result.data.nome)
                console.log('DEBT',result)
            }
        });
    },[])

    const deleteDebts = (id:number) => {
        if(confirm('Realmente deseja apagar?')){
            const reqDelete:IDeleteDebt = {
                codUsuario: 1,
                codDispesaFixa: id,
                nomeDispesa: "fixed"
            }

            deleteDebt(reqDelete)
              .then(result => {
                  if( result instanceof Error){
                      alert(result.message)
                      return
                  }
                  alert('registro apagado com sucesso!')
              })
          }
    };


    const saveDebt = (back: boolean = false) => {
        console.log('save')

        if(back){
            navigate('/Despesas')
        }
    }

    return (
            <LayoutPage
                titulo={id === 'Nova'? "Nova Despesa" : titleEdit}
                barraDeFerramentas={
                    <ToolsDetails
                    textNewButton="Nova"
                    showSaveAndBackButton
                    showSaveButton
                    showNewButton={id !== 'Nova'}
                    showDeleteButton={id !== 'Nova'}

 
                    clickNew={()=> navigate('/Despesas/Fixed/Detalhe/Nova')}
                    clickBack={()=> navigate('/Despesas')}
                    clickDelete={()=> deleteDebts(Number(id))}
                    clickSave={()=> saveDebt()}
                    clickSaveAndBack={()=> saveDebt(true)}

                    />
                }
            >
            {isLoading && (
                <LinearProgress variant="indeterminate"/>
            )}

                DetailsDebt {id}
            </LayoutPage>
    )
}