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