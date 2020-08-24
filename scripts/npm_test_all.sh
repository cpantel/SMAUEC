for NPM in api_users api_events api_rules odata ; do
   cd "$NPM";
#   touch server.js
   npm test;
   if [ $? != 0 ]; then
     echo " FAILED $NPM"
     cd ..
     exit 1
   fi
   cd .. 
 done
