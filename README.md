# Tutorials

- https://youtube.com/playlist?list=PLCakfctNSHkGYdA82WDUKF3WGyONpGiEw
- https://www.youtube.com/playlist?list=PL16WqdAj66SBSLZ2-TrZ5q_39UhtKyL9U
- LearnCode.academy https://www.youtube.com/playlist?list=PLoYCgNOIyGAAzevEST2qm2Xbe3aeLFvLc
- Automation Step by Step - Raghav Pal https://www.youtube.com/playlist?list=PLhW3qG5bs-L99pQsZ74f-LC-tOEsBp2rK
- Noureddin Sadawi
	- https://www.youtube.com/playlist?list=PLea0WJq13cnDsF4MrbNaw3b4jI0GT9yKt
	- http://wiki.zenoss.org/download/core/drich_slides/DockerSlides.pdf
- Krammark23: https://www.youtube.com/watch?v=T25Z4CUwYjE
- Traversy Media: https://www.youtube.com/playlist?list=PLillGF-Rfqbb6vZqT-Lzi9Al_noaY5LAs
- https://www.youtube.com/watch?v=YFl2mCHdv24&list=PL_HVsP_TO8z7aey-lCMe64BIx3VEfvPdn
- https://rominirani.com/docker-tutorial-series-a7e6ff90a
- https://docs.docker.com/develop/develop-images/dockerfile_best-practices/
- Dockerize all-sorts: https://docs.docker.com/samples/
- https://www.youtube.com/watch?v=8gEs_zefNYA
- https://github.com/Ruslan-Aliyev/Docker/blob/master/other_helpful_articles/DockerSlides.pdf

# Official Sites:

- https://get.docker.com/
- https://docs.docker.com/

# Cheatsheets:

- https://www.linode.com/docs/applications/containers/docker-commands-quick-reference-cheat-sheet/
- https://github.com/wsargent/docker-cheat-sheet#instructions
- https://kapeli.com/cheat_sheets/Dockerfile.docset/Contents/Resources/Documents/index
- https://github.com/Ruslan-Aliyev/Docker/blob/master/other_helpful_articles/docker_cheatsheet_1.pdf
- https://github.com/Ruslan-Aliyev/Docker/blob/master/other_helpful_articles/docker_cheatsheet_2.pdf

# Root priviledge issue: 
- https://dzone.com/articles/docker-without-root-privileges * 
- https://www.redhat.com/en/blog/understanding-root-inside-and-outside-container *
- https://betterprogramming.pub/running-a-container-with-a-non-root-user-e35830d1f42a 
- https://medium.com/@mccode/processes-in-containers-should-not-run-as-root-2feae3f0df3b
- https://docs.docker.com/install/linux/linux-postinstall/#manage-docker-as-a-non-root-user
- https://github.com/Ruslan-Aliyev/Docker/blob/master/other_helpful_articles/Docker%20Tips_%20Running%20a%20Container%20With%20a%20Non%20Root%20User%20_%20by%20Luc%20Juggery%20_%20Better%20Programming.pdf
- https://github.com/Ruslan-Aliyev/Docker/blob/master/other_helpful_articles/Processes%20In%20Containers%20Should%20Not%20Run%20As%20Root%20_%20by%20Marc%20Campbell%20_%20Medium.pdf

# Dockerize Nginx: 
- https://codeburst.io/get-started-with-nginx-on-docker-907e5c0c9f3a 
- https://medium.com/myriatek/using-docker-to-run-a-simple-nginx-server-75a48d74500b 
- https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
- https://www.tutorialspoint.com/docker/building_web_server_docker_file.htm
- https://www.geeksforgeeks.org/how-to-build-a-web-server-docker-file/ 
- https://github.com/Ruslan-Aliyev/Docker/blob/master/other_helpful_articles/Using%20Docker%20to%20Run%20a%20Simple%20Nginx%20Server%20_%20by%20Aditya%20Purwa%20_%20Myriatek%20_%20Medium.pdf

