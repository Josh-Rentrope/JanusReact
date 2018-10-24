# Janus React
This is a repository to manage all of your Janus nodes. [Introductory Video](https://youtu.be/bqdwI5zOTiA)
## Installation
You will need to setup npm and your node environment

Clone the directory

`cd` into the directory

Install electron globally with `npm i -g electron`

Install the packages with `npm i`

You should now rebuild the packages for electron with `$(npm bin)/electron-rebuild`

Now you can start the service with `npm run dev`

## Usage
Once you have Janus-React running, you should see a map and a list of nodes on your network.
If you don't see a Janus-Android node within a minute or the IP address is not showing, check that the app is on the same network and/or restart the app (you can try ctrl-r on JanusReact or just closing and opening Janus on the phone).
The Map will assign a pseudo-random location for a node until GPS coordinates are supplied.
You can inspect a device through the button on the table.

In the Android inspection menu, you can see the current status of the device and past event, (cause by triggers like shaking the device and loud sounds).
You can further inspect these events and see data and images related to them.
You can also see which peers were available at the time of the incident.
