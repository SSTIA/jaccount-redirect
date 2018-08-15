# jaccount-redirect

## Introduction

SJTU JAccount OAuth2 have these addresses:

```
baseURL: https://jaccount.sjtu.edu.cn/oauth2/
authorizationURL: https://jaccount.sjtu.edu.cn/oauth2/authorize
tokenURL: https://jaccount.sjtu.edu.cn/oauth2/token
logoutURL: https://jaccount.sjtu.edu.cn/oauth2/logout
```

However, the APIs are on another host:

```
https://api.sjtu.edu.cn/
```

This may cause some problems because some OAuth Libraries (like Omniauth) think that they are on the same host.

This project aims to redirect some HTTP GET/POST requests to these two different hosts based on the request url.

```
/oauth/authorize => https://jaccount.sjtu.edu.cn/oauth2/authorize
/oauth/token => https://jaccount.sjtu.edu.cn/oauth2/token
/oauth/logout => https://jaccount.sjtu.edu.cn/oauth2/logout
/oauth/api/* => https://api.sjtu.edu.cn/*
```

## Dependencies

nodejs >= 6

## Deployment

First, install the dependencies

```
$ npm install
```

Start directly on port XXXX:

```
$ PORT=XXXX npm run start
```

Or start with pm2 on port XXXX:

```
$ PORT=XXXX pm2 start pm2.yaml
```

If you don't specify the port, the default will be 34777.

## Notes

An [SSTIA](https://github.com/SSTIA) hosted project, created by [tc-imba](https://github.com/tc-imba).
