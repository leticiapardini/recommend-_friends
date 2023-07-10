
## 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- NodeJS, Express, Typescript
- Este repositório



# 👷 Como rodar

```bash

# Clonar os seguintes repositórios
git clone https://github.com/leticiapardini/recommend-_friends.git

# Entrar numa IDE de sua preferência e executar o comando:
npm install

# Executar o comando para rodar a aplicação
npm run dev

# Executar o comando para rodar os testes
npm run test

```

Feito isso, abra o postmam ou insominia e teste as rotas usando esse endereço: `http://localhost:3000/`

```bash

# rota para criar uma pessoa POST
http://localhost:3000/person

enviando pelo body name e cpf

# rota para buscar uma pessoa GET
http://localhost:3000/person/:CPF

# rota para limpar a base de dados DELETE
http://localhost:3000/clean

# rota para criar o relacionamento entre pessoas POST
http://localhost:3000/relationship

enviando pelo body cpf1 e cpf2

#rota para buscar recomendações dos amigos
http://localhost:3000/recommendations/:CPF

```

<br>

## :mortar_board: Autores

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/leticiapardini">
                <img src="https://avatars.githubusercontent.com/u/97961576?v=4.png" width="150px;" alt="Imagem de Letícia Pardini" />
                <br />
                <sub><b>Letícia Pardini</b></sub>
            </a>
        </td>
    </tr>
</table>
