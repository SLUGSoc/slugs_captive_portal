# SLUGSoc LAN Party Captive Portal
This is a custom captive portal designed to be compatible with the new OPNsense implementation of Heimdall, running on the Yggdrasil hardware and hypervisor.
Since there will be no active connection when this portal is served to the user, it is a static implementation using raw HTML and CSS and vanilla JS. Any changes
made in future must adhere to this.

## Renamed Bootstrap files & Exclude List
You may notice that the Bootstrap files have had `portal-` prepended to the file names. This is due to OPNsense excluding some filenames from
their XML config, meaning the default version stored on the server will be used. The renaming is to ensure these files actually get served to the client.
The full list of excluded filenames can be seen in `exclude.list`.

## Filesize considerations
The data transferred to the client upon loading this portal should ideally not exceed 200-300kB. Current testing in Firefox devtools shows a transfer of
~225kB. In order to minimise file sizes, minified Bootstrap files have been used, and the CSS has been run through PurgeCSS.
