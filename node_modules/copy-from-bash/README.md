# copy-from-bash

Since _bash on windows_ does not support _xclip_ I made this tool as a work around.


## So, what does it do?

Basically it allows you copy text from the bash to the windows clipboard.


## How does it work?

It opens a TCP connection on windows that waits until someone sents data to it.
When data is sent to it it will overwrite the clipboard for a given time or for forever (except you change it).


## How to start

Run the following code in windows to install the package:
```
npm i -g copy-from-bash
```

Next step is to open the TCP connection:
```
copyfb listen
```

The server should now run in the background.

To check if everything works so far you can run the following command:
```
copyfb sent --text "hello world" --timer 10
```

This will overwrite your clipboard with "hello world" for 10 seconds.
_The --timer options is not necessary!_

Hopefully everything works so far.
Let's get to bash.

btw. Node needs to be installed on _ubuntu for windows_.

Windows stores all global node_modules at
```
%appdata%\\npm\\
```

In order for this to work you need to add this path to your $PATH in ubuntu.
The easiest way to do this is to to write it into the .bashrc file.
```
echo 'export PATH=$PATH:/mnt/c/Users/YOUR_USER_NAME/AppData/Roaming/npm' >> ~/.bashrc 
```

Now close and open your bash.
If you type the following you can see if the path was added:
```
echo $PATH
```

If everything is set up you can try the following in bash:
```
echo "hello from bash" | clip
```

Now, if everything works as it is supposed to, you should have "hello from bash" in your clipboard.
For 45 seconds.

You can type ```| clip 0``` for forever or any other number for the amount of seconds.

If you are happy you can write this on windows:
```
copyfb autostart
```

This will start the TCP connection with windows, so you can go right into bash.

For less information use ```clip help``` or ```copyfb help```.

## 