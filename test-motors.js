let spec = {
    address: 0x60,
    dcs: ['M1', 'M2']
};

var motorHat = require('motor-hat')(spec);

motorHat.init();

motorHat.dcs[0].run('fwd', cb);
motorHat.dcs[1].run('fwd', cb);

motorHat.dcs[0].setSpeed(50, cb);
motorHat.dcs[1].setSpeed(50, cb);

setTimeout(function(){
  motorHat.dcs[1].setSpeed(75, cb);
}, 1000)

setTimeout(function(){
  motorHat.dcs[1].setSpeed(100, cb);
}, 4000)

setTimeout(function(){
  motorHat.dcs[1].run('back', cb);
}, 7000)

setTimeout(function(){
        motorHat.dcs[0].stop(cb);
	motorHat.dcs[1].stop(cb);
}, 11000)

function cb(err, result){
  if(err){
    console.log('err: ', err);
  } else {
    console.log('res: ', result);
  }
}
