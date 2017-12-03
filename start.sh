#!/bin/bash -e

#load NVM
source /$HOME/.nvm/nvm.sh 

#start the app
app=$HOME/app  
cd $app && forever start bin/www  
