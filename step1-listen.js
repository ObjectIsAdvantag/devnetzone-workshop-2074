/**
 * Display the identifier of the widget clicked in a Custom Control
 *
 * Prep work:
 *      deploy the agenda.xml In-Room control to a CE 9.2+ device
 *
 */

const xapi = require('xapi')

xapi.event.on('UserInterface Extensions Event Clicked Signal', (widgetId) => {
    console.log(`new event from widget: ${widgetId}`)
    
    // Add your custom logic
})


console.log('listening...')