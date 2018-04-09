function hzh(i){
	this.canvas = i,
    this.ctx = this.canvas.getContext("2d"),
    this.imgList = [{
        link: "http://static.ws.126.net/f2e/ent/ent_painting2016/images/1.jpg?1520",
        imgW: "750",
        imgH: "1206"
    },
    {
        link: "http://static.ws.126.net/f2e/ent/ent_painting2016/images/2.jpg?1520",
        imgW: "1875",
        imgH: "3015",
        areaW: "375",
        areaH: "603",
        areaL: "1379",
        areaT: "103",
        limitMax: .3,
        limitMin: .2
    },
    {
        link: "http://static.ws.126.net/f2e/ent/ent_painting2016/images/3.jpg?1520",
        limitMax: .12,
        limitMin: .08,
        imgW: "1875",
        imgH: "3015",
        areaW: "152",
        areaH: "244",
        areaL: "791",
        areaT: "1193"
    },
    {
        link: "http://static.ws.126.net/f2e/ent/ent_painting2016/images/4.jpg?44",
        limitMax: .22,
        limitMin: .15,
        imgW: "1875",
        imgH: "3015",
        areaW: "282",
        areaH: "454",
        areaL: "857",
        areaT: "413"
    }],
    this.radio = 1,		//缩放比例
    this.index = 0,		//起始图
    this.fps = 40,		//渲染帧数
    this.scale = .985,	 //radio限制外快播
    this.scaleSlow = .995 //radio限制内慢放
}

hzh.prototype.initCanvas = function() {
    this.w = window.innerWidth,
    this.h = window.innerHeight,
    this.w > this.h && (this.w = 725, this.h = 1206, $("body").css({
        width: "725px",
        height: "1206px",
        margin: "0 auto",
        position: "relative",
        overflow: "hidden"
    }), $("html").css({
        width: "100%",
        height: "100%"
    })),
    this.canvas.setAttribute("width", this.w),
    this.canvas.setAttribute("height", this.h)
}
hzh.prototype.preload = function() {
    function i() {
        e++,
        e == n.length && a(t.imgList)
    }
    for (var e = 0,t = this,a = function() {},n = this.imgList, m = 0; m < n.length; m++) 
    this.imgList[m].image = new Image,
    this.imgList[m].image.src = n[m].link,
    this.imgList[m].image.i = m,
    this.imgList[m].image.name = m,
    this.imgList[m].image.className = "item",
    this.imgList[m].image.onload = function() {
        $(".collection").append(t.imgList[this.i].image),
        i();
    },
    this.imgList[m].image.onerror = function() {
        console.log("\u5931\u8d25" + this.i),
        i(),
        $(".collection").append(t.imgList[this.i].image)
    };
    return {
        done: function(i) {
            a = i || a
        }
    }
}
hzh.prototype.showend = function() {
    $("#start").hide()
}
hzh.prototype.init = function() {
    var i = this;
    this.initCanvas(),
    this.preload().done(function() {
        i.domList = $(".collection .item").sort(function(i, e) {
            return i.name - e.name
        }),
        i.img_oversize = i.domList[i.index + 1].image,
        i.img_minisize = i.domList[i.index].image,
        i.draw(),
        i.touchEvent()
    })
}
hzh.prototype.draw = function() {
    if (this.index + 1 != this.imgList.length) {
        if (this.radio < this.imgList[this.index + 1].areaW / this.imgList[this.index + 1].imgW && (this.index++, this.radio = 1, !this.imgList[this.index + 1])) return void this.showend();
        this.imgNext = this.imgList[this.index + 1],
        this.imgCur = this.imgList[this.index],
        this.img_oversize = this.domList[this.index + 1],
        this.img_minisize = this.domList[this.index],
        this.drawImgOversize(this.img_oversize, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.radio),
        this.drawImgMinisize(this.img_minisize, this.imgCur.imgW, this.imgCur.imgH, this.imgNext.imgW, this.imgNext.imgH, this.imgNext.areaW, this.imgNext.areaH, this.imgNext.areaL, this.imgNext.areaT, this.radio)
    }
}
hzh.prototype.touchEvent = function() {
    var i = this;
    $("#start").bind("touchstart",function() {
        function e() {
            var a = (new Date).getTime();           
            if (a - t, 1, i.index + 1 != i.imgList.length) {
                if (a - t < 1e3 / i.fps) return void(i.timer = requestAnimationFrame(e));
                t = a,
                i.imgList[i.index + 1].limitMax && i.imgList[i.index + 1].limitMin && i.radio < i.imgList[i.index + 1].limitMax && i.radio > i.imgList[i.index + 1].limitMin ? i.radio = i.scaleSlow * i.radio: i.radio = i.scale * i.radio,
                i.draw(),
                i.timer = requestAnimationFrame(e)
            }
        }
        cancelAnimationFrame(i.timer);

        var t = (new Date).getTime();
        i.timer = requestAnimationFrame(e)
    }),
    $("#start").bind("touchmove",function() {}),
    $("#start").bind("touchend",function() {
        cancelAnimationFrame(i.timer)
    })  
}
hzh.prototype.drawImgOversize = function(i, e, t, a, n, m, s, g) {
    this.ctx.drawImage(i, m - (a / g - a) * (m / (e - a)), s - (n / g - n) * (s / (t - n)), a / g, n / g, 0, 0, 750, 1206)
}
hzh.prototype.drawImgMinisize = function(i, e, t, a, n, m, s, g, r, o) {
    this.ctx.drawImage(i, 0, 0, e, t, (m / o - m) * (g / (a - m)) * o * 750 / m, (s / o - s) * (r / (n - s)) * o * 1206 / s, 750 * o, 1206 * o)
}