# Carango Bom App

Aplicação que permite listar, cadastrar, alterar e excluir veículos, além de permitir cadastrar usuários no sistema.

## Instalação

```
npm install
```

## Testando a aplicação

```
npm test
```

## Iniciando o projeto

Rodar o comando `npm start` para iniciar o projeto no modo de desenvolvimento.

Acessar [http://localhost:3000](http://localhost:3000) para ver a aplicação no browser.

## Rotas

### Rotas públicas

- "/cadastro" - permite cadastro de um novo usuário.
- "/login" - realiza o login de um usuário no sistema.
- "/" - permite que um usuário veja a lista de veículos disponíveis no sistema.

### Rotas privadas

- "/cadastro-marca" - permite cadastro de uma marca de veículo.
- "/alteracao-marca/:id" - permite que um usuário altere uma marca existente de veículo.
- "/listar-marcas" - lista as marcas de veículos disponíveis no sistema.
- "/cadastro-veiculo" - permite cadastro de um veículo.
- "/alteracao-veiculo/:id" - permite que um usuário altere um veículo existente.
- "/listar-usuarios" - lista os usuários cadastrados no sistema.
- "/dashboard" - dashboard contendo dados dos veículos disponíveis e seus respectivos modelos.
