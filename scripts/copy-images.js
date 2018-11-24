console.log('copying images...')

var ncp = require('ncp').ncp;

ncp.limit = 16;

ncp('assets/img', 'public/img', function (err) {
 if (err) {
   return console.error(err);
 }
 console.log('done!');
});
