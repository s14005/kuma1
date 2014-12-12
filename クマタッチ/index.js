// forked from phi's "enchant.js | クマタッチ - 12.BGM, SE を追加しよう" http://jsdo.it/phi/nDmu
// forked from phi's "enchant.js | クマタッチ - 11.最後にタッチした位置に点を表示しよう" http://jsdo.it/phi/yujR
// forked from phi's "enchant.js | クマタッチ - 10.変わった動きをするクマイケルクラスを生成しよう" http://jsdo.it/phi/xpGp
// forked from phi's "enchant.js | クマタッチ - 09.スケボーに乗って猛スピードで動きまわるクマ也クラスを生成しよう" http://jsdo.it/phi/ufyP
// forked from phi's "enchant.js | クマタッチ - 08.タッチすると減点になるクマ子クラスを生成しよう" http://jsdo.it/phi/4z6x
// forked from phi's "enchant.js | クマタッチ - 07.スコア, 時間を表示しよう" http://jsdo.it/phi/siDt
// forked from phi's "enchant.js | クマタッチ - 06.クマをタッチした際にスコアを表示するようにしよう" http://jsdo.it/phi/EWcf
// forked from phi's "enchant.js | クマタッチ - 05.クマを特定時間経つと消えるようにしよう" http://jsdo.it/phi/xjiZ
// forked from phi's "enchant.js | クマタッチ - 04.クマをタッチで消せるようにしよう" http://jsdo.it/phi/lLjm
// forked from phi's "enchant.js | クマタッチ - 03.クマをフレームアニメーションさせよう" http://jsdo.it/phi/u57Z
// forked from phi's "enchant.js | クマタッチ - 02.クマが画面外に出ないようにしよう" http://jsdo.it/phi/ts1z
// forked from phi's "enchant.js | クマタッチ - 01.クマがランダムな方向に動くようにしよう" http://jsdo.it/phi/pN3p
// forked from phi's "enchant.js | クマタッチ - 00.クマクラスを生成しよう" http://jsdo.it/phi/nCAK
// forked from phi's "enchant.js - enchant.js のテンプレートを用意しよう" http://jsdo.it/phi/isoa
// おまじない(using namespace enchant)
enchant();

// 素材(必要になりそうなやつ)
var KUMA_IMAGE_PATH      = "http://enchantjs.com/assets/images/chara1.gif"; // プレイヤーイメージ
var MAIN_BGM             = "http://enchantjs.com/assets/sounds/bgm02.wav";  // メインBGM
var TOUCH_SE_PATH        = "http://enchantjs.com/assets/sounds/se8.wav";    // クマタッチ時SE
var TOUCH_KUMAKO_SE_PATH = "http://jsrun.it/assets/b/1/R/m/b1Rm4.wav";      // クマ子タッチ時SE
var TOUCH_KUMAYA_SE_PATH = "http://enchantjs.com/assets/sounds/se9.wav";    // クマ也タッチ時SE

// 定数
var SCREEN_WIDTH          = 320;// 画面幅
var SCREEN_HEIGHT         = 320;// 画面高さ
var FRAME_RATE            = 30; // フレームレート
var GAME_LIMIT_TIME       = 30; // ゲームのリミットタイム
var KUMA_SPEED            = 2;  // クマの移動速度
var KUMA_SCORE            = 10; // クマタッチ時のスコア
var KUMAKO_SCORE          =-100;// クマ子タッチ時のスコア
var KUMAYA_SCORE          = 100;// クマ也タッチ時のスコア
var KUMAYA_SPEED          = 8;  // クマ也の移動速度
var KUMICHAEL_SCORE       = 30; // クマイケルタッチ時のスコア

// グローバル変数
var game       = null;


