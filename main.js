

var peerCopilot


hostBtn.addEventListener('click', () => {
  copilotForm.classList = "copilotForm d-none"
  hostForm.classList = "hostForm d-block"
})

document.getElementById('createSession').addEventListener('click', () => {
  var peer = new Peer();
  peer.on('open', function(id) {
    document.getElementsByClassName("id-text")[0].innerText = `Your Peer ID is: ${id}`
    console.log('My peer ID is: ' + id);
  });
  peer.on('connection', function(conn) {
    conn.on('data', function(data) {
      console.log('Received', data);
    });
  })
})
