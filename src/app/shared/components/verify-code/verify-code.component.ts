import {Component, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})
export class VerifyCodeComponent implements OnInit {
  // @ts-ignore
  @ViewChild('verifyCanvas') verifyCanvas: ElementRef;

  codeLength = 4; // 设置验证码长度
  options = { // 默认options参数值
    id: 'v_container', // 容器Id
    canvasId: 'verifyCanvas', // canvas的ID
    width: 80, // 默认canvas宽度
    height: 35, // 默认canvas高度
    type: 'letter', // 图形验证码默认类型blend:数字字母混合类型、number:纯数字、letter:纯字母
    code: '',
    numArr: [],
    letterArr: []
  };
  ctx;
  constructor() { }

  ngOnInit() {
    this.ctx = this.verifyCanvas.nativeElement.getContext('2d');

    this.options.numArr = '0,1,2,3,4,5,6,7,8,9'.split(',');
    this.options.letterArr = this.getAllLetter();
    this.refresh();
  }

  /**
   * 生成验证码
   */
  refresh() {
    this.options.code = '';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillStyle = this.randomColor(180, 240);
    this.ctx.fillRect(0, 0, this.options.width, this.options.height);

    let txtArr = [];
    if (this.options.type === 'blend') { // 判断验证码类型
      txtArr = this.options.numArr.concat(this.options.letterArr);
    } else if (this.options.type === 'number') {
      txtArr = this.options.numArr;
    } else {
      txtArr = this.options.letterArr;
    }

    for (let i = 1; i <= this.codeLength; i++) {
      const txt = txtArr[this.randomNum(0, txtArr.length)];
      this.options.code += txt;
      this.ctx.font = this.randomNum(this.options.height / 2, this.options.height) + 'px SimHei'; // 随机生成字体大小
      this.ctx.fillStyle = this.randomColor(50, 160); // 随机生成字体颜色
      this.ctx.shadowOffsetX = this.randomNum(-3, 3);
      this.ctx.shadowOffsetY = this.randomNum(-3, 3);
      this.ctx.shadowBlur = this.randomNum(-3, 3);
      this.ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      const x = this.options.width / (this.codeLength + 1) * i;
      const y = this.options.height / 2;
      const deg = this.randomNum(-30, 30);
      // 设置旋转角度和坐标原点
      this.ctx.translate(x, y);
      this.ctx.rotate(deg * Math.PI / 180);
      this.ctx.fillText(txt, 0, 0);
      // 恢复旋转角度和坐标原点
      this.ctx.rotate(-deg * Math.PI / 180);
      this.ctx.translate(-x, -y);
    }
    /**
     * 绘制干扰线
     */
    for (let i = 0; i < 2; i++) {
      this.ctx.strokeStyle = this.randomColor(40, 180);
      this.ctx.beginPath();
      this.ctx.moveTo(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height));
      this.ctx.lineTo(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height));
      this.ctx.stroke();
    }
    /**
     * 绘制干扰点
     */
    for (let i = 0; i < this.options.width / 2; i++) {
      this.ctx.fillStyle = this.randomColor(0, 255);
      this.ctx.beginPath();
      this.ctx.arc(this.randomNum(0, this.options.width), this.randomNum(0, this.options.height), 1, 0, 2 * Math.PI);
      this.ctx.fill();
    }
  }

  /**
   * 验证验证码
   */
  validate(code) {
    const code1 = code.toLowerCase();
    // tslint:disable-next-line:variable-name
    const v_code = this.options.code.toLowerCase();
    if (code1 === v_code) {
      return true;
    } else {
      this.refresh();
      return false;
    }
  }

  /**
   * 生成字母数组
   */
  getAllLetter() {
    const letterStr = 'a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z';
    return letterStr.split(',');
  }

  /**
   * 生成一个随机数
   */
  randomNum(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  /**
   * 生成一个随机色
   */
  randomColor(min, max) {
    const r = this.randomNum(min, max);
    const g = this.randomNum(min, max);
    const b = this.randomNum(min, max);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }
}
