var myGamePiece;
var gameObject,gameObject2,gameObject3,gameObject4,gameObject5,gameObject6,gameObject7,gameObject8,gameObject9;
var myUpBtn;
var myDownBtn;
var myLeftBtn
var myRightBtn,RestartButton;
var backGround;
var backGround2;
var satellite1,satellite2;
var satellite3,satellite4,satellite5;
var stone1,stone2,stone3,stone4, stone5;
var health,gameOver,gameOver2;
function startGame() {
    myGameArea.start();
    myGamePiece=new component( window.innerWidth/7,window.innerHeight/10,"spacegame.png",60,20);
    
    gameObject=new component2(window.innerWidth/3,window.innerHeight/1.8,"moon.png",window.innerWidth*4.5,100);
    gameObject2=new component2(window.innerWidth/1.5,window.innerHeight/1,"earth.png",0-window.innerWidth/4,0);
    gameObject3=new component2(window.innerWidth/3,window.innerHeight/1.8,"mars.png",window.innerWidth*9,100);
    gameObject4=new component2(window.innerWidth/3,window.innerHeight/1.8,"jupiter.png",window.innerWidth*13.8,100);
    gameObject5=new component2(window.innerWidth/2.5,window.innerHeight/3,"saturn.png",window.innerWidth*18.3,100);
    gameObject6=new component2(window.innerWidth/3,window.innerHeight/1.8,"neptune.png",window.innerWidth*22.5,100);
    gameObject7=new component2(window.innerWidth/5.5,window.innerHeight/3,"pluton.png",window.innerWidth*26.1,100);
    gameObject8=new component2(window.innerWidth/1.5,window.innerHeight/1,"portal.png",window.innerWidth*34,0);
    gameObject9=new component2(window.innerWidth/1.5,window.innerHeight/0.8,"final.png",window.innerWidth*50,-window.innerHeight/6);
    satellite1= new component2(window.innerWidth/6,window.innerHeight/6,"satellite.png",window.innerWidth+1,window.innerHeight/10);
    satellite2= new component2(window.innerWidth/6,window.innerHeight/6,"spacestation.png",window.innerWidth+1,window.innerHeight/2);
    satellite3= new component2(window.innerWidth/6,window.innerHeight/6,"satellite.png",window.innerWidth+window.innerWidth/1.8,window.innerHeight/14);
    satellite4= new component2(window.innerWidth/6,window.innerHeight/6,"spacestation.png",window.innerWidth+window.innerWidth/1.8,window.innerHeight/2.4);
    satellite5= new component2(window.innerWidth/6,window.innerHeight/6,"satellite.png",window.innerWidth+window.innerWidth/1.8,window.innerHeight/1.2);
    health=new componenttext("Health:"+myGamePiece.health,window.innerWidth-window.innerWidth/2,45);
    gameOver=new componenttext2("Game Over",window.innerWidth/2.7,window.innerHeight/2);
   
    myUpBtn = new component(70, 70, "button.png", 30, window.innerHeight/1.37-40);    
    myDownBtn = new component(70, 70, "button.png", 30, 20+window.innerHeight/1.37);    
    RestartButton=new component(window.innerWidth/6,window.innerHeight/3.8, "rebutton.png", window.innerWidth/2-window.innerWidth/10, window.innerHeight/2+30); 
    backGround=new component2(window.innerWidth,window.innerHeight,"background.png",0,0);
    backGround2=new component2(window.innerWidth,window.innerHeight,"background.png",window.innerWidth+1,0);
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.canvas.position="absolute";
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        
        this.interval = setInterval(updateGameArea, 20);
        
        window.addEventListener('click', function (e) {
            myGameArea.x = e.pageX;
            myGameArea.y = e.pageY;
            setTimeout(() => {
              myGameArea.x = false;
            myGameArea.y = false;
            }, 100);
            
        })
        
    }, 
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      } ,
      stop : function() {
        clearInterval(this.interval);
        
    }
}
function component(width, height, picsrc, x, y) {
    this.image=new Image();
    this.image.src=picsrc;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.health=100;
    this.score=0;
    this.x = x;
    this.y = y; 
    this.update = function() {
        ctx = myGameArea.context;
        ctx.drawImage(this.image,
        this.x,
        this.y,
        this.width, this.height)
        }
        this.clicked = function() {
            var myleft = this.x;
            var myright = this.x + (this.width);
            var mytop = this.y;
            var mybottom = this.y + (this.height);
            var clicked = true;
            if ((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)) {
                clicked = false;
            }
            return clicked;
        }
        this.crashWith = function(otherobj) {
          var myleft = this.x;
          var myright = this.x + (this.width);
          var mytop = this.y;
          var mybottom = this.y + (this.height);
          var otherleft = otherobj.x;
          var otherright = otherobj.x + (otherobj.width);
          var othertop = otherobj.y;
          var otherbottom = otherobj.y + (otherobj.height);
          var crash = true;
          if ((mybottom < othertop+10) ||
          (mytop +15 > otherbottom) ||
          (myright < otherleft) ||
          (myleft > otherright)) {
            crash = false;
          }
          return crash;
        }
  }
    
    function component2(width, height, picsrc, x, y) {
        this.image=new Image();
        this.image.src=picsrc;
        this.width = width;
        this.height = height;
        this.speedX = 3;
        this.count=0;
        this.x = x;
        this.y = y; 
        
        this.update = function() {
            ctx = myGameArea.context;
            ctx.drawImage(this.image,
            this.x,
            this.y,
            this.width, this.height)
    }  
}
function componenttext(text, x, y) {
  
  this.update = function() {
      ctx = myGameArea.context;
      ctx.font = "21px Showcard Gothic ";
      ctx.fillStyle = "white";
      text="Health:"+myGamePiece.health +"    Score:"+myGamePiece.score;
      this.x=x;
      this.y=y;
      ctx.fillText(text, x, y);
}  
}
function componenttext2(text, x, y) {
  
  this.update = function() {
      ctx = myGameArea.context;
      ctx.font = "40px Showcard Gothic ";
      ctx.fillStyle = "white";
      this.x=x;
      this.y=y;
      ctx.fillText(text, x, y);
}  
}
function updateGameArea() {
  myGameArea.clear();  

  game();
    
  }
  function game(){
    
  if(myGamePiece.health<=0){
    myGameArea.clear();  
    myGamePiece.image.src="explosion.png";
    myGamePiece.width=window.innerWidth/7.5;
    myGamePiece.height=window.innerHeight/6.2;
    RestartButton.x-=0;
    gameObject.x-=0;
    gameObject2.x-=0;
    gameObject3.x-=0;
    gameObject4.x-=0;
    gameObject5.x-=0;
    gameObject6.x-=0;
    gameObject7.x-=0;
    gameObject8.x-=0;
    gameObject9.x-=0;
    backGround.x-=0;
    backGround2.x-=0;
    satellite1.x=-0;
  satellite2.x=-0;
  satellite3.x-=0;
    satellite4.x-=0;
  satellite5.x-=0;
  myUpBtn.x-=0;
  myDownBtn.x-=0;
    backGround.update();
  backGround2.update();
  gameObject2.update();
  gameObject3.update();
  gameObject4.update();
  gameObject5.update();
  gameObject6.update();
  gameObject7.update();
  gameObject8.update();
  gameObject9.update();

  health.update();
  myUpBtn.update();
  myDownBtn.update();
  gameObject.update();
  satellite1.update();
  satellite2.update();
  satellite3.update();
  satellite4.update();
  satellite5.update();
  myGamePiece.update();
  gameOver.update();
    RestartButton.update();
    if(RestartButton.clicked()){
      myGameArea.stop();
      new startGame();
    }
  }
  else{
    myGameArea.clear();  
    
    if (myGameArea.x && myGameArea.y) {
        if (myUpBtn.clicked()) {
          myGamePiece.y -= 8;
          if(myGamePiece.y<=20){
            myGamePiece.y=20;
            myGamePiece.y += 0;
        }
        }
        if (myDownBtn.clicked()) {
          myGamePiece.y += 8;
          if(myGamePiece.y>=window.innerHeight-window.innerHeight/7){
            myGamePiece.y=window.innerHeight-window.innerHeight/7;
            myGamePiece.y += 0; }
        }
        
      }
      backGround.x-=1;
      if(backGround.x==-window.innerWidth-1){
        backGround.x=0;
      }
      backGround2.x-=1;
      if(backGround2.x==0){
        backGround2.x=window.innerWidth+1;
      }
      if(gameObject.x<=window.innerWidth ){
        satellite1.x-=3;
        satellite2.x-=3;
        satellite3.x-=3;
        satellite4.x-=3;
        satellite5.x-=3;
        if(gameObject.x<0-window.innerWidth/3 ){
        satellite1.image.src="stone.png";
        satellite2.image.src="stone.png";
        satellite3.image.src="stone.png";
        satellite4.image.src="stone.png";
        satellite5.image.src="stone.png";
        satellite1.width=window.innerWidth/7.5;
        satellite1.height=window.innerHeight/6.2;
        satellite2.width=window.innerWidth/7.5;
        satellite2.height=window.innerHeight/6.2;
        satellite3.width=window.innerWidth/7.5;
        satellite3.height=window.innerHeight/6.2;
        satellite4.width=window.innerWidth/7.5;
        satellite4.height=window.innerHeight/6.2;
        satellite5.width=window.innerWidth/7.5;
        satellite5.height=window.innerHeight/6.2;

        satellite1.x-=satellite1.speedX;
      if(satellite1.x<=0-window.innerWidth/4){
          satellite1.x=window.innerWidth+1;
          var rand=Math.floor(Math.random() * 100); 
          var rand2=Math.floor(Math.random() * 5); 
          satellite1.y=rand*rand2;
          satellite1.count++;
          if(satellite1.count>=4){
            satellite1.speedX=4.5;
            if(gameObject4.x<=window.innerWidth)
            satellite1.speedX=6;
            if(gameObject6.x<=window.innerWidth)
            satellite1.speedX=7;
          }
          
      }
      satellite2.x-=satellite2.speedX;
      if(satellite2.x<=0-window.innerWidth/4){
          satellite2.x=window.innerWidth+1;
          satellite2.y=satellite1.y+window.innerHeight/2;
          satellite2.count++;
          if(satellite2.count>=4){
            satellite2.speedX=4.5;
            if(gameObject4.x<=window.innerWidth)
            satellite2.speedX=6;
            if(gameObject6.x<=window.innerWidth)
            satellite2.speedX=7;
          }
        
      }
      
      satellite3.x-=satellite3.speedX;
      if(satellite3.x<=0-window.innerWidth/1){
          satellite3.x=window.innerWidth+1;
          satellite2.count++;
          if(satellite2.count>=4){
            satellite3.speedX=4.5;
            if(gameObject4.x<=window.innerWidth)
            satellite3.speedX=6;
            if(gameObject6.x<=window.innerWidth)
            satellite3.speedX=7;
          }
          
      }
      satellite4.x-=satellite4.speedX;
      if(satellite4.x<=0-window.innerWidth/2){
        satellite4.x=window.innerWidth+1;
        satellite4.count++;
        if(satellite4.count>=4){
          satellite4.speedX=4.5;
          if(gameObject4.x<=window.innerWidth)
            satellite4.speedX=6;
            if(gameObject6.x<=window.innerWidth)
            satellite4.speedX=7;
        }
    
    }
      satellite5.x-=satellite5.speedX;
      if(satellite5.x<=0-window.innerWidth/1){
          satellite5.x=window.innerWidth+1;
          satellite2.count++;
          if(satellite2.count>=4){
            satellite5.speedX=4.5;
            if(gameObject4.x<=window.innerWidth)
            satellite5.speedX=6;
            if(gameObject6.x<=window.innerWidth)
            satellite5.speedX=7;
          }
      
      }
        }
      }
      else{
      
      satellite1.x-=satellite1.speedX;
      if(satellite1.x<=0-window.innerWidth/4){
          satellite1.x=window.innerWidth+1;
          var rand=Math.floor(Math.random() * 100); 
          var rand2=Math.floor(Math.random() * 5); 
          satellite1.y=rand*rand2;
          satellite1.count++;
          if(satellite1.count>=4){
            satellite1.speedX=5.5;
          }
          
      }
      satellite2.x-=satellite2.speedX;
      if(satellite2.x<=0-window.innerWidth/4){
          satellite2.x=window.innerWidth+1;
          satellite2.y=satellite1.y+window.innerHeight/2;
          satellite2.count++;
          if(satellite2.count>=4){
            satellite2.speedX=5.5;
          }
        
      }
      
      satellite3.x-=satellite3.speedX;
      if(satellite3.x<=0-window.innerWidth/1){
          satellite3.x=window.innerWidth+1;
          satellite2.count++;
          if(satellite2.count>=4){
            satellite3.speedX=5.5;
          }
          
      }
      satellite4.x-=satellite4.speedX;
      if(satellite4.x<=0-window.innerWidth/1){
          satellite4.x=window.innerWidth+1;
          satellite2.count++;
          if(satellite2.count>=4){
            satellite4.speedX=5.5;
          }
        
      }
      satellite5.x-=satellite5.speedX;
      if(satellite5.x<=0-window.innerWidth/1){
          satellite5.x=window.innerWidth+1;
          satellite2.count++;
          if(satellite2.count>=4){
            satellite5.speedX=5.5;
          }
      
      }
    }
    
    if (myGamePiece.crashWith(satellite1)) {
      
        myGamePiece.health--;
      }
    
      if (myGamePiece.crashWith(satellite2)){
       
        myGamePiece.health--;
      }
      
      if (myGamePiece.crashWith(satellite3)){
        
        myGamePiece.health--;
      }
      
      if (myGamePiece.crashWith(satellite4))
      myGamePiece.health--;
      
      
      if (myGamePiece.crashWith(satellite5)) {
        myGamePiece.health--;
      }
      gameObject.x-=1;
      gameObject2.x-=1;
      gameObject3.x-=1;
      gameObject4.x-=1;
      gameObject5.x-=1;
      gameObject6.x-=1;
      gameObject7.x-=1;
      gameObject8.x-=1;
      gameObject9.x-=1;
      
        myGamePiece.score+=1;
      
      backGround.update();
      backGround2.update();
      gameObject2.update();
      gameObject3.update();
      gameObject4.update();
      gameObject5.update();
      gameObject6.update();
      gameObject7.update();
      gameObject9.update();


      health.update();
      
      myUpBtn.update();
      myDownBtn.update();
      
      gameObject.update();
      satellite1.update();
      satellite2.update();
      satellite3.update();
      satellite4.update();
      satellite5.update();
      myGamePiece.update();
      gameObject8.update();
      
  

    }    
   
  }
  
 