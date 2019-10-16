"# rm-ticketing-node-server"

basic implementation was done at https://github.com/Roman75/ticketing

here we begin to split each part into separate project to run each in separate docker container (microservice concept will be implemented) 

 on your docker host create config file in '/etc/rm-ticketing/node/'
 
run docker container
```bash
docker run -v config.yaml:/app/config.yaml romarius75/rm-ticketing-node-server:latest
```

run docker compose
```yaml
# misc
server:
  sleep: 100 # wait for startup in ms

# logging
log:
  logfile: true
  err: true
  info: false
  debug: false
  msg: false
  datePattern: 'yyyy-mm-dd HH:MM:ss'
  colors:
    msg: 'green'
    info: 'blue'
    debug: 'cyan'
    err: 'red'

# http
http:
  port: 8080
#  domain: 'localhost.int'
#  domain: 'ballcomplete.at'
#   ssl:
#     key: '/etc/ssl/certs/localhost.key'
#     cert: '/etc/ssl/certs/localhost.cert'

# socket
socket:
  logoutTokenTimeout: 10000 # logout token expires in ms
  mail:
    smtp:
      from: 'test@test.com'
      options:
        port: 587                     # is the port to connect to (defaults to 25 or 465)
        host: mail.google.com         # is the hostname or IP address to connect to (defaults to ‘localhost’)
#        secure:                      # defines if the connection should use SSL (if true) or not (if false)
#        ignoreTLS:                   # turns off STARTTLS support if true
#        requireTLS: true              # forces the client to use STARTTLS. Returns an error if upgrading the connection is not possible or fails.
#        opportunisticTLS:            # tries to use STARTTLS and continues normally if it fails
#        name:                        # optional hostname of the client, used for identifying to the server
#        localAddress:                # is the local interface to bind to for network connections
#        connectionTimeout:           # how many milliseconds to wait for the connection to establish
#        greetingTimeout:             # how many milliseconds to wait for the greeting after connection is established
#        socketTimeout:               # how many milliseconds of inactivity to allow
        logger: false                 # optional bunyan compatible logger instance. If set to true then logs to console. If value is not set or is false then nothing is logged
#        transactionLog:              # if set to true, then logs SMTP traffic without message content
        debug: false                  # if set to true, then logs SMTP traffic and message content, otherwise logs only transaction events
#        authMethod:                  # defines preferred authentication method, e.g. ‘PLAIN’
#        tls:                         # defines additional options to be passed to the socket constructor, e.g. {rejectUnauthorized: true}
#        socket:                      # - initialized socket to use instead of creating a new one
#        connection:                  # - connected socket to use instead of creating and connecting a new one. If secure option is true, then socket is upgraded from plaintext to ciphertext
        tls:
          rejectUnauthorized: false
      login:
        credentials:
          user: user1                 # is the username
          pass: Passw0Rd!             # is the password
        oauth2:
          user:                       # is the username
          clientId:                   # is the OAuth2 Client ID
          clientSecret:               # is the OAuth2 Client Secret
          refreshToken:               # is the refresh token to generate new access token if needed
          accessToken:                # is the access token

# mysql database
mysql:
  debug: false
  conn:
    debug: false
    host: 'localhost'
    user: 'user1'
    password: 'Passw0Rd!'
    database: 'ticketing_db'
    connectionLimit: 5
    timezone: 'utc'

 ```