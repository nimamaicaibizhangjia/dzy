"use strict";
const express = require('express'); 
const app = express();  
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.all('*', function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization,Accept,X-Requested-With");
      res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
      res.header("X-Powered-By", ' 3.2.1')
      if (req.method == "OPTIONS") res.send(200);
      else next();
    });
const USERS=[
    {id:'01',userName:'admin',password:'123456'},
  
];
app.get('/users', function (req, resp) {
      resp.send(USERS);
      resp.end();
    });

    app.get('/users/:id', function (req, resp) {
        console.log(req.params);
        const id = req.params.id;
        for (let user of USERS) {
            if (user.id === id) {
                resp.send([user]);
                break;
            }
        }
        resp.end();
    });
app.post('/user', function (req, resp)
{
  // json
 USERS.push(req.body);
  resp.send({ succ: true });
  resp.end();
}); 
   
app.put('/user', function (req, resp) {
      // json
      let founded = false;
      for (let user of USERS) {
        if (user.id === req.body.id) {
          user.userName = req.body.userName;
          user.password = req.body.password;
          founded = true;
          break;
       }
     }
      if (founded) {
        resp.send({ succ: true });
     }
      else {
        resp.send({ succ: false, msg: '没有找到用户!' });
     }
      resp.end();
    });
    app.delete('/user/:id', function (req, resp) {
          let founded = false;
          let index = 0;
          for (let user of USERS) {
            if (user.id === req.params.id) {
              USERS.splice(index, 1);
              founded = true;
              break;
           }
            index++;
         }
          if (founded) {
            resp.send({ succ: true });
         }
          else {
            resp.send({ succ: false, msg: '没有找到用户!' });
         }
          resp.end();
        });
        const YHS=[
            {id:'01',userName:'admin',password:'123456'},
            {id:'02',userName:'abc',password:'111111'},
        ];
        app.get('/yhs', function (req, resp) {
              resp.send(YHS);
              resp.end();
            });
        
            app.get('/yhs/:id', function (req, resp) {
                console.log(req.params);
                const id = req.params.id;
                for (let yh of YHS) {
                    if (yh.id === id) {
                        resp.send([yh]);
                        break;
                    }
                }
                resp.end();
            });
        app.post('/yh', function (req, resp)
        {
          // json
         YHS.push(req.body);
          resp.send({ succ: true });
          resp.end();
        }); 
        app.post('/yhs', function (req, resp)
        {
          // json
          let founded = false
          for (let yh of YHS) {
                if (yh.userName === req.body.userName) {   
                 if (  yh.password === req.body.password) {
                  founded = true;
                  break;
               }
             break;}
             }
              if (founded) {
                resp.send({ succ: true });
             }
              else {
                resp.send({ succ: false, msg: '没有找到用户!' });
             }
              resp.end();
            });
        app.put('/yh', function (req, resp) {
              // json
              let founded = false;
              for (let yh of YHS) {
                if (yh.id === req.body.id) {
                      yh.userName = req.body.userName;
                      yh.password = req.body.password;
                  founded = true;
                  break;
               }
             }
              if (founded) {
                resp.send({ succ: true });
             }
              else {
                resp.send({ succ: false, msg: '没有找到用户!' });
             }
              resp.end();
            });
            app.delete('/yhs/:id', function (req, resp) {
                  let founded = false;
                  let index = 0;
                  for (let yh of YHS) {
                    if (yh.id === req.params.id) {
                      YHS.splice(index, 1);
                      founded = true;
                      break;
                   }
                    index++;
                 }
                  if (founded) {
                    resp.send({ succ: true });
                 }
                  else {
                    resp.send({ succ: false, msg: '没有找到用户!' });
                 }
                  resp.end();
                });
               
app.listen(8080, function () {
      console.log('服务器在8080端口启动！');
    });