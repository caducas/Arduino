#!/bin/bash
echo 'include ../plugins/Arduino/views/eventListener' >> ../../views/eventListener.jade

npm install

git clone https://github.com/ecto/duino
cp -r duino/lib/ node_modules/duino/

rm -rf duino