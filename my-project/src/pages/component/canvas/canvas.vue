<template>
  <view>
    <page-head :title="title"></page-head>
    <view class="page-body">
      <view class="page-body-wrapper">
        <!-- #ifdef APP-PLUS || H5 -->
        <canvas
          canvas-id="canvas"
          class="canvas"
          :start="startStatus"
          :change:start="animate.start"
          :data-width="canvasWidth"
          :data-height="canvasWidth"
        ></canvas>
        <!-- #endif -->
        <!-- #ifndef APP-PLUS || H5 -->
        <canvas canvas-id="canvas" id="canvas" class="canvas"></canvas>
        <!-- #endif -->
      </view>
    </view>
  </view>
</template>

<script module="animate" lang="renderjs">
class Ball {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} vx
	 * @param {number} vy
	 * @param {number} canvasWidth
	 * @param {number} canvasHeight
	 * @param {UniApp.CanvasContext} ctx
	 */
	constructor( x, y, vx, vy, canvasWidth, canvasHeight, ctx ) {
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.ctx = ctx;
		this.x = x;
		this.y = y;
		this.vx = vx;
		this.vy = vy;
		this.radius = 5;
	}
	draw() {
		this.ctx.beginPath()
		this.ctx.fillStyle = '#007AFF'
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI)
		this.ctx.closePath()
		this.ctx.fill()
	}
	move() {
		this.x += this.vx
		this.y += this.vy
		// 回到中心
		// if (getDistance(this.x - this.canvasWidth / 2, this.y - this.canvasHeight / 2) >
		// 	getDistance(this.canvasWidth / 2, this.canvasHeight / 2) + this.radius) {
		// 	this.x = this.canvasWidth / 2
		// 	this.y = this.canvasHeight / 2
		// }
		// 边框反弹
		if (this.x < this.radius) {
			this.vx = Math.abs(this.vx)
			return
		}
		if (this.x > this.canvasWidth - this.radius) {
			this.vx = -Math.abs(this.vx)
		}
		if (this.y < this.radius) {
			this.vy = Math.abs(this.vy)
			return
		}
		if (this.y > this.canvasWidth - this.radius) {
			this.vy = -Math.abs(this.vy)
		}
	}
}

function getDistance(x, y) {
	return Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5)
}

export default {
	methods: {
		start(newVal, oldVal, owner, ins) {
			let canvasWidth = ins.getDataset().width,
				canvasHeight = ins.getDataset().height,
				canvasEle = document.querySelectorAll('.canvas>canvas')[0],
				ctx = canvasEle.getContext('2d'),
				speed = 3,
				ballList = [],
				layer = 3,
				ballInlayer = 20;
			for (let i = 0; i < layer; i++) {
				let radius = getDistance(canvasWidth / 2, canvasHeight / 2) / layer * i
				for (let j = 0; j < ballInlayer; j++) {
					let deg = j * 2 * Math.PI / ballInlayer,
						sin = Math.sin(deg),
						cos = Math.cos(deg),
						x = radius * cos + canvasWidth / 2,
						y = radius * sin + canvasHeight / 2,
						vx = speed * cos,
						vy = speed * sin;
					ballList.push(new Ball({ x, y, vx, vy, canvasWidth, canvasHeight, ctx, radius: 5 }));
				}
			}

			(function (ballList) {
				ctx.clearRect(0, 0, canvasEle.width, canvasEle.height)
				ballList.forEach((item) => {
					item.move();
					item.draw();
				})
				requestAnimationFrame(() => arguments.callee(ballList));
			})(ballList);
		}
	}
}
</script>

<script>
// #ifndef APP-PLUS || H5

/**@type {UniApp.CanvasContext} */
let ctx = null;
let interval = null;

class Ball {
	/**
	 * @param {number} x
	 * @param {number} y
	 * @param {number} vx
	 * @param {number} vy
	 * @param {number} canvasWidth
	 * @param {number} canvasHeight
	 * @param {UniApp.CanvasContext} ctx
	 */
  constructor(x, y, vx, vy, canvasWidth, canvasHeight, ctx) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = 5;
  }
  draw() {
    this.ctx.setFillStyle("#007AFF");
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.ctx.closePath();
    this.ctx.fill();
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    // 回到中心
    // if (
    //   getDistance(
    //     this.x - this.canvasWidth / 2,
    //     this.y - this.canvasHeight / 2
    //   ) >
    //   getDistance(this.canvasWidth / 2, this.canvasHeight / 2) + this.radius
    // ) {
    //   this.x = this.canvasWidth / 2;
    //   this.y = this.canvasHeight / 2;
    // }
    // 边框反弹
    if (this.x < this.radius) {
      this.vx = Math.abs(this.vx);
      return;
    }
    if (this.x > this.canvasWidth - this.radius) {
      this.vx = -Math.abs(this.vx);
    }
    if (this.y < this.radius) {
      this.vy = Math.abs(this.vy);
      return;
    }
    if (this.y > this.canvasWidth - this.radius) {
      this.vy = -Math.abs(this.vy);
    }
  }
}

function getDistance(x, y) {
  return Math.pow(Math.pow(x, 2) + Math.pow(y, 2), 0.5);
}

// #endif

export default {
  data() {
    return {
      title: "canvas",
      canvasWidth: 0,
      startStatus: false,
      ballList: [],
    };
  },
  onReady() {
    this.$nextTick(() => {
      uni
        .createSelectorQuery()
        .select(".canvas")
        .boundingClientRect((data) => {
          this.canvasWidth = data.width;
          // #ifdef APP-PLUS || H5
          this.startStatus = true;
          // #endif
          // #ifndef APP-PLUS || H5
          ctx = uni.createCanvasContext("canvas");
          this.drawBall();
          // #endif
        })
        .exec();
    });
  },
  // #ifndef APP-PLUS || H5
  onUnload() {
    clearInterval(interval);
  },
  methods: {
    drawBall() {
      let canvasWidth = this.canvasWidth;
      let canvasHeight = this.canvasWidth;
      let speed = 3;
      /**@type {Ball[]} */
      let ballList = [];
      let layer = 3;
      let ballInlayer = 20;
      for (let i = 0; i < layer; i++) {
        let radius =
          (getDistance(canvasWidth / 2, canvasHeight / 2) / layer) * i;
        for (let j = 0; j < ballInlayer; j++) {
          let deg = (j * 2 * Math.PI) / ballInlayer,
            sin = Math.sin(deg),
            cos = Math.cos(deg),
            x = radius * cos + canvasWidth / 2,
            y = radius * sin + canvasHeight / 2,
            vx = speed * cos,
            vy = speed * sin;
          ballList.push(new Ball(x, y, vx, vy, canvasWidth, canvasHeight, ctx));
        }
      }

      interval = setInterval(
        () =>
          ((ballList) => {
            // ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            ballList.forEach((item) => {
              item.move();
              item.draw();
            });
            ctx.draw();
          })(ballList),
        17
      );
    },
  },
  // #endif
};
</script>

<style>
.page-body-wrapper {
  text-align: center;
}

.canvas {
  width: 610rpx;
  height: 610rpx;
  margin: auto;
  background-color: #fff;
}
</style>