window.onload = function() {
    game = new Game(SCREEN_WIDTH, SCREEN_HEIGHT);
    game.fps = FRAME_RATE;
    // リソース読み込み
    game.preload(KUMA_IMAGE_PATH, TOUCH_SE_PATH, TOUCH_KUMAKO_SE_PATH, TOUCH_KUMAYA_SE_PATH, MAIN_BGM);
    
    game.onload = function() {
	var scene = game.rootScene;
	scene.backgroundColor = "#222";
	
	// スコアラベル
	var scoreLabel = null;
	var timerLabel = null;
	
	scene.onenter = function() {
	    // フレームとスコアとリセット
	    game.frame = 0;
	    game.score = 0;
	    // スコアラベルを生成, 表示
	    scoreLabel = new Label();
	    scene.addChild(scoreLabel);
	    scoreLabel.moveTo(10, 10);
	    scoreLabel.color = "white";
	    scoreLabel.font = "11px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
	    scoreLabel.text = "Score : ";
	    // タイマーラベルを生成, 表示
	    timerLabel = new Label();
	    scene.addChild(timerLabel);
	    timerLabel.moveTo(250, 10);
	    timerLabel.color = "white";
	    timerLabel.font = "11px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
	    timerLabel.text = "Timer : ";
	};
	
	// シーン更新イベントリスナを登録
	scene.onenterframe = function() {
	    if (game.frame % 15 == 0) {
		var n = Math.floor(Math.random()*100); // 0~99
		var kuma = null;
		// 5% でクマ子
		if (n < 5) {
		    kuma = new Kumako();
		    var x = Math.random()*(game.width-kuma.width);
		    var y = Math.random()*(game.height-kuma.height);
		    kuma.moveTo(x, y);
		}
		// 5% でクマ也
		else if (n < 10) {
		    kuma = new Kumaya();
		    var x = Math.random()*(game.width-kuma.width);
		    var y = Math.random()*(game.height-kuma.height);
		    kuma.moveTo(x, y);
		}
		// 20% でクマイケル
		else if (n < 30) {
		    kuma = new Kumichael();
		    var tx = Math.random()*(game.width-kuma.width);
		    var ty = Math.random()*(game.height-kuma.height);
		    kuma.tx = tx;
		    kuma.ty = ty;
		    kuma.update();
		}
		// 70% でクマ
		else {
		    kuma = new Kuma();
		    var x = Math.random()*(game.width-kuma.width);
		    var y = Math.random()*(game.height-kuma.height);
		    kuma.moveTo(x, y);
		}
		scene.addChild(kuma);
	    }
	    
	    // スコアを更新
	    scoreLabel.text = "Score : " + game.score;
	    
	    // タイマー更新
	    var time = GAME_LIMIT_TIME - Math.floor(game.frame/game.fps);
	    timerLabel.text = "Timer : " + time;
	    if (time < 10) {
		timerLabel.color = "red";
	    }
	    
	    // ゲーム終了
	    if (time <= 0) {
		var score = game.score;
		var message = game.score + "点獲得しました!";
		if (score > 1000) message += "勇次郎現る!!";
		game.end(score, message);
	    }
	    
	    // BGM 再生
	    game.assets[MAIN_BGM].play();
	    
	};
	
	// タッチした位置を確認するために補助サークルを表示する(ちょっとした思いやりが大切)
	var circle = new Entity();
	circle.width = 5;
	circle.height = 5;
	circle.backgroundColor = "white";
	circle._element.style.borderRadius = "50%";
	circle.visible = false;
	scene.addChild(circle);
	scene.addEventListener("touchstart", function(e){
	    circle.x = e.x-circle.width/2;
	    circle.y = e.y-circle.height/2;
	    circle.visible = true;
	});
	
    };
    
    game.start();
};

