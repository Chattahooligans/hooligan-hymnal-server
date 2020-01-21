#!/usr/bin/env bash
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs zip unzip
npm install -g @vue/cli@latest