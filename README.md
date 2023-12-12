# MyWallet Back-end

Aplicação de back-end desenvolvido durante a formação do Bootcamp da Driven. Neste projeto, é possível gerenciar o back-end de uma aplicação de gerenciamento de finanças através de requisições HTTP.

# Demo
[Link do deploy do back-end](https://mywallet-api-7owq.onrender.com)

# Como funciona?
Este projeto é uma API REST para atender o serviço de controle financeiro do MyWallet. Ela possui duas entidade: `users` e `transactions`. Em suma, `users` armazena as informações dos usuários da aplicação e `transactions` armazenam as informações da entradas e saídas da conta do usuário. Todas as propriedades das entidades podem ser encontradas na pasta `schemas`. Além disso, o banco de dados também possui uma coleção `sections` que armazena as seções ativas no momento.

### Para a entidade `users`, foram criadas 2 rotas:

- POST `/sign-up`: Cria um novo usuário. O email do usuário deve ser único, caso já exista um usuário com o email escolhido a aplicação retornará um erro `409` (conflito). O body da requisição deve seguir o seguinte formato:
```
{
 "name": string
 "email": string
 "password": string
}
```

O campo `email` deve ter o formato de um endereço de email , e o campo `password` deve ter pelo menos 3 caracteres. Todos os campos são obrigatórios, e se qualquer uma dessas regras forem violadas, o erro `422` (entidade não processável) é retornado.

- POST `/sign-in`: Inicia uma nova seção para o usuário. Retorna um chave que permite a utilização de rotas autenticadas. Caso não exista nenhum usuário com o email informado a api retorna o erro `404` (não encontrado). Se o usuário for encontrado mas a senha estiver incorreta a aplicação retorna o erro `401` (não autorizado). O body da requisição deve seguir o seguinte formato:
```
{
 "email": string
 "password": string
}
```

O campo `email` deve ter o formato de um endereço de email. Todos os campos são obrigatórios, e se qualquer uma dessas regras forem violadas, o erro `422` (entidade não processável) é retornado.

### Para `transactions`, temos 2 rotas:

- POST `/transactions`: Essa é uma rota autenticada que gera uma nova transação para o usuário especificado. O header da requisição espera um campo `authorization` que deve ser preenchido com a chave da seção do usuário recebida no login (sign-in), caso a chave não seja informada o erro `401` (não autorizado) é lançado. O body da requisição deve seguir o seguinte formato:
```
{
 "value": float
 "description": string
 "type": "entrada" || "saida" 
}
```
Todos os campos são obrigatórios, e se qualquer uma dessas regras forem violadas, o erro `422` (entidade não processável) é retornado.

- GET `/transactions`: Essa é uma rota autenticada que retorna informações sobre o usuário e todas as transações associadas ao usuário, incluindo a data de criação de cada transação. O header da requisição espera um campo `authorization` que deve ser preenchido com a chave da seção do usuário recebida no login (sign-in), caso a chave não seja informada o erro `401` (não autorizado) é lançado. Essa rota retorna um objeto no seguinte formato.
```
{
  "user": {
    "_id": string,
    "name": string,
    "email": string
  },
  "transactions": [
    {
      "_id": string,
      "userId": string,
      "type": "entrada" || "saida",
      "value": float,
      "description": string,
      "date": string ("DD/MM")
    }
    .
    .
    .
  ]
}
```

# Tecnologias utilizadas
Para este projeto, foram utilizadas:

- Node (versão 16.17.0);
- Express;
- mongoDb;
- Joi;

# Como rodar em desenvolvimento
Para executar este projeto em desenvolvimento, é necessário seguir os passos abaixo:

- Clonar o repositório;
- Abrir um terminal na pasta raiz do projeto, e baixar as dependências necessárias rodando o comando: `npm install`;
- Em seguida, criar o arquivo `.env` com base no `.env.example`;
- Este arquivo `.env` é composto apenas pela segiunte propriedades:
```
  DATABASE_URL="<url do banco de dados>"
```
- A propriedade `DATABASE_URL` é usada para fazer a conexão com o banco de dados;
- Para rodar o projeto em desenvolvimento, execute o comando `npm run dev`;
- Testes manuais podem ser feitos através do Thunder Client. Na raiz do projeto há uma coleção chamada `thunder-collection.json` que pode ser carregada na ferramenta.

# Como rodar com docker

Para executar esta aplicação com Docker, é neccessário seguir os passos seguintes:

- Primeiramente é necessário criar uma network através do comando:
```
  docker network create my-wallet-network
```
`my-wallet-network` pode ser substituído pelo nome de sua escolha.

- Em seguida será necessário rodar uma instância do mongodb nessa mesma rede, pode se fazer isso através do comando:

```
  docker run --name mongo-mywallet --network=my-wallet-network -d mongo
```
`mongo-mywallet` pode ser substituído pelo nome de sua escolha, mas `my-wallet-network` deve ser o mesmo nome escolhido no item anterior.

- Alternativamente ao passo anterior, você pode rodar o mongo localmente no seu computador.

- Em seguida utilize o comando abaixo para rodar um container com a aplicação backend:
```
  docker run -d --name my-wallet-back --network=my-wallet-network -p 3000:5000 -e DATABASE_URL=mongodb://mongo-mywallet:27017/mywallet fsacerdote/my-wallet-backend
```
Note que `my-wallet-back` pode ser substituído por um nome de sua escolha, porém `my-wallet-network` e `mongo-mywallet` devem ser respectivamente o nome de sua network e da instância do mongo que está rodando nela. Se você estiver rodando localmente o mongo, ou através de um deploy, você deverá substituir `mongodb://mongo-mywallet:27017/mywallet fsacerdote/my-wallet-backend` pela URL do seu banco mongodb.

- Após a realização de todos os passos, o backend poderá ser acessado através do `localhost:3000`. Note que a porta de acesso pode ser mudada no último comando trocando `3000:5000` por `[porta desejada]:5000`.