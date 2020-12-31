class Stack { 
  
    constructor() 
    { 
        this.items = []; 
    }
    
    push(element) 
    {  
    this.items.push(element); 
    }
    
    pop() 
    { 
    if (this.items.length == 0) 
        return "Underflow"; 
    return this.items.pop(); 
    }
    
    peek() 
    { 
    return this.items[this.items.length - 1]; 
    }
    
    isEmpty() 
    {  
    return this.items.length == 0; 
    } 
} 

function mazeGenerate()
{
   
    var current = grid[0][0] //change it to something else
    current.vis=1;
    var stack = new Stack();
    stack.push(current);
    while(!stack.isEmpty())
    {
        var currentCell = stack.peek();
        currentCell.wall = true;
        stack.pop();

        var neighbors = currentCell.neigh;
        var notvis=[];
        for(var i=0;i<neighbors.length;i++)
        {
            if(neighbors[i].vis==0)
                notvis.push(neighbors[i]);
        }

        if(notvis.length>0)
        {
            var r = floor(random(0,notvis.length));
            notvis[r].wall = true;
            notvis[r].vis = 1;
            stack.push(notvis[r]);
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