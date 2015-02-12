module fs from 'fs';

import Parser from './Parser2';

class Sprites {
  constructor(css列表 = []) {
    this.css列表 = Array.isArray(css列表) ? css列表 : [css列表];
  }

  //一个项目所有需要处理的css数据通过列表传入
  解析(css列表 = []) {
    this.css列表 = Array.isArray(css列表) ? css列表 : [css列表];
    var 解析器 = new Parser();

    //遍历处理每个，解析全部后进行合并图片步骤
    this.css列表.forEach(function(css) {
      if(css.hasOwnProperty('内容')) {
        if(!css.hasOwnProperty('路径')) {
          throw new Error('css没有内容也没有可读取路径：' + JSON.stringify(css));
        }
        css.内容 = fs.readFileSync(css.路径, { encoding: 'utf-8' });
      }
      css.背景列表 = 解析器.解析(css);
    });
  }
}

export default Sprites;