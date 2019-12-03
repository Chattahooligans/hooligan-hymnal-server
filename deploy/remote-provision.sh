#!/usr/bin/env bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs zip unzip nginx build-essential
sudo npm install -g pm2
mkdir app
mv /tmp/build.zip ~/app/build.zip
cd app
unzip build.zip
rm build.zip
#add app.js to pm2 so it manages it
pm2 start app.js
#output from this configures pm2 to run at startup
pm2 startup systemd | tail -1 | source /dev/stdin
sudo mv /tmp/nginx-sites-available.conf /etc/nginx/sites-available/default
sudo systemctl restart nginx