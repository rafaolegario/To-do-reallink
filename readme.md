# To-Do List - Reallink

## Técnologias utilizadas:

**Backend**: PHP (puro) | Mysql - Ambos instaciados no Docker. <br>
**Frontend**: Vite + React + TypeScript.

## Clone o repositório

```bash
git clone https://github.com/rafaolegario/To-do-reallink.git
cd TO-DO-REALLINK
```

### Passos para rodar o Backend

--> Abra o terminal e entre na pasta Backend(que está dentro do clone do projeto) com o seguinte comando:

```bash
cd Backend
```
### 1. Instale as dependências:

--> Utilize o comando abaixo para instalar as dependências. 

```bash
composer install
```
### 2. Criar o arquivo .env:

--> .Env example na pasta Backend:

```bash
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
```

### 3. Subir container do Docker:

--> O container do docker contem o mysql e o servidor do php com apache.

```bash
docker compose up --build -d
```

### 4. Acesso a api:

--> As rotas estão disponives na seguinte url:


```bash
http://localhost:8000/

Rotas:

GET - http://localhost:8000/tasks
GET - http://localhost:8000/tasks/id
POST - http://localhost:8000/tasks 
  [
  body = 
    {
      "title":"title-example",
      "description":"description-example"
    }
  ]
PUT - http://localhost:8000/tasks/id
   [
  body = 
    {
      "title":"title-example-2",
      "description":"description-example-2",
      "status":"completed/pending"
    }
  ]
DELETE - http://localhost:8000/tasks/id

```

### Passos para rodar o Frontend

--> Abra o terminal e entre na pasta Frontend(que está dentro do clone do projeto) com o seguinte comando:

```bash
cd Frontend/to-do-list
```
### 1. Instale as dependências:

--> Utilize o comando abaixo para instalar as dependências. 

```bash
npm install
```

### 2. Rode o servidor do vite:

--> Utilize o comando abaixo para rodar o servidor. 

```bash
npm run dev
```

--> Esse comando deve gerar uma URL nesse formato: 

```bash
http://localhost:5173/
```

--> Acesse essa url e pronto!

* Lembre de colocar o backend para rodar antes de utilizar o frontend!.