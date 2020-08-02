#!/bin/bash
cd ./remote_home/
lib=blogShowVue
rm -rf $lib
mkdir $lib
mv dist buildconf/Dockerfile buildconf/default.conf -f $lib
cd ./$lib
imagename=vueblogshow
name=vueblogShow
images=$(docker images | grep $imagename | sort -t ' ' -k 2  -r | head -n 3 | awk 'NR==3 {print $2}')
if  [ $images ]; then
        docker rmi $imagename$images
        echo "delete $imagename$images"
else
        echo 'images not exist'
fi
time=$(date "+%Y_%m_%d_%H_%M")
docker build -t $imagename:$time  .
docker stop $name
docker rm $name
docker run -id -p 2365:80 --name=$name $imagename:$time