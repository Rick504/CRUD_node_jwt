# Projeto simples em node mostrando a criação de tokens jwt e typescript.

Para acessar a rota /protegido precisa ser efetuado o login na rota /login, assim ira gerar um token.

### Como Rodar:

    yarn
    yarn dev

### Como buildar:

    yarn build

# Criar .env com JWT_SECRET e PORT.

    JWT_SECRET=qualquerchavesua
    PORT=5173

# DB CONTAINER

### Entrar na pasta db_container e construa a imagem do Docker usando o seguinte comando:

    sudo docker compose up

### Apagar todas as imagens

    sudo docker rmi $(sudo docker images -a -q) -f

### Limpar rastros dos container e imagens

    sudo docker system prune

### Verificar Conteiners em execução

    sudo docker ps

### Verificar status container

    sudo docker ps -a

### Reiniciar container

    docker start <nome_ou_id_do_container>

### Verificar containers criados

    sudo docker images

## Forneça o Token

Algumas rota serão necessarias fornecer o token para executar alguma ação, passando no header da requisição:

- x-access-token: valueToken

---

# Documentação da API

**_Todas as rotas documentadas:_**

### Endpoint: /login

method: POST

Descrição: Tenta efetuar um login do usuário.

Parâmetros de consulta: Nenhum.

Enviar no corpo da requisição:

```
{
	"email": "teste@teste",
	"password": "123"
}
```

Saida:

type: object

```
{
	"email": "teste2@teste",
	"auth": true,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YUpXVCI6eyJlbWFpbCI6InRlc3RlMkB0ZXN0ZSIsInBhc3N3b3JkIjoiJDJiJDEwJEt1ZEpoZTM0VnFQcU5mT0JucTRxR09QNHBOVWhoWm1oY3YxRXhaZzJoSS4yZzZkSU5lYVVTIn0sImlhdCI6MTY4MDk5NTgxMiwiZXhwIjoxNjgwOTk3NjEyfQ.tpWBzbNbtKUeuk9o0seqfOIz3swG1_xW8m-UwPMHRRk"
}
```

Email ou senha incorretas:

Saida:

type: string

```
"Usuario e senha incorretos."
```

### Endpoint: /register

method: POST
Descrição: Registra um usuário.
Parâmetros de consulta: Nenhum.

Enviar no corpo da requisição:

```
{
	"name": "ana",
	"email": "ana@test",
	"password": "123456"
}
```

Saida:
type: object

```
{
	"email": "ana@test",
	"auth": true,
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YUpXVCI6eyJpZCI6ImMzNWRkOGQ1LTMwZDQtNGI0NS04ODQ2LTQwODM4MWFiNmVmNCIsIm5hbWUiOiJhbmEiLCJlbWFpbCI6ImFuYUB0ZXN0In0sImlhdCI6MTY4MDk5ODk0NCwiZXhwIjoxNjgxMDAwNzQ0fQ.t-zi3IqROODiL3g08LjhBWvnH3_guPimzdvXRQZX600"
}
```

Enviar campos a menos:
Saida:
type: string

```
"Erro ao tentar cadastrar usuário."
```

### Endpoint: /user/:id

method: GET
Descrição: Pega informações de um usuário.
Parâmetros de consulta: UUID, tipp string.

Saida:
type: Objeto

```
{
	"id": "f4238677-c15b-46ba-99f3-99b07ea96087",
	"name": "jonas4",
	"email": "jonas@teste4",
	"password": "1234",
	"created_at": "2023-04-09T02:33:09.416Z",
	"updated_at": "2023-04-09T02:33:09.416Z"
}
```

Erro ao encontrar usuário:
Saida:

type: string

```
'Erro ao tentar encontrar Usuário.'
```

### Endpoint: /update/user/:id

method: PUT
Descrição: Atualiza um usuário.
Parâmetros de consulta: UUID, tipp string.

Enviar no corpo da requisição:

```
{
	"name": "testeNovo",
	"email": "testeNovo@test",
	"password": "123456"
}
```

Saida:
type: string

```
"Usuário atualizado com sucesso !!"
```

Erro ao encontrar usuário:
Saida:

type: object

```
{
	"msgError": "Usuário não encontrado"
}
```

### Endpoint: /delete/user/:id

method: DELETE
Descrição: Deleta um usuário.
Parâmetros de consulta: UUID, tipp string.
Enviar no corpo da requisição: Nada.

Saida:
type: string

```
"Usuário deletado com sucesso !!"
```

Erro ao encontrar usuário:
Saida:

type: string

```
"Erro ao tentar deletar conta"
```
