# Contexto de desenvolvimento — Sistema Financeiro Pessoal (Front-end)

Este documento é a fonte de verdade versionada (via Git/GitHub) sobre a missão, as regras de negócio e as decisões de arquitetura do projeto, para não depender só de memória local do assistente (fora da pasta do projeto, não versionada). A visão completa de domínio/back-end está em [`controle-financeiro-api/docs/CONTEXTO-DESENVOLVIMENTO.md`](https://github.com/GabrielBarbosaGomes/controle-financeiro-api/blob/main/docs/CONTEXTO-DESENVOLVIMENTO.md) — este arquivo foca na parte de front-end.

Repositório irmão: [`controle-financeiro-api`](https://github.com/GabrielBarbosaGomes/controle-financeiro-api) (back-end, C#/.NET/Dapper/MySQL).

## 1. Missão do sistema

Dashboard financeiro pessoal mostrando: **saúde financeira**, **saldo atual**, **com o que mais se gastou**. Conceitos: despesa fixa = recorrente sempre (ex. conta de energia); despesa variável = pontual/com prazo de validade.

## 2. Padrão arquitetural (front-end)

React Router v7 + TypeScript + MUI (DataGrid/Charts) + axios + react-hook-form + TailwindCSS + Vitest.

- Páginas em `app/pages/<feature>/<nome>.tsx`, roteadas em `app/routes.ts` (rotas em português, ex. `/Despesas`, `/Despesas/Fixed/Detalhe/:id`).
- Chamadas HTTP isoladas em `app/shared/services/api/<feature>/<ação>-<recurso>.ts`: cada função async usa `coreApi` (axios configurado em `app/shared/services/api/axiosConfig`) e retorna `T | Error` — **nunca lança**, sempre checar com `if (result instanceof Error)`.
- Formulários com `react-hook-form` (`useForm` + `FormProvider`) e componentes de campo próprios em `app/shared/forms/` (`FTextField`, `FCurrencyField`, `FDatePicker`, `FCheckbox`).
- Listagens com `@mui/x-data-grid` (`DataGrid`) dentro do `LayoutPage` (`app/shared/layouts/layoutPages.tsx`), com barra de ferramentas `ToolsList`/`ToolsDetails`.
- `Environment` (`app/shared/environment/index.ts`) centraliza constantes (URL base da API, limite de linhas, textos padrão).
- Testes em Vitest espelhando a estrutura em `app/tests/`.
- Sistema hoje é mono-usuário/protótipo, sem autenticação real — `codUsuario` é fixado em `1` nas chamadas.

## 3. Import da planilha financeira (contexto resumido)

O usuário tem uma planilha (`Planilha RD - saude financeira.xlsx`) com abas `Sonhos` (metas, fora de escopo por ora) e `Dívidas`/`Gastos 2024`/`Gastos 2025`/`Gastos 2026` (matriz Categoria × Item × Mês). O schema do banco **não será alterado**: a Categoria da planilha é mapeada no campo `Comentario` já existente, e o Item no campo `Nome`. Detalhes completos da estrutura da planilha e das regras de parsing estão no doc do back-end (seção 4).

## 4. Plano de tasks (import + dashboard)

Fluxo combinado com o usuário por task: **(1)** IA informa o plano → **(2)** usuário valida → **(3)** IA implementa → **(4)** usuário testa em tela; se funcionar, marca validada, senão corrige e repete o teste.

| ID | Task | Status |
|----|------|--------|
| F1 | Tela de import (`/Importar`): upload de arquivo + botão, novo service `app/shared/services/api/import/import-planilha.ts`, rota em `routes.ts`, item no menu lateral (`ItemsMenu`) | PENDENTE |
| F2 | `home.tsx` passa a consumir `GET /Dashboard/resumo` real (hoje é mockado): card Saldo Atual, card Saúde Financeira, gráfico "com que mais gastei" por categoria | PENDENTE |
| F3 | Grid de despesas (`debt.tsx`) ganha coluna Categoria (lida do campo `Comentario`) | PENDENTE |

As tasks de back-end (B1–B5: leitura do Excel, parser, endpoints de import e dashboard) estão detalhadas no repositório `controle-financeiro-api`.

## 5. Log de decisões

- 2026-08-22: decidido manter o schema do banco sem alterações — Categoria da planilha mapeada em `Comentario` (não cria coluna nova).
- 2026-08-22: `gh` CLI reautenticado com a conta pessoal `GabrielBarbosaGomes`; `user.name`/`user.email` configurados localmente (não globalmente) nos dois repositórios como `gabriel` / `gabryel122crf@gmail.com`.
