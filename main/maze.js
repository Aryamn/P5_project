
// function mazeGenerate()
// {
   
//     var current = grid[0][0] //change it to something else
//     current.vis=1;
//     var stack = new Stack();
//     stack.push(current);
//     while(!stack.isEmpty())
//     {
//         var currentCell = stack.peek();
//         currentCell.wall = true;
//         stack.pop();

//         var neighbors = currentCell.neigh;
//         var notvis=[];
//         for(var i=0;i<neighbors.length;i++)
//         {
//             if(neighbors[i].vis==0)
//                 notvis.push(neighbors[i]);
//         }

//         if(notvis.length>0)
//         {
//             var r = floor(random(0,notvis.length));
//             notvis[r].wall = true;
//             notvis[r].vis = 1;
//             stack.push(notvis[r]);
//         }

        
        
//     }
// }

function mazeGenerate()
{
    for(var i=0;i<7;i++)
    {
        var x1 = floor(random(0,0));
        var x2 = floor(random(0,rows));

        var y = floor(random(0,cols));

        for(var j=x1 ;j<=x2;j++)
        {
            grid[j][y].wall = true;
        }
    }

    for(var i=0;i<7;i++)
    {
        var y1 = floor(random(0,0));
        var y2 = floor(random(0,cols));

        var x = floor(random(0,rows));

        for(var j=y1 ;j<=y2;j++)
        {
            grid[x][j].wall = true;
        }
    }
}

function randomWalls()
{
    for(var i=0;i<rows;i++)
    {
        for(var j=0;j<cols;j++)
        {
            if(random()<0.3)
                grid[i][j].wall = true;
            else
            grid[i][j].wall = false;
        }
    }

    start.wall = false;
    end.wall = false;
}