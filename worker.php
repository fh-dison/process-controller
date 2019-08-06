#!/usr/bin/php
<?php


/* $context = new ZMQContext();
$publisher = new ZMQSocket($context, ZMQ::SOCKET_PUB);
$publisher->bind("tcp://127.0.0.1:3005");
 */

$max =  rand(1, 60);
define('MILLISECONDS', 250);


$count = 1;
while (++$count <= $max) {
  echo "[Status] on step $count of $max \n";

/*     $publisher->send("A", ZMQ::MODE_SNDMORE);
    $publisher->send("We don't want to see this");
    $publisher->send("heartbeat", ZMQ::MODE_SNDMORE);
    $publisher->send("This is a heartbeat message. Status OK. $count");  */
 

//    usleep (1000000);
    usleep (MILLISECONDS * 1000);

}  
echo "[Status] finishing";

if (($max %5) == 0) {
  echo " with error.\n";
  die (2);
}
echo "\n";

