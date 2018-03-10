//10.03.2018

const can=document.getElementById('canvas')
const ray=can.getContext('2d')
const border=can.getContext('2d')
const line1=can.getContext('2d')
const line2=can.getContext('2d')

//helps
let pi=Math.PI
function random(max,min) {
  var max,min,rez;//max++
  rez=Math.random()*(max-min)+min
  return rez-rez%1
}
//

let on=true
let start=false
let node=1
let x=2,pX=x
let check=false
let y=2,pY=y
let player={
  defColor:'darkgrey',
  fillColor:'green',
  lives:5,
  score:1
}
// arrow.arc(450,300,5,0,pi*2)
function up() {
  start=true
  check=false
}
function down() {
    check=true
}
ray.moveTo(450,300)
line1.moveTo(450,300)
line2.moveTo(400,300)
var step=0
let activeB=[]
let activeR=[]
let e=0,e1=0
let need

function pre_start() {
  for(let i=0;i<100;i++) {
    let color
    let type=random(1,4)
    if (i===0) {
      type=1
    }
    if (i%10===0) {
      // ray.beginPath()
      switch (type) {
        case 1:color='black'
        break;
        case 2:color='blue';activeB.push(step)
        break;
        case 3:color='red';activeR.push(step)
        break;
        default:

      }
    }
    ray.beginPath()
    ray.arc(450,300,step+2,0,pi*2)
    ray.arc(450,300,step+3,0,pi*2)
    ray.globalAlpha=0.25
    ray.strokeStyle=(color)
    ray.stroke()
    step+=2
  }


  border.beginPath()
  border.arc(450,300,200,0,pi*2)
  border.arc(450,300,200,0,pi*2)
  border.strokeStyle='black'
  border.stroke()
  step=0
}


function fps() {
  // console.log(check)
  if (start) {
    line1.beginPath()
    line1.strokeStyle=player.defColor
    line1.arc(450,300,x,0,pi*2)
    line1.arc(450,300,x,0,pi*2)
    line1.stroke()

    if (x===activeB[e]) {
      need=true
    }else if (x===activeB[e]+20) {
      e++
      need=undefined
    }

    if (x===activeR[e1]+2) {
      need=false
    }else if(x===activeR[e1]+25) {
      e1++
      need=undefined
    }

    if (check) {
      line2.beginPath()
      line2.strokeStyle=player.fillColor
      // line2.globalAlpha=1
      line2.arc(450,300,x+1,0,pi*2)
      line2.arc(450,300,x,0,pi*2)
      border.stroke()

      if (need===false) {
        player.lives--
      }
    }else if(need) {
      player.lives--
    }

    if (x<=200) {
      x+=1;
    }else {
      x=1;need=undefined
      newLevel()
      player.lives=3
      player.score++
    }
  }
  // console.log(need);
  if (player.lives<1) {
    alert("Вы проиграли\n-----------------\nсчёт: "+player.score)
    location.reload()
  }
}
setInterval(fps,speed)
function fullColor() {
  line2.globalAlpha=1
  line2.arc(450,300,x,0,pi*2)
  line2.arc(450,300,x,0,pi*2)
}
newLevel()
