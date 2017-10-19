#! /bin/bash
echo 'pack'
npm run build
tar -zcvf dist.tar.gz dist
echo 'upload'
scp dist.tar.gz  eric:/home/eric/vms
rm -r dist.tar.gz
echo 'unzip'
ssh -t eric "cd vms && tar -xzvf dist.tar.gz"
