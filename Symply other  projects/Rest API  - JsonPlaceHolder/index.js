import express from 'express'
import dotenv from 'dotenv';
import path  from 'path';
import fs from 'fs/promises'
dotenv.config();
import http from 'http';

const server = http.createServer((req, res) => {
    function GetFromBase(path, reqUrl){
        const reqUrlArr = reqUrl.split('/');
            let userid = Number(reqUrlArr[2]);
            res.writeHead(200, { "Content-Type" : "application/json"});
            if (reqUrlArr.length === 2 || reqUrlArr[2] === ''){
                const usersData = path
                fs.readFile(usersData, "utf-8")
                .then(data => {
                    res.end(data);
                })
            } else if (reqUrlArr.length === 3 && typeof(userid) === 'number'){
                const usersData = path
                fs.readFile(usersData, "utf-8")
                .then(data => {
                    const users = JSON.parse(data);
                    const filteredUsers = []
                    for (let user of users){
                        if (user.id === userid)
                        filteredUsers.push(user);
                    }
                    res.end(JSON.stringify(filteredUsers));
                });
            }
    }
    if (req.method === 'GET')
    {
        if (req.url === '/') {
            res.writeHead(200, { "Content-Type" : "text/plain"});
            const mainResponsePath = './response/main.txt'
            fs.readFile(mainResponsePath, 'utf-8')
            .then(data => res.end(data))
            .catch(er => res.end(er));
        } else if (req.url.split('/')[1] === 'users' ) {
            GetFromBase('./response/users.json', req.url)
        } 
        else if (req.url.split('/')[1] === 'comments' ) {
            GetFromBase('./response/comments.json', req.url)
        } else if (req.url.split('/')[1] === 'posts' ) {
            GetFromBase('./response/posts.json', req.url)
        } else if (req.url.split('/')[1] === 'albums' ) {
            GetFromBase('./response/albums.json', req.url)
        } else if (req.url.split('/')[1] === 'photos' ) {
            GetFromBase('./response/photos.json', req.url)
        } else if (req.url.split('/')[1] === 'todos' ) {
            GetFromBase('./response/todos.json', req.url)
        }
    }
})
 
server.listen(process.env.SERVER_PORT || 5000, ()=> {
    console.log("Server started...")
})
  