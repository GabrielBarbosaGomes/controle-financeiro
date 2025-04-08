import { useNavigate, useParams } from "react-router"
import { ToolsDetails } from "~/components/toolsDetails/toolsDetails";
import { LayoutPage } from "~/shared/layouts/layoutPages";

export default function DetailsDebt() {
    const {id = 'Nova'} = useParams<'id'>();
    const navigate = useNavigate();

    const deleteDebt = (id:number) => {
        console.log('delete', id)
    };

    const saveDebt = (back: boolean = false) => {
        console.log('save')

        if(back){
            navigate('/Despesas')
        }
    }

    return (
            <LayoutPage
                titulo="Detalhe Dispesa"
                barraDeFerramentas={
                    <ToolsDetails
                    textNewButton="Nova"
                    showSaveAndBackButton
                    showSaveButton
                    showNewButton={id !== 'Nova'}
                    showDeleteButton={id !== 'Nova'}

 
                    clickNew={()=> navigate('/Despesas/Detalhe/Nova')}
                    clickBack={()=> navigate('/Despesas')}
                    clickDelete={()=> deleteDebt(Number(id))}
                    clickSave={()=> saveDebt()}
                    clickSaveAndBack={()=> saveDebt(true)}

                    />
                }
            >

                DetailsDebt {id}
            </LayoutPage>
    )
}