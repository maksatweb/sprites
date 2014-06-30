var expect = require('expect.js');
var fs = require('fs');

var Sprites = require('../index');

describe('bgis test', function() {
  it('one background return one res', function() {
    var param = [{
      'string': 'p{background:url(x)}'
    }];
    var res = Sprites.parse(param);
    expect(res.length).to.eql(1);
    expect(res[0].bgis.length).to.eql(1);
  });
  it('one css can be an object too', function() {
    var param = {
      'string': 'p{background:url(x)}'
    };
    var res = Sprites.parse(param);
    expect(res.length).to.eql(1);
    expect(res[0].bgis.length).to.eql(1);
  });
  it('only background should has no repeat,position,units', function() {
    var param = [{
      'string': 'p{background:url(x)}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(0);
    expect(res.units.length).to.eql(0);
    expect(res.size.length).to.eql(0);
    expect(res.sunits.length).to.eql(0);
  });
  it('background url', function() {
    var param = [{
      'string': 'p{background:url(x)}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.url.string).to.eql('x');
    expect(res.url.index).to.eql(17);
  });
  it('multi background url', function() {
    var param = [{
      'string': 'p{background:url(x), url("y")}'
    }];
    var res = Sprites.parse(param)[0].bgis;
    expect(res.length).to.eql(2);
    expect(res[0].url.string).to.eql('x');
    expect(res[1].url.string).to.eql('"y"');
  });
  it('background with 1 repeat', function() {
    var param = [{
      'string': 'p{background:url(x) no-repeat}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(1);
    expect(res.position.length).to.eql(0);
    expect(res.units.length).to.eql(0);
    expect(res.size.length).to.eql(0);
    expect(res.sunits.length).to.eql(0);
  });
  it('background with 2 repeat', function() {
    var param = [{
      'string': 'p{background:url(x) no-repeat no-repeat}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(2);
    expect(res.repeat[1]).to.not.eql(res.repeat[0]);
    expect(res.position.length).to.eql(0);
    expect(res.units.length).to.eql(0);
    expect(res.size.length).to.eql(0);
    expect(res.sunits.length).to.eql(0);
  });
  it('background with 1 position', function() {
    var param = [{
      'string': 'p{background:url(x) 0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(1);
    expect(res.units.length).to.eql(1);
    expect(res.size.length).to.eql(0);
    expect(res.sunits.length).to.eql(0);
  });
  it('background with 2 position', function() {
    var param = [{
      'string': 'p{background:url(x) 0 0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(2);
    expect(res.units.length).to.eql(2);
    expect(res.size.length).to.eql(0);
    expect(res.sunits.length).to.eql(0);
  });
  it('background with 1 units', function() {
    var param = [{
      'string': 'p{background:url(x) 0px}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(1);
    expect(res.units.length).to.eql(1);
    expect(res.size.length).to.eql(0);
    expect(res.sunits.length).to.eql(0);
  });
  it('background with 1 units but 2 position', function() {
    var param = [{
      'string': 'p{background:url(x) 0px 0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(2);
    expect(res.units.length).to.eql(2);
    expect(res.size.length).to.eql(0);
    expect(res.sunits.length).to.eql(0);
  });
  it('background with 1 units but 2 position', function() {
    var param = [{
      'string': 'p{background:url(x) 0px 0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(2);
    expect(res.units.length).to.eql(2);
    expect(res.size.length).to.eql(0);
  });
  it('background with 1 size', function() {
    var param = [{
      'string': 'p{background:url(x);background-size:0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(0);
    expect(res.units.length).to.eql(0);
    expect(res.size.length).to.eql(1);
    expect(res.sunits.length).to.eql(1);
  });
  it('background with 2 size', function() {
    var param = [{
      'string': 'p{background:url(x);background-size:0 auto}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(0);
    expect(res.position.length).to.eql(0);
    expect(res.units.length).to.eql(0);
    expect(res.size.length).to.eql(2);
    expect(res.sunits.length).to.eql(2);
  });
  it('no media should has 1x radio', function() {
    var param = [{
      'string': 'p{background:url(x)}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.radio).to.eql(1);
  });
  it('media min-device-pixel-ratio should be the radio', function() {
    var param = [{
      'string': '@media (-webkit-min-device-pixel-ratio: 2){p{background:url(x)}}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.radio).to.eql(2);
  });
  it('media min-device-pixel-ratio hack', function() {
    var param = [{
      'string': '@media (min--moz-device-pixel-ratio: 2/1){p{background:url(x)}}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.radio).to.eql(2);
  });
  it('unknow media is 1x', function() {
    var param = [{
      'string': '@media {p{background:url(x)}}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.radio).to.eql(1);
  });
  it('media error is 1x', function() {
    var param = [{
      'string': '@media(min--moz-device-pixel-ratio:auto){p{background:url(x)}}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.radio).to.eql(1);
  });
  it('background-repeat', function() {
    var param = [{
      'string': 'p{background:url(x);background-repeat:no-repeat}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(1);
  });
  it('background-repeat should overwrite background when after it', function() {
    var param = [{
      'string': 'p{background:url(x) repeat-x repeat-y;background-repeat:no-repeat}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(1);
  });
  it('background-repeat should not overwrite background when before it', function() {
    var param = [{
      'string': 'p{background-repeat:no-repeat;background:url(x) repeat-x repeat-y}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.repeat.length).to.eql(2);
  });
  it('background-position', function() {
    var param = [{
      'string': 'p{background:url(x);background-position:0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.position.length).to.eql(1);
  });
  it('background-position should overwrite background when after it', function() {
    var param = [{
      'string': 'p{background:url(x) 0 0;background-position:0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.position.length).to.eql(1);
  });
  it('background-position should not overwrite background when before it', function() {
    var param = [{
      'string': 'p{background-position:0;background:url(x) 0 0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.position.length).to.eql(2);
  });
  it('background-position units should equal position', function() {
    var param = [{
      'string': 'p{background:url(x);background-position:0px}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.units.length).to.eql(1);
  });
  it('background-position units default is null(%)', function() {
    var param = [{
      'string': 'p{background:url(x);background-position:0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.units[0]).to.eql(null);
  });
  it('background-position units should overwrite background when after it', function() {
    var param = [{
      'string': 'p{background:url(x) 0 0;background-position:0px}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.units.length).to.eql(1);
  });
  it('background-position units should not overwrite background when before it', function() {
    var param = [{
      'string': 'p{background-position:0px;background:url(x) 0 0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.units.length).to.eql(2);
  });
  it('mult url with repeat,position,units', function() {
    var param = [{
      'string': 'p{background:url(x), url(y);background-repeat:repeat-x no-repeat no-repeat repeat-y;background-position:0 1px 2% 0}'
    }];
    var res = Sprites.parse(param)[0].bgis;
    expect(res[0].repeat.length).to.eql(2);
    expect(res[1].repeat.length).to.eql(2);
    expect(res[0].position.length).to.eql(2);
    expect(res[1].position.length).to.eql(2);
    expect(res[0].units.length).to.eql(2);
    expect(res[1].units.length).to.eql(2);
  });
  it('width', function() {
    var param = [{
      'string': 'p{background:url(x);width:0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.width).to.not.eql(null);
    expect(res.width.string).to.eql(0);
    expect(res.wunits).to.eql(null);
  });
  it('width with units', function() {
    var param = [{
      'string': 'p{background:url(x);width:0px}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.width).to.not.eql(null);
    expect(res.width.string).to.eql(0);
    expect(res.wunits.string).to.eql('px');
  });
  it('no width', function() {
    var param = [{
      'string': 'p{background:url(x);}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.width).to.eql(null);
  });
  it('height', function() {
    var param = [{
      'string': 'p{background:url(x);height:0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.height).to.not.eql(null);
    expect(res.height.string).to.eql(0);
  });
  it('height with units', function() {
    var param = [{
      'string': 'p{background:url(x);height:0px}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.height).to.not.eql(null);
    expect(res.height.string).to.eql(0);
    expect(res.hunits.string).to.eql('px');
  });
  it('no height', function() {
    var param = [{
      'string': 'p{background:url(x);}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.height).to.eql(null);
  });
  it('padding', function() {
    var param = [{
      'string': 'p{background:url(x);padding:0}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.padding).to.not.eql(null);
    expect(res.padding.length).to.eql(1);
    expect(res.punits.length).to.eql(1);
  });
  it('padding with units', function() {
    var param = [{
      'string': 'p{background:url(x);padding:0px}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.padding.length).to.eql(1);
    expect(res.padding[0].string).to.eql(0);
    expect(res.punits[0].string).to.eql('px');
  });
  it('no padding', function() {
    var param = [{
      'string': 'p{background:url(x)}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.padding).to.eql(null);
  });
  it('no width extend from parent', function() {
    var param = [{
      'string': 'div{width:100px}div p{background:url(x)}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.width).to.not.eql(null);
    expect(res.width.string).to.eql(100);
    expect(res.wunits.string).to.eql('px');
  });
  it('width% extend from parent', function() {
    var param = [{
      'string': 'div{width:100px}div p{width:50%;background:url(x)}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.width).to.not.eql(null);
    expect(res.width.string).to.eql(50);
    expect(res.wunits.string).to.eql('px');
  });
  it('width% extend from parent% is null', function() {
    var param = [{
      'string': 'div{width:100%}div p{width:50%;background:url(x)}'
    }];
    var res = Sprites.parse(param)[0].bgis[0];
    expect(res.width).to.eql(null);
  });
});