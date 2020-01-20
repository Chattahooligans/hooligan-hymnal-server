#!/usr/bin/env bash
#run this in order to prep everything and run Packer to create an image in GCP.
#note that this is experimental and would probably not be suitable for production.
#please see the Hooligan Hymnal docs for information on deploying to Heroku instead.

#get script's directory
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cd $DIR/..
zip -r deploy/build.zip .
cd $DIR
packer build packer.json
rm build.zip