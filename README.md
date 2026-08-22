# 💰 Controle Financeiro — Front-end

Front-end de um sistema de controle financeiro pessoal: cadastro de despesas fixas e variáveis, receitas, e um dashboard com visão geral da saúde financeira (saldo atual, evolução mensal, maior categoria de gasto).

Este repositório é o cliente web. A API que ele consome fica em [`controle-financeiro-api`](https://github.com/GabrielBarbosaGomes/controle-financeiro-api) (C#/.NET). Contexto completo do projeto, decisões de arquitetura e histórico de mudanças estão em [`docs/CONTEXTO-DESENVOLVIMENTO.md`](docs/CONTEXTO-DESENVOLVIMENTO.md).

## Funcionalidades

- Cadastro, edição e exclusão de despesas fixas (recorrentes, ex. aluguel, internet) e variáveis (pontuais).
- Cadastro de receitas (faturamento).
- Categorização das despesas (Moradia, Alimentação, Transporte, etc.).
- Listagem mensal com o total gasto por mês.
- Import em lote de uma planilha de gastos (processado pelo back-end).
- Login com tema claro/escuro.

## Stack e sistema de design

- **[React Router v7](https://reactrouter.com/)** em modo full-stack (SSR), TypeScript.
- **[MUI (Material UI) v6](https://mui.com/)** como biblioteca de componentes — inclui **MUI X** (`DataGrid` para listagens, `Charts` para o dashboard, `DatePickers`).
- **Tema claro/escuro** próprio (`app/shared/themes/light.ts` e `dark.ts`), com paleta customizada (azul no claro, cinza no escuro) e alternância via `themeContext` — o botão de tema fica no menu lateral.
- **Tailwind CSS v4** para espaçamento/layout utilitário, junto com o sistema de `sx`/tema do MUI.
- **Componentes de formulário próprios** (`app/shared/forms/`: `FTextField`, `FCurrencyField`, `FDatePicker`, `FCheckbox`) que padronizam a integração entre `react-hook-form` e os inputs do MUI — todo formulário do app usa esse mesmo padrão em vez de MUI puro.
- **Layout padrão de página** (`LayoutPage`, em `app/shared/layouts/`): título, barra de ferramentas (`ToolsList`/`ToolsDetails`) e um card de conteúdo com indicador de carregamento — todas as telas seguem essa mesma estrutura.
- **`axios`** encapsulado num client único (`app/shared/services/api/axiosConfig`) com interceptors de sucesso/erro; cada chamada de API vira uma função isolada em `app/shared/services/api/<feature>/`.

## Estrutura de pastas

```
app/
├── pages/<feature>/        # telas (debt, income, home, login)
├── components/             # componentes reutilizáveis (sideMenu, tabs, dataTable...)
├── shared/
│   ├── forms/               # F* — wrappers de input padronizados
│   ├── layouts/              # LayoutPage
│   ├── themes/                # tema claro/escuro (MUI)
│   ├── context/                # ThemeContext, DrawerContext
│   ├── services/api/            # 1 arquivo por chamada de API
│   └── environment/              # constantes globais (URL da API, etc.)
├── tests/                   # espelha a estrutura de app/ (Vitest + Testing Library)
└── routes.ts                # definição de rotas
```

## Como rodar

### Pré-requisitos

- [Node.js](https://nodejs.org/) 20+ e npm.
- A [API](https://github.com/GabrielBarbosaGomes/controle-financeiro-api) rodando localmente (veja o README de lá) — sem ela, as telas carregam mas não retornam dados.

### Instalação

```bash
npm install
```

### Ambiente de desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:5173`. A URL base da API consumida pelo front fica em `app/shared/environment/index.ts` (`Environment.URL_BASE`) — por padrão aponta para `https://localhost:7262/Api`, que é onde a API sobe localmente.

### Testes

```bash
npm run test:run       # roda a suíte uma vez
npm run test           # modo watch
npm run test:coverage  # com cobertura
```

### Typecheck

```bash
npm run typecheck
```

### Build de produção

```bash
npm run build
npm run start   # serve o build gerado
```

Também há `Dockerfile`/`Dockerfile.pnpm`/`Dockerfile.bun` prontos para deploy containerizado.
