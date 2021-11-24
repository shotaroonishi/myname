var Engine = Matter.Engine, //物理シュミレーションおよびレンダリングを管理するコントローラーとなるメソッド
  World = Matter.World, //物理演算領域の作成・操作するメソッドを含む
  Body = Matter.Body, //剛体のモデルを作成・操作するメソッドを含む
  Bodies = Matter.Bodies, //一般的な剛体モデルを作成するメソッドを含む
  Constraint = Matter.Constraint, //制約を作成・操作するメソッドを含む
  Composites = Matter.Composites,
  Common = Matter.Common,
  Vertices = Matter.Vertices, //頂点のセットを作成・操作するメソッドを含む
  MouseConstraint = Matter.MouseConstraint; //マウスの制約を作成するためのメソッドが含む

// Matter.jsのEngineを作成
var container = document.getElementById("canvas-container");

let width = window.innerWidth; //windowの幅
let height = document.body.offsetHeight; //windowの高さからフッターの高さをひく
let items = 7; //itemの数

var engine = Engine.create(container, {
  render: {
    //レンダリングの設定
    options: {
      wireframes: false, //ワイヤーフレームモードをoff
      width: width, //canvasのwidth(横幅)
      height: height, //canvasのheight(高さ)
      background: "rgba(0, 0, 0, 0)",
    },
  },
});

// マウス操作を追加
// var mouseConstraint = MouseConstraint.create(engine);
// World.add(engine.world, mouseConstraint);

var mouseConstraint = MouseConstraint.create(engine, {
  element: container, //マウス操作を感知する要素を指定（DEMOでは生成したcanvasを指定）
  constraint: {
    render: {
      strokeStyle: "rgba(0, 0, 0, 0)", //マウス操作の表示を隠す
    },
  },
});

mouseConstraint.mouse.element.removeEventListener(
  "mousewheel",
  mouseConstraint.mouse.mousewheel
);
mouseConstraint.mouse.element.removeEventListener(
  "DOMMouseScroll",
  mouseConstraint.mouse.mousewheel
);

let touchStart;
mouseConstraint.mouse.element.addEventListener("touchstart", (event) => {
  if (!mouseConstraint.body) {
    touchStart = event;
  }
});

mouseConstraint.mouse.element.addEventListener("touchend", (event) => {
  if (!mouseConstraint.body) {
    const startY = touchStart.changedTouches[0].clientY;
    const endY = event.changedTouches[0].clientY;
    const delta = Math.abs(startY - endY);

    if (delta > 80) {
      window.scrollTo(0, 600);
    }
  }
});

World.add(engine.world, mouseConstraint);

//床を作る
World.add(engine.world, [
  Bodies.rectangle(0, height, width * 2, 1, {
    isStatic: true, //固定する
    render: {
      fillStyle: "#000", // 塗りつぶす色: CSSの記述法で指定
      strokeStyle: "rgba(0, 0, 0, 0)", // 線の色: CSSの記述法で指定
      lineWidth: 0,
    },
  }),
]);

//ランダムな値を作る
let getRandomParameter = (max, min) => {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

//物体を追加する
for (var i = 0; i < items; i++) {
  var rnd = parseInt(Math.random() * width);
  var x = getRandomParameter(width, 0);
  var y = getRandomParameter(-1000, -500);

  World.add(engine.world, [
    Bodies.rectangle(x, y, 278, 281, {
      //長方形を追加する
      render: {
        sprite: {
          //スプライトの設定
          texture: "./img/txt04.png", //スプライトに使うテクスチャ画像を指定
        },
      },
    }),
    Bodies.rectangle(x, y, 269, 263, {
      //長方形を追加する
      render: {
        sprite: {
          //スプライトの設定
          texture: "./img/txt05.png", //スプライトに使うテクスチャ画像を指定
        },
      },
    }),
    Bodies.rectangle(x, y, 241, 281, {
      //長方形を追加する
      render: {
        sprite: {
          //スプライトの設定
          texture: "./img/txt01.png", //スプライトに使うテクスチャ画像を指定
        },
      },
    }),
    Bodies.rectangle(x, y, 286, 281, {
      //長方形を追加する
      render: {
        sprite: {
          //スプライトの設定
          texture: "./img/txt02.png", //スプライトに使うテクスチャ画像を指定
        },
      },
    }),
    Bodies.rectangle(x, y, 282, 279, {
      //長方形を追加する
      render: {
        sprite: {
          //スプライトの設定
          texture: "./img/txt03.png", //スプライトに使うテクスチャ画像を指定
        },
      },
    }),
  ]);
}

// 物理シュミレーションを実行
Engine.run(engine);

gsap.to(".header-nav", {
  // 動かしたい要素は".content"
  //キーフレーム
  keyframes: [{ opacity: 1 }],
  duration: 0.3, // アニメーションは1秒間
  delay: 1.5, //アニメーションをさ3秒遅延させてから動く
});
gsap.to(".main-vis-ttl", {
  // 動かしたい要素は".content"
  //キーフレーム
  keyframes: [{ opacity: 1 }],
  duration: 0.3, // アニメーションは1秒間
  delay: 1.5, //アニメーションをさ3秒遅延させてから動く
});

gsap.registerPlugin(ScrollTrigger);
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".canvas-container",
      markers: true,
      start: "top+=3% top",
      end: "top+=45% top",
      toggleClass: {
        targets: ".canvas-container",
        className: "bk-black",
      },
      // once: true,
    },
  })
  .to(".canvas-container", {
    scrollTrigger: {
      trigger: ".canvas-container",
      markers: true,
      start: "top+=45% top",
      end: "bottom top",
      toggleClass: {
        targets: ".canvas-container",
        className: "bk-blue",
      },
    },
  });

gsap.to(".main-vis-ttl", {
  // 動かしたい要素は".a"
  x: "50%", // 右方向に500動く
  y: "100vh",
  rotation: 360,
  // duration: 1, // アニメーションは1秒間
  scrollTrigger: {
    trigger: ".canvas-container", // 要素".a"がビューポートに入ったときにアニメーション開始
    start: "center center", // アニメーション開始位置
    end: "top+=45% top",
    markers: true, // マーカー表示
    scrub: true, // アニメーションをスクロール位置にリンクさせる
  },
});

// gsap.to(".works-slider", 0.8, {
//   width: "150%",
//   left: "150%",
//   delay: 0.4,
//   ease: Expo.ease,
// });

const smoothScrollTrigger = document.querySelectorAll('a[href^="#"]');
for (let i = 0; i < smoothScrollTrigger.length; i++) {
  smoothScrollTrigger[i].addEventListener("click", (e) => {
    e.preventDefault();
    let href = smoothScrollTrigger[i].getAttribute("href");
    let targetElement = document.getElementById(href.replace("#", ""));
    const rect = targetElement.getBoundingClientRect().top;
    const offset = window.pageYOffset;
    const gap = 60;
    const target = rect + offset - gap;
    window.scrollTo({
      top: target,
      behavior: "smooth",
    });
  });
}
