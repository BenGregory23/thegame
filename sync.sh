#!/bin/bash


# Update project
git pull --rebase

# Create new image
sudo docker build -t nuxt-app .


# Stop current container
sudo docker stop nuxt-app
sudo docker rm nuxt-app


# Start container with new image
sudo docker run -d --name nuxt-app   -p 3000:3000   --restart=always   nuxt-app


