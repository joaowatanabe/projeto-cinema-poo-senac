# Projeto Cinema - POO (SENAC)

Um sistema de gerenciamento de cinema via terminal, desenvolvido em **TypeScript** e **Node.js** para a disciplina de Programação Orientada a Objetos (POO) do SENAC.

## 📌 Funcionalidades

O sistema oferece um menu interativo no terminal, permitindo gerenciar as seguintes entidades do cinema:

- **Filmes**: Cadastrar, listar, editar e excluir filmes. Suporta filmes comuns e filmes para adultos (verificação de classificação indicativa).
- **Sessões**: Gerenciar as sessões de filmes, definindo horários, salas e quantidade de assentos.
- **Clientes**: Cadastro e gestão de clientes, categorizando em **Clientes Comuns** (com suporte a meia-entrada para estudantes) e **Clientes VIP** (com planos mensais/anuais e benefícios como ingressos cortesia).
- **Ingressos**: Compra de ingressos com escolha visual de assentos (ex: A1, B3). O sistema calcula automaticamente o valor final (inteira, meia-entrada ou cortesia VIP).

## 🛠️ Tecnologias Utilizadas

- **TypeScript**
- **Node.js**
- **ts-node** (para execução direta do TypeScript)
- **prompt-sync** (para interações e menus no terminal)
- **Jest** (configurado para testes automatizados)

## 🏗️ Estrutura do Projeto (Arquitetura)

O projeto segue princípios de Programação Orientada a Objetos (POO), dividido nas seguintes camadas dentro de `src/`:

- **`entities/`**: Classes de domínio do sistema (`ClienteCinema`, `ClienteVip`, `Filme`, `SessaoFilme`, `Ingresso`, etc.). Utiliza conceitos como herança e polimorfismo.
- **`interfaces/`**: Contratos implementados pelas classes (`ICrud`, `IDescritivel`, `IEditavel`).
- **`services/`**: Lógica de negócios e gerenciamento de dados na memória (`CadastrarCliente`, `CadastrarFilmeService`, `SessaoFilmeService`, `CadastrarIngresso`).
- **`ui/`**: Interfaces de usuário para o terminal (`MenuCinema`, `SalaCinema`).

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Node.js](https://nodejs.org/) instalado.
- Gerenciador de pacotes (NPM).

### Passos

1. **Instale as dependências**:
   ```bash
   npm install
   ```

2. **Execute o projeto**:
   ```bash
   npm start
   ```
   *(O comando executa o arquivo `Main.ts` através do `ts-node`)*

## 👥 Modelagem de Dados

Alguns exemplos de regras de negócio implementadas via POO:
- `ClienteVip` herda de `ClienteCinema` e possui atributos específicos como plano mensal/anual.
- `FilmeAdulto` e `FilmeComum` herdam de `Filme`.
- A interface `ICrud` é implementada pelos serviços para padronizar as operações de banco de dados (neste caso, em memória).
- `SalaCinema` renderiza o mapa de assentos da sessão no momento da compra do ingresso.

## 📄 Licença
ISC
