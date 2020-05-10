var nums = [1, 2, 3, 4, 5, 6, 7, 8];

window.onload = function() 
{   
    // Fisher-Yates shuffle algorithm for randomizing the numbers on the board.
    function shuffle() 
    {
        var index, temp; 
    
        for (var i = nums.length - 1; i > 0; i--) 
        {
            index = Math.floor(Math.random() * (i + 1));
            temp = nums[i];
            nums[i] = nums[index];
            nums[index] = temp;
        }

        fillTable(nums); 
    }

    // Function for filling the table with the shuffled numbers.
    function fillTable(arr) 
    {
        for (var i = 0; i < arr.length; i++) 
        {
            var id = i + 1;
            var gameCellID = "gameCell" + id;

            var gameCell = document.getElementById(gameCellID);
            gameCell.innerText = arr[i];
        }

        document.getElementById("gameCell9").innerText = ""; 
    }

    // Function for swapping the blank tile and an adjacent tile.  
    function swapTiles(num1, num2) 
    {
        var tile1 = document.getElementById("gameCell" + num1);
        var tile2 = document.getElementById("gameCell" + num2);  

        var temp = tile1.innerText;
        tile1.innerText = tile2.innerText;
        tile2.innerText = temp; 

        
        checkVictory();
    }

    // Function for checking whether the clicked on tile is adjacent to the blank tile.
    // If so, this function will call swapTiles() to swap the tiles.  
    function moveTile() 
    {
        var id = this.id; 
        var idLength = id.length; 
        var number; 

        if (!isNaN(id[idLength - 2]))
        {
            number = id[idLength - 2] + id[idLength - 1]
        }

        else 
        {
            number = id[idLength - 1]
        }

        // Get indeces for numbers above, below, left, and right.
        var numAbove = parseInt(number) - 3;
        var numBelow = parseInt(number) + 3;
        var numLeft = parseInt(number) - 1;
        var numRight = parseInt(number) + 1;

        if (this.innerText)
        {
            var adjacentTile;

            // Check above for blank tile
            if (numAbove >= 1) 
            {
                adjacentTile = document.getElementById("gameCell" + numAbove); 
                
                if (!adjacentTile.innerText)
                {
                    swapTiles(number, numAbove); 
                }
            }

            // Check below for blank tile
            if (numBelow <= 9) 
            {
                adjacentTile = document.getElementById("gameCell" + numBelow); 
                
                if (!adjacentTile.innerText)
                {
                    swapTiles(number, numBelow); 
                }
            }

            // Check left for blank tile 
            if (number !== "1" && number !== "4" && number !== "7")
            {
                adjacentTile = document.getElementById("gameCell" + numLeft); 
                
                if (!adjacentTile.innerText)
                {
                    swapTiles(number, numLeft); 
                }
            }

            // Check right for blank tile
            if (number !== "3" && number !== "6" && number !== "9")
            {
                adjacentTile = document.getElementById("gameCell" + numRight); 
                
                if (!adjacentTile.innerText)
                {
                    swapTiles(number, numRight); 
                }
            }
        }
    }

    // Function for checking whether the user has won the game.  
    function checkVictory() 
    {
        if (document.getElementById("gameCell9").innerText)
        {
            return;  
        }
        
        for (var i = 1; i < 8; i++)
        {
            var firstCell = document.getElementById("gameCell" + i); 
            var secondCell = document.getElementById("gameCell" + (i + 1));

            if (firstCell.innerText && secondCell.innerText)
            {
                if (parseInt(firstCell.innerText) > parseInt(secondCell.innerText))
                {
                    return;
                }
            }
        }

        setTimeout(function() {
            alert("You win!");
        }, 1);
    }

    // Shuffle the table first. 
    shuffle(); 

    // Call the moveTile() funtion whenever a tile is clicked on.
    for (var i = 1; i <= 9; i++)
    {
        document.getElementById("gameCell" + i).addEventListener('click', moveTile, false);
    }

    // Shuffle the table whenever this button is clicked.  
    var gameButton = document.getElementById("gameButton"); 
    gameButton.onclick = shuffle; 
}

