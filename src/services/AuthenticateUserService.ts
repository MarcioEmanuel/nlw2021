import axios from "axios";
/*
* receber code
* recuperar o acces_token no github
* verificar se o user existe no BD
* se sim.. gera um token
* se nao.. Cria no BD e gera o Token
* retornar oo token com as infoos do user
*/

class AuthenticateUserService{
  async execute(code: string) {
    const url = "https://github.com/login/oauth/access_token"

    const response = await axios.post(url,null, {
        params:{
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code,
        },
        headers: {
            "Accept": "application/json"
        }
    })

    return response.data;

  }
}

export {AuthenticateUserService}