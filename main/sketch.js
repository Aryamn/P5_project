//Only used four directions for now
function removeFrom(arr,elt)
{
  for(var i=arr.length-1 ; i>=0;i--)
  {
    if(arr[i]==elt)
      arr.splice(i,1);
  }
}

var cols = 25;
var rows = 25;
var w ;
var h ;
var grid = new Array(cols);

var rowNum = [-1,0,0,1,-1,-1,1,1];
var colNum = [0,-1,1,0,1,-1,-1,1];

var openSet = [];
var closedSet = [];

var start = undefined;
var end = undefined;

var programm_started = false;

var path = [];
function isValid(i,j)
{
  if(i<rows && i>=0 && j<cols && j>=0)
    return 1;
  else
    return 0;
}

function Spot(i,j)
{
  this.x = i;
  this.y = j;
  this.f = 0;
  this.g = 0;
  this.h = 0;
  this.neigh = [];
  this.parent = undefined;
  this.wall = false;
  this.vis = 0;
  this.show = function(col){
    fill(col);
    if (this.wall)
    {
      fill(color("#1F0334"));
    }
    strokeWeight(1);
    stroke(color("#1F0334"));
    rect(this.x*h,this.y*w,h-1,w-1);
  }

  this.addNeigh = function()
  {
    var i = this.x;
    var j = this.y;
    for(var k=0;k<4;k++)
    {
      newi = i+rowNum[k];
      newj = j+colNum[k];

      if(isValid(newi,newj))
        this.neigh.push(grid[newi][newj]);
    }
  }


}

function visualize_grid()
{
  for(var i=0;i<rows;i++)
  {
    for(var j=0;j<cols;j++)
    {
      grid[i][j].show(color(255));
    }
  }

  for(var i=0;i<openSet.length;i++)
    openSet[i].show(color("#b3ffb3"));

  for(var i=0;i<closedSet.length;i++)
    closedSet[i].show(color("#ffcce6"));

  noFill();
  strokeWeight(4);
  stroke(color("#944dff"));
  beginShape();
  for(var i=0; i<path.length ; i++)
    vertex(path[i].x * h + h/2 , path[i].y * w + w/2 );
  endShape();

  
  if(start!=undefined)
    start.show(color("#00cc7a"));

  if(end!=undefined)
    end.show(color("#ff1a75"));

}

function startSketch()
{
  programm_started = true;
  loop();
}

var choose_Start = 0;
var choose_End = 0;
var choose_Wall = 0;
var choose_del_Wall = 0;

function isStart()
{
  choose_Start = 1;
  choose_End = 0;
  choose_Wall = 0;
  choose_del_Wall = 0;
}

function isEnd()
{
  choose_End = 1;
  choose_Start = 0;
  choose_Wall = 0;
  choose_del_Wall = 0;
}

function isWall()
{
  choose_Wall = 1;
  choose_Start = 0;
  choose_End = 0;
  choose_del_Wall = 0;
}

function isdelWall()
{
  choose_Wall = 0;
  choose_Start = 0;
  choose_End = 0;
  choose_del_Wall = 1;
}

function isDijikstra()
{
  chooseAlgorithm = 1;
}

function isAstar()
{
  chooseAlgorithm = 0;
}

function mouseDragged()
{
  var validx = Math.floor((mouseX/height)*rows);
  var validy = Math.floor((mouseY/width)*cols);

  if(validx<rows && validy<cols)
  {
    if(choose_Start)
    {
      var startx = Math.floor((mouseX/height)*rows);
      var starty = Math.floor((mouseY/width)*cols);
      if(grid[startx][starty]!=undefined)
      {  
        start = grid[startx][starty];
        openSet.splice(0,openSet.length)
        openSet.push(start);
      }
      choose_Start = 1;
      start.wall = false;
      end.wall = false;

    }

    else if(choose_End)
    {
      var endx = Math.floor((mouseX/height)*rows);
      var endy = Math.floor((mouseY/width)*cols);
      if(grid[endx][endy]!=undefined)
        end = grid[endx][endy];
      choose_End = 1;
      start.wall = false;
      end.wall = false;
    }

    else if(choose_Wall)
    {
      var tempx = Math.floor((mouseX/height)*rows);
      var tempy = Math.floor((mouseY/width)*cols);
      tempcell = grid[tempx][tempy];
      if(grid[tempx][tempy]!=undefined)
        tempcell.wall = true;
      choose_Wall = 1;
      start.wall = false;
      end.wall = false;
    }

    else if(choose_del_Wall)
    {
      var tempx = Math.floor((mouseX/height)*rows);
      var tempy = Math.floor((mouseY/width)*cols);
      tempcell = grid[tempx][tempy];
      if(grid[tempx][tempy]!=undefined)
        tempcell.wall = false;
      choose_del_Wall = 1;
      start.wall = false;
      end.wall = false;
    }
}
  
}

var chooseRandomWall=0;
function isRandomWall()
{
  chooseRandomWall = 1;
  choose_End = 0;
  choose_Start = 0;
  choose_Wall = 0;
  choose_del_Wall = 0;
}

function mouseClicked()
{
  if(chooseRandomWall)
  {
    randomWalls();
    chooseRandomWall = 0;
  }
}



function setup() {
  // put setup code here

  var canvas = createCanvas(800, 800);
  canvas.parent('sketch-holder');
  resetSketch();
  
  
}

function resetSketch()
{
  w = width/cols;
  h = height/rows;

  //making of grids
  for(var i=0;i<cols;i++)
    grid[i] = new Array(rows);

  //initializations of cells and grid
  for(var i=0;i<rows;i++)
  {
    for(var j=0;j<cols;j++)
    {
      grid[i][j] = new Spot(i,j);
    }
  }

  for(var i=0;i<rows;i++)
  {
    for(var j=0;j<cols;j++)
    {
      grid[i][j].addNeigh();
    }
  }  

  start = grid[0][0];
  end = grid[rows-1][cols-1];
  openSet.push(start);
  start.wall = false;
  end.wall = false;
  programm_started = false
}

function draw() {
  // put drawing code here
  background(0);
  visualize_grid();

  if(programm_started==true)
  { 
    dijikAstar();
  }
  
}

