var chooseAlgorithm=0;
function heuristic(a,b)
{
  var d;
  if(chooseAlgorithm == 0)
    d = dist(a.x,a.y,b.x,b.y);
  
  if(chooseAlgorithm == 1)
    d=0;
  return d;
}


function dijikAstar()
{
  
  if(openSet.length > 0)
  {
    var lowIdx = 0;
    for(var i=0;i<openSet.length;i++)
    {
      if(openSet[i].f<openSet[lowIdx].f)
        lowIdx = i;
    }
    var current = openSet[lowIdx];

    if(current === end)
    {  
      path = [];
      path.push(current);
      var temparent =  current;
      while(temparent.parent)
      {
        path.push(temparent.parent);
        temparent = temparent.parent;
      }
      console.log("Done!");
      visualize_grid();
      noLoop();
      alert("Path Found!!\nClick 'Clear Board' to start new sketch")
    }

    removeFrom(openSet,current);
    closedSet.push(current);


    var neighbors = current.neigh;
    for(var i=0; i<neighbors.length ;i++)
    {
      if(!closedSet.includes(neighbors[i]) && !neighbors[i].wall)
      {  

        var temp = current.g+1;
        var newPath = false;
        if(openSet.includes(neighbors))
        {
          if(temp<neighbors[i].g)
          {  
            neighbors[i].g = temp;
            newPath = true;
          }
        }

        else
        {
          neighbors[i].g = temp;
          newPath = true;
          openSet.push(neighbors[i]);
        }

        if(newPath)
        {
          neighbors[i].h = heuristic(neighbors[i],end);
          neighbors[i].f = neighbors[i].g + neighbors[i].h;
          neighbors[i].parent = current;
        }
      }
    }

    path = [];
    path.push(current);
    var temparent =  current;
    while(temparent.parent)
    {
      path.push(temparent.parent);
      temparent = temparent.parent;
    }

    visualize_grid();

  }

  else if(openSet.length==0)
  {
    console.log("No Path found");
    alert("Oops!! Looks like Path does Not Exist \nClick 'Clear Board' to start new sketch")
    visualize_grid();
    noLoop();
  }
}


function dfs()
{
   
   if(openSet.length!=0)
   {
    
    var current = openSet.pop();
    closedSet.push(current);
    if(current==end)
    {
      alert("Path Found!!\nClick 'Clear Board' to start new sketch");
      noLoop();
    }

     var neighbors = current.neigh;

     for(var i=0;i<neighbors.length;i++)
     {
       if(neighbors[i].vis==0 && neighbors[i].wall==false)
       {
         neighbors[i].vis = 1;
         openSet.push(neighbors[i]);
       }

     }
   }

   else
   {
    alert("Oops!! Looks like Path does Not Exist \nClick 'Clear Board' to start new sketch");
    console.log("not found");
   }
    visualize_grid();

}