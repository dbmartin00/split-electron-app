var SplitFactory = require('@splitsoftware/splitio').SplitFactory;

// preload.js
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }

  var factory = SplitFactory({
    core: {
      authorizationKey: '3jueh9a4g1ksklep3f910s131abaj4sfo8mm',
    }
  })

  const client = factory.client()

  client.on(client.Event.SDK_READY, function() {
    console.log("SDK_READY")
    draw()
  })

  function draw() {
    const splitResult = client.getTreatmentWithConfig(
                      'user_id', // unique identifier for your user
                      'multivariant_demo')

    const configs = JSON.parse(splitResult.config);
    document.getElementById("call-to-action").innerHTML = configs.text

    let img = document.getElementById("banner-image")
    img.src = configs.image
    img.style.width = configs.image_width
  }
})


