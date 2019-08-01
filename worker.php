#!/usr/bin/php
<?php


$context = new ZMQContext();
$publisher = new ZMQSocket($context, ZMQ::SOCKET_PUB);
$publisher->bind("tcp://127.0.0.1:3005");


$count = 0;
while (++$count <= 100) {
  echo "Hello..\n";
    //  Write two messages, each with an envelope and content
    $publisher->send("A", ZMQ::MODE_SNDMORE);
    $publisher->send("We don't want to see this");
    $publisher->send("heartbeat", ZMQ::MODE_SNDMORE);
    $publisher->send("This is a heartbeat message. Status OK."); 
 

    sleep (1);

}  

$count = 0;
while (++$count <= 4) {
  echo "$count\n";
  sleep(1);
}