#!/usr/bin/env bash
# install node and nginx
#sudo apt-get install -y curl apt-transport-https ca-certificates &&
#  curl --fail -ssL -o setup-nodejs https://deb.nodesource.com/setup_6.x &&
#  sudo bash setup-nodejs &&
#  sudo apt-get install -y nodejs zip unzip nginx build-essential git npm
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install -y zip unzip nginx build-essential git nodejs
sudo npm install -g @vue/cli@latest

# install Passenger to manage node
# install Passenger PGP key, add HTTPS support to apt
sudo apt-get install -y dirmngr gnupg
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 561F9B9CAC40B2F7
sudo apt-get install -y apt-transport-https ca-certificates
# add the Passenger apt repo
sudo sh -c 'echo deb https://oss-binaries.phusionpassenger.com/apt/passenger bionic main > /etc/apt/sources.list.d/passenger.list'
sudo apt-get update
# install passenger + nginx module
sudo apt-get install -y libnginx-mod-http-passenger
# end passenger installation
# enable passenger nginx module, restart nginx
if [ ! -f /etc/nginx/modules-enabled/50-mod-http-passenger.conf ]; then sudo ln -s /usr/share/nginx/modules-available/mod-http-passenger.load /etc/nginx/modules-enabled/50-mod-http-passenger.conf ; fi
sudo ls /etc/nginx/conf.d/mod-http-passenger.conf
sudo service nginx restart
# validate the Passenger install. if image building fails, we can view this in console logs
sudo /usr/bin/passenger-config validate-install
sudo /usr/sbin/passenger-memory-stats
# upgrade the rest of the system
sudo apt-get upgrade -y

# install Hooligan Hymnal into a spot where nginx can grab it
sudo mkdir -p /var/www/hymnal/
sudo useradd -s /bin/false hymnal
sudo chown hymnal /var/www/hymnal

sudo mkdir -p ~hymnal/.ssh
touch $HOME/.ssh/authorized_keys
sudo sh -c "cat $HOME/.ssh/authorized_keys >> ~hymnal/.ssh/authorized_keys"
sudo chown -R hymnal: ~hymnal/.ssh
sudo chmod 700 ~hymnal/.ssh
sudo chown hymnal /home/hymnal
sudo sh -c "chmod 600 ~hymnal/.ssh/*"

# add github to trusted hosts
cd /var/www/hymnal/
sudo -H -u hymnal bash -c 'git clone https://github.com/Chattahooligans/hooligan-hymnal-server.git code'
cd /var/www/hymnal/code
sudo -H -u hymnal bash -c 'npm install'
sudo -H -u hymnal bash -c 'npm run-script build'

sudo mv /tmp/nginx-sites-enabled.conf /etc/nginx/sites-enabled/hymnal.conf
sudo mv /tmp/nginx.conf /etc/nginx/nginx.conf
sudo systemctl restart nginx