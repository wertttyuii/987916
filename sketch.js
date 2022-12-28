// var face_x,face_y,face_size
var face_x = [] 
var face_y = []
var face_size = []
var face_num = 2
var song 
var songIsplay = false
var music_btn
var stop_btn
var say_btn
var amp
var vol = 0
var myRec = new p5.SpeechRec();
var result
var m_x  
var m_y  
let handpose;
let video;
let predictions = [];
let pointerX, pointerY, pointerZ;
let pointerX8,pointerY8,pointerZ8,pointerX4,pointerY4,d
let pointerX14,pointerY14,pointerX16,pointerY16
var m_x = []
var m_y = []


function draw() {
  translate(width, 0);
  scale(-1, 1);
  drawKeypoints();
}

function preload(){
  song = loadSound("As You Were - TrackTribe.mp3")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(220);
    music_btn = createButton("音樂跳舞")
    music_btn.position(10,10)
    music_btn.size(350, 100);
    music_btn.style('background-color', 'black');
    music_btn.style('font-size', '33px');
    music_btn.style('color', 'white');
    music_btn.mousePressed(music_btn_pressed);

    stop_btn = createButton("停止")
    stop_btn.position(370,10)
    stop_btn.size(350,100);
    stop_btn.style('background-color','black');
    stop_btn.style('font-size','33px');
    stop_btn.style('color','white');
    stop_btn.mousePressed(stop_btn_pressed)

    say_btn = createButton("語音命令(跳舞/停止)")
    say_btn.position(730,10)
    say_btn.size(350, 100);
    say_btn.style('background-color','black');
    say_btn.style('font-size','33px');
    say_btn.style('color','white');
    say_btn.mousePressed(say_btn_pressed)

}

function draw() {
  background(220);
  textSize(50);
  push()

    fill(255,211,170)
    translate(width/2,height/2)
    ellipse(0,0,400)


    fill(0)
    ellipse(-70+m_x/40,-70+m_y/80,70)
    noFill()

    fill(0)
    ellipse(70+m_x/40,-90+m_y/80,70)

    fill(255,211,170)
    ellipse(200+m_x/40,180+m_y/80,100)

    fill(255,211,170)
    ellipse(-200+m_x/40,180+m_y/80,100)

    fill(255)
    ellipse(-50,110,90)

    if(songIsplay){
      vol = amp.getLevel()
      m_x = map(vol,0,1,0,width) 
      m_y = map(vol,0,1,0,height)
    }
    else
    {
      m_x = 0
      m_y = 0
  
    }

  pop()
}




function music_btn_pressed(){
  song.stop()
  song.play()
  songIsplay = true
  amp=new p5.Amplitude()
  music_btn.style('background-color','#00b4d8')
  stop_btn.style('background-color','black')
  Speech_btn.style('background-color','black')
}

function stop_btn_pressed(){
  song.pause()
  songIsplay = false
  music_btn.style('background-color','black')
  stop_btn.style('background-color','#00b4d8')
  Speech_btn.style('background-color','black')
}

function say_btn_pressed(){
  music_btn.style('background-color','black')
  stop_btn.style('background-color','black')
  say_btn.style('background-color','#00b4d8')
  myRec.onResult = showResult;
  myRec.start();
}

function showResult()
{
	if(myRec.resultValue==true) {
	     result = myRec.resultString
         if(myRec.resultString==="跳舞")
            {
                music_btn_pressed()
             }
         if(myRec.resultString==="停止")
            {
 
                stop_btn_pressed()
             }
	}
}

  function drawKeypoints() {
    for (let i = 0; i < predictions.length; i += 1) {
      const prediction = predictions[i];
      for (let j = 0; j < prediction.landmarks.length; j += 1) {
        const keypoint = prediction.landmarks[j];
        fill(0, 255, 0);
        // noStroke();
        if (j == 8) {				
          pointerX8 = map(keypoint[0],0,640,0,width)
          pointerY8 = map(keypoint[1],0,480,0,height)
          pointerZ8 = map(keypoint[2],0,480,0,height)
          console.log(pointerZ8)
          if(pointerZ8<-150)
          {
            R_draw(pointerX8,pointerY8)
          }
          ellipse(pointerX8, pointerY8, 30, 30);
        } else
        if (j == 4) {   
        fill(255,0,0)
          pointerX4 = map(keypoint[0],0,640,0,width)
          pointerY4 = map(keypoint[1],0,480,0,height)
          // pointerZ = keypoint[2]
          // print(pointerZ)
          ellipse(pointerX4, pointerY4, 30, 30);
      
        } else
        if (j == 14) {
          pointerX14 = keypoint[0];
          pointerY14 =  keypoint[1];
        } else
        if (j == 16) {
          pointerX16 = keypoint[0];
          pointerY16 = keypoint[1];
        }
        
      }
    
    }
  }

  