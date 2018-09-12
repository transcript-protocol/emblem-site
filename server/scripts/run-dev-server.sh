#!/bin/bash

test_db="emblem_dev"

export EMBLEM_DATABASE="${test_db}"

function cleanup {
    kill -9 $ganache_pid

    mongo $test_db --eval "db.dropDatabase()"
    mongo admin --eval "db.shutdownServer()"

    sleep 1
}

trap cleanup EXIT

cd ../truffle

ganache_pid=`npm run ganache`
echo "Started ganache, pid ${ganache_pid}"

mongod --fork --logpath ../mongod.log

npm run migrate

cd ../
yarn start
