<?php
/*
* Pubsub envelope publisher
* @author Ian Barber <ian(dot)barber(at)gmail(dot)com>
*/

//  Prepare our context and publisher
$context = new ZMQContext();
$publisher = new ZMQSocket($context, ZMQ::SOCKET_PUB);
$publisher->bind("tcp://127.0.0.1:3005");

while (true) {
    //  Write two messages, each with an envelope and content
    $publisher->send("Type-A", ZMQ::MODE_SNDMORE);
    $publisher->send("We don't want to see this");
    $publisher->send("heartbeat", ZMQ::MODE_SNDMORE);
    $publisher->send("This is a message from PHP");
    sleep (1);
}