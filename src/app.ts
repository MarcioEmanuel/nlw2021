import "dotenv/config";
import express, { Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { router } from "./routes";

const app = express ();

app.use(cors())

//Upar server via http
const serverHttp = http.createServer(app);

const io = new Server(serverHttp, {
    cors: {
        origin:"*" //prtmite que outras fontes como (frontend e mibile) se conectem com o Http via (express) e com o web socket
    }
});

io.on("connectio", socket => {
    console.log(`Usuário conectado no Socket ${socket.id}`);
});

app.use(express.json());

app.use(router);

app.get("/github", (request, response) => {
    response.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
    );
});

app.get("/signin/callback", (request, response) => {
    const { code } = request.query;

    return response.json(code);
})

serverHttp.listen(4000, () => 
console.log(':rocket: Server is running on PORT 4000')
);

export { serverHttp, io }