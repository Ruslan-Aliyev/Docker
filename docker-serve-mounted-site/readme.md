https://www.youtube.com/watch?v=YFl2mCHdv24&list=PL_HVsP_TO8z7aey-lCMe64BIx3VEfvPdn&index=45

Container's server serve host's folder via mount

https://hub.docker.com/_/php : Apache with a Dockerfile

```
docker build -t hello-world .
docker run -p 81:80 -v /home/ruslan/Desktop/docker-serve-mounted-site/src/:/var/www/html/ hello-world
```

go to http://localhost:81/