# Repository:

- https://hub.docker.com/

## Dockerhub

![](/Illustrations/dockerhub.png)

- https://ropenscilabs.github.io/r-docker-tutorial/04-Dockerhub.html

# Fiddles:

- https://labs.play-with-docker.com/

# Test projects:

- https://writing.pupius.co.uk/apache-and-php-on-docker-44faef
- https://github.com/nishanttotla/DockerStaticSite
- https://semaphoreci.com/community/tutorials/dockerizing-a-php-application

# Architecture:

![](/Illustrations/docker.png)

- WSL: 
	- https://www.youtube.com/watch?v=-atblwgc63E
	- https://docs.docker.com/desktop/windows/wsl/

# Install:

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

OR for MAC:
- https://docs.docker.com/docker-for-mac/install/
	- You might need to get pass this permission problem: https://www.howtogeek.com/205393/gatekeeper-101-why-your-mac-only-allows-apple-approved-software-by-default/

Now docker commands are available to you.
```
sudo service docker start
docker info

sudo groupadd docker sudo gpasswd -a $USER docker sudo usermod -a -G docker

${user} sudo service docker restart 
# OR reboot physically
```

---

# Setup web server:

https://github.com/atabegruslan/Others/blob/master/Server/setup_webserver.md#setup-web-server-via-docker

---

# Swarms:

1. https://www.youtube.com/watch?v=bU2NNFJ-UXA
2. https://www.youtube.com/watch?v=3-7gZS4ePak

- http://www.jadejaber.com/articles/hello-docker-with-swarm-mono-node/
- https://www.sumologic.com/glossary/docker-swarm/
- https://vsupalov.com/difference-docker-compose-and-docker-stack/
- https://stackoverflow.com/questions/44500394/docker-swarms-and-stacks-whats-the-difference#:~:text=Docker%20swarm%20is%20a%20Clustering,scheduling%20containers%20across%20multiple%20nodes.&text=Docker%20stack%20is%20a%20collection,is%20yaml%20(yml%20also)
- https://docs.docker.com/engine/swarm/
- https://github.com/swarmstack/swarmstack
- https://betterprogramming.pub/how-to-differentiate-between-docker-images-containers-stacks-machine-nodes-and-swarms-fd5f7e34eb9f
- https://www.youtube.com/watch?v=Tm0Q5zr3FL4
- https://www.youtube.com/watch?v=74p7csxKN8M
- https://www.youtube.com/watch?v=Yq-SQTESTJE

## Load Balancing

- https://www.quora.com/How-do-I-run-a-website-on-multiple-servers
- https://serverfault.com/questions/774512/how-to-host-a-single-website-on-multiple-servers

- https://www.youtube.com/watch?v=K0Ta65OqQkY
- https://www.youtube.com/watch?v=R39VRocQtrQ
- https://www.youtube.com/watch?v=pdBHsA2FG48
- https://upcloud.com/community/tutorials/load-balancing-docker-swarm-mode/

# Kubernetes:

- https://www.youtube.com/watch?v=QJ4fODH6DXI <sup>Good short intro</sup>
- https://www.youtube.com/watch?v=7bA0gTroJjw <sup>Good longer intro</sup>
- https://www.youtube.com/watch?v=l7gC4SgW7DU <sup>Good installation tutorial</sup>
- https://www.youtube.com/watch?v=UWg3ORRRF60
- https://www.youtube.com/watch?v=X48VuDVv0do
- https://www.youtube.com/playlist?list=PLMPZQTftRCS8Pp4wiiUruly5ODScvAwcQ
- https://www.youtube.com/watch?v=1xo-0gCVhTU
- https://www.tutorialspoint.com/kubernetes/index.htm
- https://www.youtube.com/watch?v=X9fSMGkjtug

## Swarms vs Kubernetes
- https://www.youtube.com/watch?v=9_s3h_GVzZc


