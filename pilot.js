const hostBtn = document.getElementById("host")
const hostForm = document.getElementsByClassName("hostForm")[0]
const fgPort = document.getElementById("fgPort")

document.getElementById('createSession').addEventListener('click', () => {
    var peer = new Peer();
    peer.on('open', function(id) {
        document.getElementsByClassName("id-text")[0].classList = `text-center mt-2 id-text`
        document.getElementsByClassName("id-text")[0].innerText = `Your Peer ID is: ${id}`
        console.log('My peer ID is: ' + id);
    });
    peer.on('connection', function(conn) {
        conn.on('data', function(data) {
            console.log('Received', data);
        });
        
        async function sendData() {
            var long = await (await (await fetch(`http://localhost:${fgPort.value}/json/position/longitude-deg`)).json()).value
            var lat = await (await (await fetch(`http://localhost:${fgPort.value}/json/position/latitude-deg`)).json()).value
            var alt = await (await (await fetch(`http://localhost:${fgPort.value}/json/position/altitude-ft`)).json()).value
            var tas = await (await (await fetch(`http://localhost:${fgPort.value}/json/velocities/airspeed-kt`)).json()).value
            var gs = await (await (await fetch(`http://localhost:${fgPort.value}/json/velocities/groundspeed-kt`)).json()).value

            var heading = await (await (await fetch(`http://localhost:${fgPort.value}/json/orientation/heading-deg`)).json()).value
            var pitch = await (await (await fetch(`http://localhost:${fgPort.value}/json/orientation/pitch-deg`)).json()).value
            var roll = await (await (await fetch(`http://localhost:${fgPort.value}/json/orientation/roll-deg`)).json()).value

            var masterAlt = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/switches/master-alt`)).json()).value
            var masterAvionics = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/switches/master-avionics`)).json()).value
            var masterBat = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/switches/master-bat`)).json()).value
            var magnetosSwitch = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/switches/magnetos`)).json()).value
            var starterSwitch = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/switches/starter`)).json()).value

            var starterEngine = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/engines/current-engine/starter`)).json()).value
            var magnetosEngine = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/engines/engine/magnetos`)).json()).value
            var throttle = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/engines/current-engine/throttle`)).json()).value
            var mixture = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/engines/current-engine/mixture`)).json()).value
            var primer = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/engines/engine/primer`)).json()).value
            var primerLever = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/engines/engine/primer-lever`)).json()).value
            var ignition = await (await (await fetch(`http://localhost:${fgPort.value}/json/controls/engines/engine/ignition`)).json()).value

            var aileron = await (await (await fetch(`http://localhost:${fgPort.value}/json/sim/model/c172p/cockpit/yoke-aileron`)).json()).value
            var elevator = await (await (await fetch(`http://localhost:${fgPort.value}/json/sim/model/c172p/cockpit/yoke-elevator`)).json()).value
           
            conn.send({
                long: long,
                lat: lat,
                alt: alt,
                tas: tas,
                gs: gs,
                
                heading: heading,
                pitch: pitch,
                roll: roll,

                masterAlt: masterAlt,
                masterAvionics: masterAvionics,
                masterBat: masterBat,
                magnetosSwitch: magnetosSwitch,
                starterSwitch: starterSwitch,

                starterEngine: starterEngine,
                magnetosEngine: magnetosEngine,
                throttle: throttle,
                mixture: mixture,
                primer: primer,
                primerLever: primerLever,
                ignition: ignition,

                aileron: aileron,
                elevator: elevator,
            })
        }

        setInterval(sendData, 1000)
        
    })
})