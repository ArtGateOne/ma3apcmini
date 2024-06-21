//ma3apcminimk2 v1.0.5 by ArtGateOne

var easymidi = require('easymidi');
var osc = require("osc")

//config
midi_in = 'APC mini mk2';     //set correct midi in device name
midi_out = 'APC mini mk2';    //set correct midi out device name
localip = "127.0.0.1";
localport = 8001;   //recive port from ma3
remoteip = "127.0.0.1";
remoteport = 8000;  //send port to ma3


//Config 

color_executor_empty = 0;
color_executor_off = 9;
color_executor_on = 21;
color_logo = 60;
brightness = 6;     //brightness 0-6
executor_fx = 7;    //fx 7-15
fader_indicator = 1;//o = off, 1 = on

//Right side buttons (10)
var command_1 = "Page 1"; //clip stop
var command_2 = "Page 2"; //solo
var command_3 = "Page 3"; //mute
var command_4 = "Page 4"; //rec arm
var command_5 = "Page 5"; //select
var command_6 = "Page 6"; //drum
var command_7 = "Page 7"; //note
var command_8 = "Page 8"; //stop all clips

var Fader = [0, 0, 0, 0, 0, 0, 0, 0];

var GrandMaster = 100;

var page = 1;
var BO = 0;
var clear = 0;

//MIDI
//display info
console.log("Akai APCmini mk2 MA3 OSC");
console.log(" ");

//display all midi devices
console.log("Midi IN");
console.log(easymidi.getInputs());
console.log("Midi OUT");
console.log(easymidi.getOutputs());

console.log(" ");

console.log("Connecting to midi device: " + midi_in);

var input = new easymidi.Input(midi_in);  //Open midi in
var output = new easymidi.Output(midi_out);//Open midi out

midiclear();

output.send('noteon', { note: page + 111, velocity: 1, channel: 0 }); // Page led

//3 logo
output.send('noteon', { note: 27, velocity: color_logo, channel: 7 });
output.send('noteon', { note: 28, velocity: color_logo, channel: 8 });
output.send('noteon', { note: 36, velocity: color_logo, channel: 9 });
output.send('noteon', { note: 43, velocity: color_logo, channel: 10 });
output.send('noteon', { note: 44, velocity: color_logo, channel: 11 });
output.send('noteon', { note: 52, velocity: color_logo, channel: 12 });
output.send('noteon', { note: 59, velocity: color_logo, channel: 13 });
output.send('noteon', { note: 60, velocity: color_logo, channel: 14 });

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendNotes() {
  for (let x = 0; x < 16; x++) {
    output.send('noteon', { note: x, velocity: 3, channel: x });
    await sleep(100); // opóźnienie 500 ms między wysłaniem nut
  }
}

sendNotes();

// Create an osc.js UDP Port listening on port 8000.
var udpPort = new osc.UDPPort({
  localAddress: localip,
  localPort: localport,
  metadata: true
});


