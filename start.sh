#!/bin/bash -e

#load NVM
source /$HOME/.nvm/nvm.sh 

#start the app
app=$HOME/app  
cd $app && source env.production.sh && forever start bin/www  
