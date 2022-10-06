<?php
  
  public static function forgot_password($email) {
    $response = array();
    if (DB::query('SELECT email FROM users WHERE email = :email', array(':email'=>$email))) {
      $terget = "support@samtos4realtech.com";
        $password = rand(999 , 99999);
        $subject =  "
                   SAMTOS INVESTMENT: password recovery
                 ";
        $message = "
                  <html>
                  <head>
                  <title><b> SAMTOS FORGOT PASSWORD</b></title>
                  </head>
                  <body>
                   <p style='font-weight: 300; font-size: 28px;'> Dear investor we would employ you to use this pin to recover your password"." <p style='color: #66a3ff; font-size: 33px'><strong><b>".$password."</b></strong></p></p>
                  </body>
                  </html>
               ";
         $header = "MIME-Version: 1.0\r\n";
         $header .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
         $header .= "FROM:". $terget;
        $to = DB::query('SELECT email FROM users WHERE email = :email', array(':email'=>$email))[0]['email'];
        $user_id = DB::query('SELECT id FROM users WHERE email = :email', array(':email'=>$email))[0]['id'];
      if (mail($to, $subject, $message , $header)) {
        if (count(DB::query('SELECT userid FROM password_token WHERE userid = :user_id', array(':user_id'=>$user_id))) == 0) {
           DB::query('INSERT INTO password_token VALUES (\'\', :password, :userid)', array(':password'=>$password, ':userid'=>$user_id));
          } else {
             DB::query('UPDATE password_token SET password = :password WHERE userid=:user_id', array(':password'=>$password , ':user_id'=>$user_id));        
          }
           $reponse['status'] = true;
          $response['body'] = "check your email for the pin";
        } else {
             $reponse['status'] = false;
          $response['body'] = "error sending your mail";
      }
    } else {
     $reponse['status'] = false;
     $response['body'] = "no user with this email";
    }
    echo json_encode($response);
  }
  
  
  
?>