require('module-alias/register');
const http = require('http'),
      listAPI = require('@listAPI'),
      listServer = http.Server(listAPI),
      listPORT = process.env.PORT || 3001,
      LOCAL = '0.0.0.0';

      listServer.listen(listPORT, LOCAL, () => console.log(`listAPI running on ${listPORT}`));
