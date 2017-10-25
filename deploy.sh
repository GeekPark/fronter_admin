#! /bin/bash
echo 'pack'
npm run build
tar -zcvf dist.tar.gz dist
echo 'upload'
scp dist.tar.gz  www:/home/www/fronter_admin
rm -r dist.tar.gz
echo 'unzip'
ssh -t www "cd fronter_admin && tar -xzvf dist.tar.gz"
