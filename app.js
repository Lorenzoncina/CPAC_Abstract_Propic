/**
 * This is an example of a basic node.js script that performs
 * the Authorization Code oAuth2 flow to authenticate against
 * the Spotify Accounts.
 *
 * For more information, read
 * https://developer.spotify.com/web-api/authorization-guide/#authorization_code_flow
 */

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var mysql  = require('mysql');
var fs = require('fs');
const path = require('path');
const process = require('process');

var client_id = 'a9267ea45ac6490dbc54eee95b219182'; // Your client id
var client_secret = 'caeb549360fa473880a7a0df0d2982a4'; // Your secret
var redirect_uri = 'http://localhost:8888/callback'; // Your redirect uri

/**
 * Generates a random string containing numbers and letters
 * @param  {number} length The length of the string
 * @return {string} The generated string
 */
var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

var app = express();

app.use(express.static(__dirname + '/public'))
   .use(cors())
   .use(cookieParser());

app.get('/login', function(req, res) {

  var state = generateRandomString(16);
  res.cookie(stateKey, state);

  // your application requests authorization
  var scope = 'user-read-private user-read-email user-top-read';
  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      state: state
    }));
});

app.get('/callback', function(req, res) {

  // your application requests refresh and access tokens
  // after checking the state parameter

  var code = req.query.code || null;
  var state = req.query.state || null;
  var storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie(stateKey);
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        var access_token = body.access_token,
            refresh_token = body.refresh_token;

        var options = {
          //url: 'https://api.spotify.com/v1/me',
          url: 'https://api.spotify.com/v1/me/top/tracks?time_range=long_term&limit=30',
          headers: { 'Authorization': 'Bearer ' + access_token },
          json: true
        };

        // use the access token to access the Spotify Web API
        request.get(options, function(error, response, body) {
          console.log(body);
        });


        // we can also pass the token to the browser to make requests from there
        res.redirect('/#' +
          querystring.stringify({
            access_token: access_token,
            refresh_token: refresh_token
          }));
      } else {
        res.redirect('/#' +
          querystring.stringify({
            error: 'invalid_token'
          }));
      }
    });
  }
});

app.get('/refresh_token', function(req, res) {

  // requesting access token from refresh token
  var refresh_token = req.query.refresh_token;
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
    form: {
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var access_token = body.access_token;
      res.send({
        'access_token': access_token
      });
    }
  });
});

/*
  Add the logged user to the database with his songs list
*/
var id;
app.get('/add_new_user', function(req,res){
  //res.send('ok');
  id = req.query.user;
  var song1 = req.query.song1;
  var song2 = req.query.song2;
  var song3 = req.query.song3;
  var song4 = req.query.song4;
  var song5 = req.query.song5;
  var song6 = req.query.song6;
  var song7 = req.query.song7;
  var song8 = req.query.song8;
  var song9 = req.query.song9;
  var song10 = req.query.song10;
  var song11 = req.query.song11;
  var song12 = req.query.song12;
  var song13 = req.query.song13;
  var song14 = req.query.song14;
  var song15 = req.query.song15;
  var song16 = req.query.song16;
  var song17 = req.query.song17;
  var song18 = req.query.song18;
  var song19 = req.query.song19;
  var song20 = req.query.song20;
  var song21 = req.query.song21;
  var song22 = req.query.song22;
  var song23 = req.query.song23;
  var song24 = req.query.song24;
  var song25 = req.query.song25;
  var song26 = req.query.song26;
  var song27 = req.query.song27;
  var song28 = req.query.song28;
  var song29 = req.query.song29;
  var song30 = req.query.song30;
  var token = req.query.token;
  console.log(id);
  console.log(song1);
  //console.log(token);


  var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Confienza19',
    database : 'image_profile_database'
  });

