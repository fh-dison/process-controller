#!/usr/bin/php
<?php


/* $context = new ZMQContext();
$publisher = new ZMQSocket($context, ZMQ::SOCKET_PUB);
$publisher->bind("tcp://127.0.0.1:3005");
 */

$max =  rand(1, 50);

$count = 0;
while (++$count <= $max) {
  echo "Heartbeat  it's $count of $max \n";

/*     $publisher->send("A", ZMQ::MODE_SNDMORE);
    $publisher->send("We don't want to see this");
    $publisher->send("heartbeat", ZMQ::MODE_SNDMORE);
    $publisher->send("This is a heartbeat message. Status OK. $count");  */
 

    sleep (1);

}  

if (($max %5) == 0) {
  die (2);
}
/* 
$count = 0;
while (++$count <= 4) {
  echo "$count\n";
  sleep(1);
} */