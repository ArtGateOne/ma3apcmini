# ma3apcmini
Akai apc mini mk2  control MA3 via OSC

Download and install NodeJS version 14.17 from https://nodejs.org/dist/v14.17.0/node-v14.17.0-x64.msi

Download my archive

open folder

change default tool to open .js file to node.exe (from nodejs )

Run code double click

copy and load my  ma3 demo show

start plugin

ALL WORK! :D


chect osc in/out interface is loop local 127.0.0.1

check - session is start

-----------------------

This solution was initially developed for users of the MA3 system who do not have a wing. It’s a relatively simple solution that relies on converting MIDI and OSC signals. It is implemented using a Node.js script that intermediates communication and an MA3 Lua plugin that sends OSC messages in the appropriate format. This setup allows control of specific faders and executors, along with the ability to switch pages.

The Lua plugin references a specific OSC configuration (its sequential number), and all details are provided in the photos and in the sample show file for version 2.1.1.5.

You need to run the Node.js script, which will display the logo on the MIDI controller, and then activate the plugin in the MA3 system.

### First Solution:
This was created for the Akai APC Mini Mk2.  
Files:  
- **ma3apcminimk2.js** (2-color version)  
- **ma3apcminimk2color.js** (multicolor appearance version)  

These files work with the **APC Mini Mk2 OSC Color** plugin.  

#### For the older APC Mini controller:
Files:  
- **ma3apcmini.js** and **APC Mini OSC** plugin  

Both solutions allow control of faders 1–8 + Grand Master and executors:  
- Wing 1: 101–108  
- Wing 1: 201–208  
- Wing 2: 116–123  
- Wing 3: 131–138  
- Wing 4: 146–153  
- Wing 5: 161–168  
- Wing 6: 176–183  

---

### Second Solution:
This was created upon request by a user who already owns a wing. The request was to enable control of the faders from Wing 3.

This version is only for the Mk2 controller.  
Files:  
- **ma3apcminimk2color_wing3.js** and **APC Mini Mk2 OSC Color W3** plugin  

This version controls executors from Wing 1 to Wing 6, similar to the basic version. The layout for MIDI mapping was slightly modified. Therefore, a version for Wing 1 was also created with a similar key layout adjustment:  
- **ma3apcminimk2color_wing1.js** and **APC Mini Mk2 OSC Color** plugin  

---

### Third Solution:
This version allows exclusive control of executors for a specific wing: Wing 1, Wing 2, or Wing 3.  

Files prepared for the Mk2 controller:  
The MIDI controller manages four rows of executors for the wing, with page-switching possible via the buttons on the right side.  

Files and plugins:  
- **ma3_wing1_mk2.js** and **Wing1 Mk2** plugin  
- **ma3_wing2_mk2.js** and **Wing2 Mk2** plugin  
- **ma3_wing3_mk2.js** and **Wing3 Mk2** plugin  

---

### FAQ: Can more than one MIDI controller be used?  
Yes, it’s possible but requires some modifications to the files and OSC configuration.  

1. In the OSC configuration, add additional entries with modified input/output port numbers.  
2. Adjust the port number in the `.js` file responsible for communication.  
3. Update the Lua plugin to reference the correct OSC configuration entry.  
