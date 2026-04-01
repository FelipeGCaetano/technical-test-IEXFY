# Backend - Guia de Instalação e Execução
Este diretório contém a API do projeto, desenvolvida com Node.js, Express, TypeScript e Prisma ORM.

## Pré-requisitos
Tenha instalado:
- Node.js
- npm

### Instalação
Acesse a pasta do backend e instale as dependências:
<pre>cd backend</pre>
<pre>npm install</pre>

### Configuração
Crie o arquivo .env na raiz da pasta backend com as seguintes variáveis:
<pre>
DATABASE_URL="postgresql://USUARIO:SENHA@IP:5432/NOME_DO_BANCO?schema=public"

PORT=8000

BASE_PATH="/api" 
</pre>

### Prisma ORM
Gere o cliente do Prisma:
<pre>npx prisma generate</pre>

---

## Execução da Aplicação
Execute o comando para buildar o código:
<pre>npm run build</pre>

Inicie a aplicação:
<pre>npm run start</pre>

A saída deve ser algo como:
<pre>Server running on port 8000</pre>


## Documentação
Após o backend estar rodando, a documentação pode ser encontrada em:
<pre>http://localhost:8000/api/docs/</pre>

---

<br>
<br>

# Front-end - Guia de Instalação e Execução
O projeto consome uma API Express para gerenciar clientes e oportunidades de negócio.

## Pré-requisitos
Tenha instalado:
- Node.js
- npm
- Backend estar rodando

### Instalação
Acesse a pasta do frontend e instale as dependências:
<pre>cd frontend</pre>
<pre>npm install</pre>

### Configuração
Crie o arquivo .env.local na raiz da pasta frontend com as seguintes variáveis:
<pre>
BACKEND_URL=http://localhost:8000
BASE_PATH=/api
</pre>

---

## Execução da Aplicação
Execute o comando para buildar o código:
<pre>npm run build</pre>

Inicie a aplicação:
<pre>npm run start</pre>

### A aplicação deverá estar rodando na porta 3000.

---

<br>
<br>

# Decisões de arquiterura
Frontend:
1. Arquitetura de "API Route Handler"
Em vez de o navegador chamar o backend diretamente, usei API Routes do next como ponte
2. Tipagem estrita e centralizada com o typescript
3. Componentização de modais
Uso de modais únicos como o ClientModal
4. Lógica de máscaras no lado do cliente
Usando regex para formater CPF/CNPJ e o telefone

Backend:
1. Uso de Service-Repository Pattern
O projeto não coloca a lógica diretamente nos controllers, tem uma estrutura dividida:
  
    - Controllers só lidam com a entrada e saída do http
    - Services é onde está a regra de negócio
    - Repositories onde o prisma ou outro ORM é executado de fato

2. Injeção de dependencias e Factory Pattern
O uso de factories para instanciar os serviços com as dependencias injetadas e centralizar
3. Validação de esquemas com o Zod
As rotas de criar e atualizar tem middlwere que valida o body das requisições com os dados esperados e retorna erro se algo estiver errado.
4. Paginação centralizada no arquivo de utils
5. Tratamento global de erros com o AppError que independente da camada padroniza as respostas e evitar de crashar a aplicação


---

<br>
<br>

# Melhorias Futuras

Com mais tempo, sem dúvidas adicionaria/melhoraria:
  
- Autenticação e autorização com diferentes níveis de acesso como roles de admin e viwer, por exemplo
- Testes Automatizados
- Logs e monitoramento utilizando Elastic Search
- Deploys automatizados com CI/CD
- Internacionalizar o front-end para multiplas linguagens
- Filtros avançados nas páginas
- Adicionaria toasts para melhor feedback vizual
- Dashboards dinamicos
- Notificação em tempo real com WS