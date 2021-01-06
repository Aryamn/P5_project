//Only used four directions for now
function removeFrom(arr,elt)
{
  for(var i=arr.length-1 ; i>=0;i--)
  {
    if(arr[i]==elt)
      arr.splice(i,1);
  }
}

var cols;
var rows;
var w = 40;
var h = 40;
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

function isDFS()
{
  chooseAlgorithm = 2;
}

function isBFS()
{
  chooseAlgorithm = 3;
}

function mouseDragged()
{
  var validx = Math.floor((mouseX/width)*rows);
  var validy = Math.floor((mouseY/height)*cols);

  if(validx<rows && validy<cols)
  {
    if(choose_Start)
    {
      var startx = Math.floor((mouseX/width)*rows);
      var starty = Math.floor((mouseY/height)*cols);
      if(grid[startx][starty]!=undefined)
      {  
        start = grid[startx][starty];
        openSet.splice(0,openSet.length);
        Q.dequeue();
        Q.enqueue(start);
        openSet.push(start);
      }
      choose_Start = 1;
      start.wall = false;
      end.wall = false;

    }

    else if(choose_End)
    {
      var endx = Math.floor((mouseX/width)*rows);
      var endy = Math.floor((mouseY/height)*cols);
      if(grid[endx][endy]!=undefined)
        end = grid[endx][endy];
      choose_End = 1;
      start.wall = false;
      end.wall = false;
    }

    else if(choose_Wall)
    {
      var tempx = Math.floor((mouseX/width)*rows);
      var tempy = Math.floor((mouseY/height)*cols);
      tempcell = grid[tempx][tempy];
      if(grid[tempx][tempy]!=undefined)
        tempcell.wall = true;
      choose_Wall = 1;
      start.wall = false;
      end.wall = false;
    }

    else if(choose_del_Wall)
    {
      var tempx = Math.floor((mouseX/width)*rows);
      var tempy = Math.floor((mouseY/height)*cols);
      tempcell = grid[tempx][tempy];
      if(grid[tempx][tempy]!=undefined)
        tempcell.wall = false;
      choose_del_Wall = 1;
      start.wall = false;
      end.wall = false;
    }
}
  
}


function initialize()
{
  choose_End = 0;
  choose_Start = 0;
  choose_Wall = 0;
  choose_del_Wall = 0;
}

function isRandomWall()
{
  choose_End = 0;
  choose_Start = 0;
  choose_Wall = 0;
  choose_del_Wall = 0;
  randomWalls();
}


function resetSketch()
{
  var navbar = document.getElementById("NavBarDark");
  var offset = navbar.offsetHeight;

  rows = floor(width/w);
  cols = floor((height-offset)/h);

  //making of grids
  for(var i=0;i<rows;i++)
    grid[i] = new Array(cols);

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

  // mazeGenerate();

  start = grid[0][0];
  end = grid[rows-1][cols-1];
  openSet.push(start);
  start.wall = false;
  end.wall = false;
  programm_started = false
  
  start.vis=1;
  
}

class Queue 
{ 
    // Array is used to implement a Queue 
    constructor() 
    { 
        this.items = []; 
    } 
                  
    // Functions to be implemented 
    enqueue(element) 
    {     
        // adding element to the queue 
        this.items.push(element); 
    } 

    dequeue() 
    { 
        // removing element from the queue 
        // returns underflow when called  
        // on empty queue 
        if(this.isEmpty()) 
            return "Underflow"; 
        return this.items.shift(); 
    }

    
    front() 
    { 
        // returns the Front element of  
        // the queue without removing it. 
        if(this.isEmpty()) 
            return "No elements in Queue"; 
        return this.items[0]; 
    } 
    
    isEmpty() 
    { 
        // return true if the queue is empty. 
        return this.items.length == 0; 
    }  
} 

var Q = new Queue();
Q.enqueue(start);

function setup() {
  // put setup code here

  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-holder');
  
  resetSketch();
  
  
}


function draw() {
  background(255);
  visualize_grid();
  if(programm_started==true)
  { 
    if(chooseAlgorithm==2)
      dfs();

    else if(chooseAlgorithm==3)
      bfs();
    else
      dijikAstar();
  }
  
}

