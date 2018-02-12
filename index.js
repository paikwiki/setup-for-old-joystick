var HID = require('node-hid');
var devices = HID.devices();

console.log(devices.map(d=>({pname: d.product, vid: d.vendorId, pid: d.productId})));

var deviceInfo = devices.find( function(d) {
    var isUSBKeyStick = d.vendorId===0xEF5 && d.productId===0x3000;

    return isUSBKeyStick;
});

if( deviceInfo ) {
  console.log(deviceInfo);
  var device = new HID.HID( deviceInfo.path );

  // use device
  // console.log(device);
  device.on("data", function(data){ console.log(data); });
  device.on("error", function(err){ console.log(err); });
} else {
  console.log('Something wrong!');
}

