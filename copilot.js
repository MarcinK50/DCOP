const copilotBtn = document.getElementById("copilot")
const copilotForm = document.getElementsByClassName("copilotForm")[0]

var peer = new Peer()
peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
  });

  var values = {
    long: '/position/longitude-deg',
    lat: '/position/latitude-deg',
    alt: '/position/altitude-ft',
    tas: '/velocities/airspeed-kt',
    gs: '/velocities/groundspeed-kt',

    heading: '/orientation/heading-deg',
    pitch: '/orientation/pitch-deg',
    roll: '/orientation/roll-deg',

    masterAlt: '/controls/switches/master-alt',
    masterAvionics: '/controls/switches/master-avionics',
    masterBat: '/controls/switches/master-bat',
    magnetosSwitch: '/controls/switches/magnetos',
    starterSwitch: '/controls/switches/starter',

    starterEngine: '/controls/engines/current-engine/starter',
    magnetosEngine: '/controls/engines/engine/magnetos',
    throttle: '/controls/engines/current-engine/throttle',
    mixture: '/controls/engines/current-engine/mixture',
    primer: '/controls/engines/engine/primer',
    primerLever: '/controls/engines/engine/primer-lever',
    ignition: '/controls/engines/engine/ignition',

    aileron: '/sim/model/c172p/cockpit/yoke-aileron',
    elevator: '/sim/model/c172p/cockpit/yoke-elevator'
    }

document.getElementById("connect").addEventListener('click', () => {
    var conn = peer.connect(document.getElementById('pilotID').value);
    conn.on('open', function() {
        console.log('conn open')
        // Receive messages
        conn.on('data', function(data) {
            console.log('Received', data);
            for (var prop of Object.entries(data)) {
                var key = prop[0]
                var value = prop[1]
                var path = values[key]
                fetch(`http://localhost:3030/json${path}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `{"value":"${value}"}: ''`
                })
              }
        });

        conn.send(values);
    }); 
})
  