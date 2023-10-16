<!-- PROJECT -->
<br />
<p align="center">
  <h2 align="center">Frontend</h2>

  <p align="center">
    Implementar o frontend com Next com as funcionalidades de login, tabela de usuarios e acoes (criar,editar, deletar) usando APIRest.
  </p>
</p>

### Tecnologias Utilizadas

O projeto foi criado usando as tecnologias:

- [Typescript]
- [Next]
- [tailwindcss]
- [nextui]
- [zustand]
- [ContextAPI]
- [yup]
- [react-hook-form]

<!-- GETTING STARTED -->

A seguir estão as instruções para a instalação, configuração e uso do projeto.

### Configuração

1. Clonar o repositório

```sh
   git clone https://github.com/rodolfowolff/web-dashskin
```

2. Configuração das variaveis de ambiente

- Criar um arquivo na raiz do projeto, chamado [.env].

- Copiar o conteúdo do arquivo [.env.example] e configurar os dados conforme seus dados.

### Importante!

Antes de executar o projeto, deve ser criado um usuario no backend usando a rota abaixo com os seguintes dados:

POST http://localhost:3333/users
Content-Type: application/json

{
"username": "admin",
"email": "admin@admin.com",
"age": 18,
"avatar": "https://i.pravatar.cc/150?img=50"
}

### Instalação e execução

1. Instalando os pacotes

```sh
    npm install
```

4. Executar localmente

```sh
    npm run dev
```

### Rodando aplicação localmente

No navegador, digitar <a href="http://localhost:3000/">http://localhost:3000/</a>.

<!-- LINKS -->

### Backend link do projeto

<a href="https://github.com/rodolfowolff/api-dashskins">https://github.com/rodolfowolff/api-dashskins</a>

<!-- CONTACT -->

## 🐺 👨‍💻 Desenvolvedor

- [Rodolfo Wolff](https://github.com/rodolfowolff)
