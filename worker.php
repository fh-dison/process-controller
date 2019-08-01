<?php


$context = new ZMQContext();
$publisher = new ZMQSocket($context, ZMQ::SOCKET_PUB);
$publisher->bind("tcp://127.0.0.1:3005");

$result = $publisher->send("message", ZMQ::MODE_SNDMORE);
echo var_export($result);
$publisher->send("We want to see this");
die;
$count = 0;
while (++$count <= 10) {
  echo "Hello..\n";
    //  Write two messages, each with an envelope and content
/*     $publisher->send("A", ZMQ::MODE_SNDMORE);
    $publisher->send("We don't want to see this");
    $publisher->send("B", ZMQ::MODE_SNDMORE);
    $publisher->send("We would like to see this"); */
  //  $publisher->sendM
  //  $publisher->send(['message', 'Hello from PHP']);

    $publisher->send("message", ZMQ::MODE_SNDMORE);
    $publisher->send("We want to see this");

    sleep (1);

}