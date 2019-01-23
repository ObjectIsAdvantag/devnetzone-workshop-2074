
## Walkthrough

If you're new to Cisco Collaboration Devices, take this [DevNet learning module](https://learninglabs.cisco.com/modules/xapi-intro).

Then:
- reserve a [Sandbox Roomkit](https://github.com/CiscoDevNet/awesome-xapi#developer-tools)
- load and deploy the [provided In-Room control](./agenda.xml)
- connect via ssh and type
   ```shell
   xstatus UserInterface Extensions
   xfeedback register /Event/UserInterface/Extensions/Event/Clicked
   xfeedback deregisterall
   ```
- create and enable the [provided JS macro](./step3-complete.js)