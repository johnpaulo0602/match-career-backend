# Match Career Backend

## Visão Geral

Este projeto faz parte do sistema "Match Career", um teste vocacional baseado na teoria das Múltiplas Inteligências de Howard Gardner. O backend foi desenvolvido utilizando NestJS, Prisma e MongoDB para gerenciar os dados do teste e integração com o bot do WhatsApp.

## Tecnologias Utilizadas

- **NestJS**: Framework para construção do backend.
- **Prisma**: ORM utilizado para comunicação com o banco de dados.
- **MongoDB**: Banco de dados utilizado para armazenar os dados dos usuários e questões.
- **API Evolution**: API utilizada para integração com o WhatsApp.

## Objetivo do Projeto

O sistema tem como objetivo coletar respostas dos usuários a perguntas relacionadas às suas inteligências predominantes e, no final, enviar os resultados por email. O usuário acessa uma landing page, onde é redirecionado para um bot no WhatsApp, chamado Caio, que conduz o teste.

## Configuração Inicial

### 1. Clonar o Repositório

```bash
git clone https://github.com/gepittes/match-career-backend
cd match-career-backend
```

### 2. Instalar as Dependências

```bash
npm install
```

### 3. Configurar o Banco de Dados

Crie um arquivo `.env` na raiz do projeto com base no arquivo `.env.example`:

```bash
cp .env.example .env
```

Atualize o arquivo `.env` com os valores corretos, por exemplo:

```
DATABASE_URL="mongodb://localhost:27017/match-career"
EVOLUTION_API_BASE_URL="https://doc.evolution-api.com/v2"
```

### 4. Executar a Migração do Prisma

Use o Prisma para criar as tabelas no MongoDB:

```bash
npx prisma db push
```

### 5. Popular o Banco de Dados com Perguntas (Seed)

Para adicionar as perguntas do teste vocacional ao banco de dados, execute:

```bash
npm run seed
```

### 6. Verificar o Banco de Dados com Prisma Studio

Você pode visualizar e gerenciar os dados do banco de dados usando o Prisma Studio:

```bash
npx prisma studio
```

Isso abrirá uma interface gráfica onde você pode visualizar as tabelas e dados existentes no banco de dados.

## Estrutura do Projeto

### Módulos

- **UserModule**: Gerencia o cadastro dos usuários.
- **TestModule**: Controla o teste vocacional e a coleta de respostas.
- **WhatsAppModule**: Integração com a API Evolution para enviar e receber mensagens do bot.
- **EmailModule**: Responsável por enviar os resultados do teste por email.

### Endpoints

Os principais endpoints da aplicação incluem:

- `POST /user`: Cadastro de um novo usuário.
- `GET /test/questions`: Retorna as perguntas do teste vocacional.
- `POST /test/response`: Armazena as respostas do teste.
- `POST /test/result`: Gera e envia o resultado por email.

## Comandos Úteis

### Iniciar o Servidor de Desenvolvimento

```bash
npm run start:dev
```

### Seed do Banco de Dados

Para popular o banco de dados com as questões:

```bash
npm run seed
```

### Prisma Studio

Para abrir uma interface gráfica e visualizar os dados do banco:

```bash
npx prisma studio
```

### Executar a Migração

Para aplicar as alterações do schema no banco de dados:

```bash
npx prisma db push
```

## Funcionamento do Sistema

1. **Usuário Acessa a Landing Page**: O usuário clica no botão de "Fazer teste agora" e é redirecionado para o WhatsApp.
2. **Bot Conduz o Teste**: O bot Caio no WhatsApp faz perguntas ao usuário usando a API Evolution. As respostas são armazenadas no banco de dados.
3. **Resultados do Teste**: Após o usuário concluir as perguntas, o sistema processa as respostas e identifica as inteligências predominantes.
4. **Envio por Email**: O resultado é enviado para o email do usuário, oferecendo sugestões de carreiras adequadas.

## Contribuições

Contribuições são bem-vindas! Sinta-se à vontade para abrir um pull request ou reportar problemas.

## Licença

Este projeto é licenciado sob a licença MIT.