// Listen for incoming OSC messages.
udpPort.on("message", function (oscMsg, timeTag, info) {

  if (clear == 0){
    midiclear();
    clear = 1;
  }

  if (oscMsg.address == "/Page") {
    change_page(oscMsg.args[0].value);
  }
  else if (oscMsg.address == "/Key101") { light_executor(0, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key102") { light_executor(1, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key103") { light_executor(2, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key104") { light_executor(3, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key105") { light_executor(4, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key106") { light_executor(5, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key107") { light_executor(6, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key108") { light_executor(7, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key201") { light_executor(8, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key202") { light_executor(9, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key203") { light_executor(10, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key204") { light_executor(11, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key205") { light_executor(12, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key206") { light_executor(13, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key207") { light_executor(14, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key208") { light_executor(15, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key116") { light_executor(24, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key117") { light_executor(25, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key118") { light_executor(26, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key119") { light_executor(27, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key120") { light_executor(28, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key121") { light_executor(29, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key122") { light_executor(30, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key123") { light_executor(31, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key131") { light_executor(32, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key132") { light_executor(33, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key133") { light_executor(34, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key134") { light_executor(35, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key135") { light_executor(36, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key136") { light_executor(37, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key137") { light_executor(38, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key138") { light_executor(39, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key146") { light_executor(40, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key147") { light_executor(41, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key148") { light_executor(42, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key149") { light_executor(43, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key150") { light_executor(44, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key151") { light_executor(45, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key152") { light_executor(46, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key153") { light_executor(47, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key161") { light_executor(48, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key162") { light_executor(49, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key163") { light_executor(50, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key164") { light_executor(51, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key165") { light_executor(52, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key166") { light_executor(53, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key167") { light_executor(54, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key168") { light_executor(55, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key176") { light_executor(56, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key177") { light_executor(57, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key178") { light_executor(58, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key179") { light_executor(59, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key180") { light_executor(60, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key181") { light_executor(61, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key182") { light_executor(62, oscMsg.args[0].value); }
  else if (oscMsg.address == "/Key183") { light_executor(63, oscMsg.args[0].value); }
});

// Open the socket.
udpPort.open();


// When the port is read, send an OSC message to, say, SuperCollider
udpPort.on("ready", function () {

  console.log("READY");
  console.log("Please start the OSC plugin to receive LED feedback.");

});




input.on('cc', function (msg) {//Fader send OSC

  if (msg.controller >= 48 && msg.controller <= 55) {
    var OSCaddress = "/Fader20" + (msg.controller - 47);
    Fader[msg.controller - 48] = msg.value;
    udpPort.send({ address: OSCaddress, args: [{ type: "i", value: msg.value }] }, remoteip, remoteport);
  }
  else if (msg.controller == 56) {//Grand Master Fader
    GrandMaster = msg.value * 0.8;

    if (BO == 0) {
      udpPort.send({
        address: "/cmd", args: [{ type: "s", value: "Master 2.1 At " + (GrandMaster) }]
      }, remoteip, remoteport);
    }
  }

});


input.on('noteon', function (msg) {//recive midi keys and send to osc

  if (msg.note >= 0 && msg.note <= 7) {
    udpPort.send({
      address: "/Key" + (msg.note + 101),
      args: [
        {
          type: "i",
          value: 1
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 8 && msg.note <= 15) {
    udpPort.send({
      address: "/Key" + (msg.note + 193),
      args: [
        {
          type: "i",
          value: 1
        }
      ]
    }, remoteip, remoteport);
  }

  if (msg.note >= 16 && msg.note <= 23) {
    //do nothing
  }

  else if (msg.note >= 24 && msg.note <= 31) {
    udpPort.send({
      address: "/Key" + (msg.note + 92),
      args: [
        {
          type: "i",
          value: 1
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 32 && msg.note <= 39) {
    udpPort.send({
      address: "/Key" + (msg.note + 99),
      args: [
        {
          type: "i",
          value: 1
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 40 && msg.note <= 47) {
    udpPort.send({
      address: "/Key" + (msg.note + 106),
      args: [
        {
          type: "i",
          value: 1
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 48 && msg.note <= 55) {
    udpPort.send({
      address: "/Key" + (msg.note + 113),
      args: [
        {
          type: "i",
          value: 1
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 56 && msg.note <= 63) {
    udpPort.send({
      address: "/Key" + (msg.note + 120),
      args: [
        {
          type: "i",
          value: 1
        }
      ]
    }, remoteip, remoteport);
  }
  else if (msg.note >= 100 && msg.note <= 107) {
    udpPort.send({ address: "/Fader" + (msg.note + 101), args: [{ type: "i", value: 127 }] }, remoteip, remoteport);
    output.send('noteon', { note: msg.note, velocity: msg.velocity, channel: 0 });
  }
  else if (msg.note == 112) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_1 }] }, remoteip, remoteport);
  }
  else if (msg.note == 113) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_2 }] }, remoteip, remoteport);
  }
  else if (msg.note == 114) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_3 }] }, remoteip, remoteport);
  }
  else if (msg.note == 115) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_4 }] }, remoteip, remoteport);
  }
  else if (msg.note == 116) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_5 }] }, remoteip, remoteport);
  }
  else if (msg.note == 117) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_6 }] }, remoteip, remoteport);
  }
  else if (msg.note == 118) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_7 }] }, remoteip, remoteport);
  }
  else if (msg.note == 119) {
    light_page_button(msg.note);
    udpPort.send({ address: "/cmd", args: [{ type: "s", value: command_8 }] }, remoteip, remoteport);
  }
  else if (msg.note == 122) {//BO
    BO = 1;
    udpPort.send({
      address: "/cmd",
      args: [
        {
          type: "s",
          value: "Master 2.1 At 0"
        }
      ]
    }, remoteip, remoteport);
  }
});

input.on('noteoff', function (msg) {//recive midi keys and send to osc

  if (msg.note >= 0 && msg.note <= 7) {
    udpPort.send({
      address: "/Key" + (msg.note + 101),
      args: [
        {
          type: "i",
          value: 0
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 8 && msg.note <= 15) {
    udpPort.send({
      address: "/Key" + (msg.note + 193),
      args: [
        {
          type: "i",
          value: 0
        }
      ]
    }, remoteip, remoteport);
  }

  if (msg.note >= 16 && msg.note <= 23) {
    //do nothing
  }

  else if (msg.note >= 24 && msg.note <= 31) {
    udpPort.send({
      address: "/Key" + (msg.note + 92),
      args: [
        {
          type: "i",
          value: 0
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 32 && msg.note <= 39) {
    udpPort.send({
      address: "/Key" + (msg.note + 99),
      args: [
        {
          type: "i",
          value: 0
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 40 && msg.note <= 47) {
    udpPort.send({
      address: "/Key" + (msg.note + 106),
      args: [
        {
          type: "i",
          value: 0
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 48 && msg.note <= 55) {
    udpPort.send({
      address: "/Key" + (msg.note + 113),
      args: [
        {
          type: "i",
          value: 0
        }
      ]
    }, remoteip, remoteport);
  }

  else if (msg.note >= 56 && msg.note <= 63) {
    udpPort.send({
      address: "/Key" + (msg.note + 120),
      args: [
        {
          type: "i",
          value: 0
        }
      ]
    }, remoteip, remoteport);
  }
  else if (msg.note >= 100 && msg.note <= 107) {
    udpPort.send({ address: "/Fader" + (msg.note + 101), args: [{ type: "i", value: Fader[msg.note - 100] }] }, remoteip, remoteport);
    output.send('noteon', { note: msg.note, velocity: msg.velocity, channel: 0 });
  }
  else if (msg.note == 122) {//BO
    BO = 0;
    udpPort.send({
      address: "/cmd",
      args: [
        {
          type: "s",
          value: "Master 2.1 At " + (GrandMaster)
        }
      ]
    }, remoteip, remoteport);
  }
});

//midi clear function
function midiclear() {
  for (i = 0; i < 128; i++) {
    output.send('noteon', { note: i, velocity: 0, channel: 0 });
    //sleep(10, function () { });
  }
  return;
}

function light_executor(note, status) {
  channel = brightness;
  if (status == 1) {
    velocity = color_executor_on;
  } else if (status == 0) {
    velocity = color_executor_off;
  }
  else {
    velocity = color_executor_empty;
  }
  output.send('noteon', { note: note, velocity: velocity, channel: channel });
  return;
}

function light_page_button(note) {
  channel = brightness;
  output.send('noteon', { note: page + 111, velocity: 0, channel: 0 });
  output.send('noteon', { note: note, velocity: 1, channel: 0 });
  page = note - 111;
}

function change_page(page_new) {
  output.send('noteon', { note: page + 111, velocity: 0, channel: 0 });
  output.send('noteon', { note: page_new + 111, velocity: 1, channel: 0 });
  page = page_new;
}


function light_fader(note, velocity) {

  output.send('noteon', { note: note, velocity: velocity, channel: brightness });

  return;
}

