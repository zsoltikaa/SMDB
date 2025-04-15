<?php

  // define the server name for the database connection
  $servername = "localhost"; // the database server is hosted locally

  // define the username for the database connection
  $username = "root"; // default username for mysql on localhost

  // define the password for the database connection
  $password = ""; // no password set for the default user on localhost

  // define the database name to connect to
  $dbname = "SMDB"; // the name of the database we want to use

  // create a connection to the MySQL server using the above credentials
  $conn = mysqli_connect($servername, $username, $password, $dbname);

  // check if the connection was successful
  if (!$conn) {
    // if the connection fails, display an error message and stop the script
    die("Connection failed: " . mysqli_connect_error());
  }

  // if the connection is successful, this line would run (currently commented out)
  // echo "Connected successfully";

?>