/*
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    var userNotSigned;
    //check if the user is already registered
    var sql = "SELECT * FROM users WHERE id = '"+id +"'";
    connection.query(sql, function (err, result) {
      if (err) throw err;
      console.log("result.length"+result.length);
      if (result.length == 0){
        //first login (register new user)
        var sql = "INSERT INTO users (id,song1,song2,song3,song4,song5,song6,song7,song8,song9,song10) VALUES ("+"'"+id+"'" +","+"'"+song1+"'"+","+"'"+song2+"'"+","+"'"+song3+"'"+","+"'"+song4+"'"+","+"'"+song5+"'" +","+"'"+song6+"'" +","+"'"+song7+"'" +","+"'"+song8+"'"+","+"'"+song9+"'"+","+"'"+song10+"'"    +")";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("New user inserted");
        });
      } else{
        //user already registerd (just update songs)
        var sql = "UPDATE users SET song1 = '"+song1+"'"+", song2='"+song2+"'"+", song3='"+song3+"'"+", song4='"+song4+"'"+", song5='"+song5+"'"+", song6='"+song6+"'"+", song7='"+song7+"'"+", song8='"+song8+"'"+", song9='"+song9+"'"+", song10='" +song10 +"' WHERE id = '"+id+"'";
        connection.query(sql, function (err, result) {
          if (err) throw err;
          console.log("User already existing, so Songs of the user updated");
        });
      }
    });

  });
  */
  connection.connect();



  var sql = "SELECT * FROM users WHERE id = '"+id +"'";
  connection.query(sql,function (error, result ) {
    if (error) throw error;
    console.log("result.length"+result.length);
    if (result.length == 0){
      //first login (register new user)
      var sql = "INSERT INTO users (id,song1,song2,song3,song4,song5,song6,song7,song8,song9,song10) VALUES ("+"'"+id+"'" +","+"'"+song1+"'"+","+"'"+song2+"'"+","+"'"+song3+"'"+","+"'"+song4+"'"+","+"'"+song5+"'" +","+"'"+song6+"'" +","+"'"+song7+"'" +","+"'"+song8+"'"+","+"'"+song9+"'"+","+"'"+song10+"'"    +")";
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("New user inserted");
        connection.end();
      });
    } else{
      //user already registerd (just update songs)
      var sql = "UPDATE users SET song1 = '"+song1+"'"+", song2='"+song2+"'"+", song3='"+song3+"'"+", song4='"+song4+"'"+", song5='"+song5+"'"+", song6='"+song6+"'"+", song7='"+song7+"'"+", song8='"+song8+"'"+", song9='"+song9+"'"+", song10='" +song10 +"' WHERE id = '"+id+"'";
      connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("User already existing, so Songs of the user updated");
        connection.end();
      });
    }
  });



  //call python script whti the correct user id

  const { spawn } = require('child_process');
  var pythonProcess = spawn('python',["image_generator.py",song1,song2, song3, song4,song5,song6,song7,song8,song9,song10,song11,song12, song13, song14,song15,song16,song17,song18,song19,song20,song21,song22, song23, song24,song25,song26,song27,song28,song29,song30,token,id] );

  var h,a,s,r, numeri, numeristr;
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
    numeri = data.toString().split(',');

    h = parseInt(numeri[0]);
    a = parseInt(numeri[1]);
    s = parseInt(numeri[2]);
    r = parseInt(numeri[3]);
    numeriInt = [h,a,s,r];
    //console.log(typeof(numeriInt));

  });


  pythonProcess.on('close', ()=>{
    image_name = req.query.image_name + ".png";
    image_path = process.cwd()+"\\images_generated\\"+image_name;
    console.log(image_path);
    //accedi alla cartella image_generated e prendi l'immagine

    fs.readFile(image_path,'base64',function(err,base64Image){
       const dataUrl = 'data:image/png;base64,'+base64Image;
       return res.json({image: "<img src="+dataUrl+ ">", arrayNumeri : numeriInt});
    });
  });





  /*

    const spawnSync = require("child_process").spawnSync;

    var pythonProcess = spawnSync('python',["image_generator.py", song1,song2, song3, song4,song5,song6,song7,song8,song9,song10,token,id] );
    console.log(result.stdout.toString());
*/


  /*
  pythonProcess.stdout.on('data', function(data)  {
        console.log(String(data));
  });
  */

});

/*
app.get('/retrieve_new_profile_image', function(req,res){
  image_name = req.query.image_name + ".png";
  image_path = process.cwd()+"\\images_generated\\"+image_name;
  console.log(image_path);
  //accedi alla cartella image_generated e prendi l'immagine

  fs.readFile(image_path,'base64',function(err,base64Image){
     const dataUrl = 'data:image/png;base64,'+base64Image;
     return res.send('<img src='+dataUrl+">");
  });

  //restituisci l'immagine al clinet con il res



  //res.send({new_image : image});
  //res.json({new_image : image});
  /*
  var options = {
   root: image_path,
   dotfiles: 'deny',
   headers: {
     'x-timestamp': Date.now(),
     'x-sent': true
   }
  }
  var fileName = image_name;
  res.sendFile(fileName, options, function (err) {
   if (err) {
     next(err)
   } else {
     console.log('Sent:', fileName)
   }
 })
 */
//});


console.log('Listening on 8888');
app.listen(8888);