// クマクラス
var Kuma = Class.create(Sprite, {
    // 初期化
    initialize: function() {
	Sprite.call(this, 32, 32);
	
	this.image = game.assets[KUMA_IMAGE_PATH];
	// 移動値をセット
	this.vx = Math.floor( Math.random()*2 ) ? -1 : 1;
	this.vy = Math.floor( Math.random()*2 ) ? -1 : 1;
	this.speed = KUMA_SPEED;
	this.scaleX = this.vx;
	
	// アニメーション用パラメータ
	this.frameIndex = 0;
	this.frameList = [0, 1, 2];
	
	// タッチした時用パラメータ
	this.touchScore = KUMA_SCORE;
	this.touchSE    = game.assets[TOUCH_SE_PATH];
	
	// 時間
	this.time = 0;
	this.limitTime = 150;
    },
    
    // クマ系クラス共通処理
    onenterframe: function() {
	// 更新処理
	this.update();
	
	// フレームアニメーション
	this.anim();
	
	
	// リミット時間を超えたら消す
	if (this.time > this.limitTime) {
	    this.parentNode.removeChild(this);
	}
	
	// タイム加算
	++this.time;
    },
    
    // クマ系クラス共通処理
    ontouchstart: function() {
	this.parentNode.removeChild(this);
	
	var scoreLabel = new ScoreLabel( this.touchScore );
	scoreLabel.moveTo(this.x, this.y);
	game.rootScene.addChild(scoreLabel);
	
	// スコア加算
	game.score += this.touchScore;
	// タッチ時のSEを再生
	this.touchSE.clone().play();
    },
    
    // 更新
    update: function() {
	// TODO: 動きを変更したいときはここに書く(継承先も同様)
	// 移動
	this.x += this.vx * this.speed;
	this.y += this.vy * this.speed;
	
	// 画面外に出ないよう制御する
	this.control();
    },
    
    // アニメーション
    anim: function() {
	if (game.frame % 4 == 0) {
	    this.frameIndex += 1;
	    this.frameIndex %= this.frameList.length;
	    this.frame = this.frameList[this.frameIndex];
	}
    },
    
    // 画面からはみ出ないよう制御
    control: function() {
	var left   = 0;
	var right  = game.width-this.width;
	var top    = 0;
	var bottom = game.height-this.height;
	
	if (this.x < left) {
	    this.x = left; this.vx *= -1; this.scaleX *= -1;
	}
	if (this.x > right) {
	    this.x = right; this.vx *= -1; this.scaleX *= -1;
	}
	if (this.y < top) {
	    this.y = left; this.vy *= -1;
	}
	if (this.y > bottom) {
	    this.y = right; this.vy *= -1;
	}
    },
    
    
});


// クマ子(クマ界のマドンナ)
var Kumako = Class.create(Kuma, {
    // 初期化
    initialize: function() {
	// 親の初期化処理
	Kuma.call(this);
	// フレーム
	this.frameList = [10, 11, 12];
	// タッチした時用パラメータ
	this.touchScore = KUMAKO_SCORE;
	this.touchSE    = game.assets[TOUCH_KUMAKO_SE_PATH];
    },
    
});



// クマ也(スケボーに乗ったイケメン)
var Kumaya = Class.create(Kuma, {
    // 初期化
    initialize: function() {
	// 親の初期化処理
	Kuma.call(this);
	// スピードを設定
	this.speed = KUMAYA_SPEED;
	// フレーム
	this.frameList = [4];
	// タッチした時用パラメータ
	this.touchScore = KUMAYA_SCORE;
	this.touchSE    = game.assets[TOUCH_KUMAYA_SE_PATH];
    },
    
});


// クマイケル(アメリカ育ち)
var Kumichael = Class.create(Kuma, {
    // 初期化
    initialize: function() {
	// 親の初期化処理
	Kuma.call(this);
	// フレーム
	this.frame = 5;
	this.frameList = [5, 6, 7];
	// タッチした時用パラメータ
	this.touchScore = KUMICHAEL_SCORE;
	// 基準位置
	this.tx = 0;
	this.ty = 0;
	this.radius = Math.random()*40+40;
    },
    
    update: function() {
	// 基準位置の周りをクルクル回る
	var rad = this.time*4*Math.PI/180;
	this.x = this.tx + Math.cos(rad)*this.radius;
	this.y = this.ty + Math.sin(rad)*this.radius;
    },
    
});

// スコアラベル
var ScoreLabel = Class.create(Label, {
    // 初期化
    initialize: function(score) {
	Label.call(this);
	// スコア
	this.score = score;
	// 正
	if (score > 0) {
	    this.text = '+' + this.score;
	    this.color = "white";
	}
	// 負
	else {
	    this.text = this.score;
	    this.color = "red";
	}
	// フォント
	this.font = "11px 'Consolas', 'Monaco', 'ＭＳ ゴシック'";
	// タイム
	this.time = 0;
    },
    
    onenterframe: function() {
	// 位置, 透明度調整
	this.y -= 0.1;
	this.opacity = 1.0 - (this.time/30);
	// 30フレーム経ったら消す
	if (this.time > 30) {
	    this.parentNode.removeChild(this);
	}
	
	++this.time;
    },
});




