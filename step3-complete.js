/**
 * Posts a message to a Webex Teams space via a Bot account
 * as a button in pressed in a custom in-room control
 *
 * Prep work:
 *      deploy the agenda.xml In-Room control to a CE 9.2+ device
 *
 *      from a ssh session, type the commands below:
 *      > xConfiguration HttpClient Mode: On
 *      > xConfiguration HttpClient AllowInsecureHTTPS: True
 *
 */

const xapi = require('xapi')

xapi.event.on('UserInterface Extensions Event Clicked Signal', (widgetId) => {
    console.log(`new event from widget: ${widgetId}`)
    
    let markdown = buildMarkdownForSession(widgetId)
    push(markdown)
})


function buildMarkdownForSession(widgetId) {

    let markdown = `no session found for widget identifier: ${widgetId}`
    let session = sessions[widgetId]
    if (session) {
      console.log(`found session with id: ${widgetId}`)
      markdown = `${session.day}, ${session.time}, ${session.location}`
      markdown += `<br/>**\[${session.id}\] - ${session.title}**`
      markdown += `<br/>_${session.description}_`
    }
    
    return markdown
}

const sessions = {}
sessions['DEVWKS-2074'] = {
    id: 'DEVWKS-2074',
    title: "Enhancement Meeting Rooms User Experience with xAPI and Macros",
    description: "Join this workshop to go hands-on with xAPI (ie Webex Devices APIs and Cisco Collaboration Endpoint APIs). You'll learn to interact with a Webex Device from code, and implement an end-to-end In-Room Control by creating a custom interface and deploying Macros onto your device",
    location: "Workshop 4",
    type: "workshop",
    day: "Monday",
    time: "3:00PM",
    duration: "45",
    speaker: "Stève Sfartz",
    href: "https://ciscolive.cisco.com/emea/learn/sessions/content-catalog/?search=2074#/"
}


function push(msg, cb) {

  // Replace with your bot token
  const token = "MzlkMDU2NzktZWY0OC00MjExLTlhNjItZTFjZDMzMjEzZWU5OTRlODZmZDktZGY2_PF84_adfd15eb-84e9-4906-b553-94182dee9ade"
  // replace with a space your bot is part of
  const roomId = "Y2lzY29zcGFyazovL3VzL1JPT00vYzg0NjlkZDAtMWVmNi0xMWU5LWI1MWYtOTUyNzFiZGM2ZTIz"

  // Post message
  let payload = {
    "markdown": msg,
    "roomId": roomId
  }
  xapi.command(
    'HttpClient Post',
    {
      Header: ["Content-Type: application/json", "Authorization: Bearer " + token],
      Url: "https://api.ciscospark.com/v1/messages",
      AllowInsecureHTTPS: "True"
    },
    JSON.stringify(payload))
    .then((response) => {
      if (response.StatusCode == 200) {
        console.log("message pushed to Webex Teams")
        if (cb) cb(null, response.StatusCode)
        return
      }
            
      console.log("failed with status code: " + response.StatusCode)
      if (cb) cb("failed with status code: " + response.StatusCode, response.StatusCode)
    })
    .catch((err) => {
      console.log("failed with err: " + err.message)
      if (cb) cb("Could not post message to Webex Teams")
    })
}