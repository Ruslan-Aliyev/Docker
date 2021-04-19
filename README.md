# Tutorials

- https://youtube.com/playlist?list=PLCakfctNSHkGYdA82WDUKF3WGyONpGiEw
- LearnCode.academy https://www.youtube.com/playlist?list=PLoYCgNOIyGAAzevEST2qm2Xbe3aeLFvLc
- Automation Step by Step - Raghav Pal https://www.youtube.com/playlist?list=PLhW3qG5bs-L99pQsZ74f-LC-tOEsBp2rK
- Noureddin Sadawi
	- https://www.youtube.com/playlist?list=PLifxsivI_0Sq9Q7_tNPsYcratDh5sq34 
	- http://wiki.zenoss.org/download/core/drich_slides/DockerSlides.pdf
- Krammark23: https://www.youtube.com/watch?v=T25Z4CUwYjE
- Traversy Media https://www.youtube.com/playlist?list=PLillGF-Rfqbb6vZqTLzi9Al_noaY5LAs
- https://www.youtube.com/watch?v=YFl2mCHdv24&list=PL_HVsP_TO8z7aey-lCMe64BIx3VEfvPdn
- https://www.youtube.com/playlist?list=PLillGF-Rfqbb6vZqT-Lzi9Al_noaY5LAs
- https://rominirani.com/docker-tutorial-series-a7e6ff90a

# Official Sites:

- https://get.docker.com/
- https://docs.docker.com/

# Repository:

- https://hub.docker.com/

# Cheatsheets:

- https://www.linode.com/docs/applications/containers/docker-commands-quick-reference- cheat-sheet/
- https://github.com/wsargent/docker-cheat-sheet#instructions

# Fiddles:

- https://labs.play-with-docker.com/

# Test projects:

- https://writing.pupius.co.uk/apache-and-php-on-docker-44faef
- https://github.com/nishanttotla/DockerStaticSite
- https://semaphoreci.com/community/tutorials/dockerizing-a-php-application

![](/Illustrations/docker1.png)

![](/Illustrations/docker2.png)

Docker only expose to kernel

![](/Illustrations/docker3.png)

The making of a Docker process

![](/Illustrations/docker4.png)

# Install :

Check Ubuntu version first: `lsb_release -a`

- https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04

- https://www.youtube.com/watch?v=f7hCzwYBIXc
	- https://docs.docker.com/compose/install/

OR:

```
sudo yum -y update sudo
yum install -y docker
```
OR:
```
sudo apt-get update sudo
apt-get install docker.io
```
Now docker commands are available to you.
```
sudo service docker start
docker info

sudo groupadd docker sudo gpasswd -a $USER docker sudo usermod -a -G docker

$USER sudo service docker restart 
# OR reboot physically
```
https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user

# Play around :

Take “Docker serve html static site”
```
docker build -t atabegruslan/static-nginx.
docker run -d -p 8088:80 --name name_16 atabegruslan/static-nginx
```
Port 80 is exposed into the docker daemon.
Port 8088 is exposed to out to the world.

See: http://localhost:
```
docker ps      # see containers docker inspect d2e982dd6182|grep
"IPAddress"    # get IP Address

docker images  # see images docker tag 9d320f8b
atabegruslan/static-nginx:firsttry

docker login
docker push atabegruslan/static-nginx
```

![](/Illustrations/docker5.png)

![](/Illustrations/docker6.png)

# Dockerhub:

https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html

# For MAC

(http://boot2docker.io/, http://macappstore.org/boot2docker/)
https://www.docker.com/products/docker-desktop

after install boot2docker:

```
boot2docker up
$(boot2docker shellinit) # exec the output of boot2docker
shellinit then u can run docker commands boot2docker ip //get
```

IP address of boot2docker virtual machine Other platforms:

- https://docs.docker.com/install/#supported-platforms
- https://docs.docker.com/docker-for-mac/install/
- https://store.docker.com/editions/community/docker-ce-desktopmac
- https://docs.docker.com/docker-for-windows/install/
- https://docs.docker.com/docker-for-mac/install/

![](/Illustrations/docker7.png)

## Update

Actually the above Docker for Mac method is old. See below for the updated way----

- https://docs.docker.com/docker-for-mac/install/
	- You might need to get pass this permission problem: https://www.howtogeek.com/205393/gatekeeper-101-why-your-mac-only-allows-apple-approved-software-by-default/
