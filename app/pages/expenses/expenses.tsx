import { useNavigate } from "react-router";
import { ToolsList } from "~/components/toolsList/toolsList";
import { LayoutPage } from "~/shared/layouts/layoutPages";

export default function Expenses() {
    const navigate = useNavigate();

    const cadastrarCompra = ()=> {
        navigate('/cadastrar-compra')
    }

    return (
        <LayoutPage 
        titulo="Saida de Dinheiro"
        barraDeFerramentas={(<ToolsList showInputResearch showButton textButton="Registrar Compra" clickButton={cadastrarCompra}/>)}
        >
            aaaaaaaaaaaaa
        </LayoutPage>
    )
}