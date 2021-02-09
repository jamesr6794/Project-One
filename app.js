// console.log('hello')

document.addEventListener('DOMContentLoaded', () => {
    const slots = document.querySelectorAll('.board div')
    const result = document.querySelector('#result')
    const showCurrentPlayer = document.querySelector('#current-player')
    let currentPlayer = 1

    for (var i = 0, blah=slots.length; i<blah; i++)

    (function(game){
        //add onclick to each square in grid
        slots[i].onclick=function(){
            //if the square under current player is taken you can go on top
            if (slots[game + 7].classList.contains('taken')) {
                if (currentPlayer === 1) {
                    slots[game].classList.add('taken')
                    slots[game].classList.add('player-one')
                    //change player
                    currentPlayer = 2
                    showCurrentPlayer.innerHTML = currentPlayer
                } else if (currentPlayer === 2) {
                    slots[game].classList.add('taken')
                    slots[game].classList.add('player-two')
                    //change player again
                    currentPlayer = 1
                    showCurrentPlayer.innerHTML = currentPlayer                  
                } 
                //if the square under current square you cant go there
            } else alert('Try Again!')
        }
    })(i)

    //checks game for winner
    function checkWinner() {
        const winningCombo = [
            [0, 1, 2, 3], [41, 40, 39, 38], [7, 8, 9, 10], [34, 33, 32, 31], [14, 15, 16, 17], [27, 26, 25, 24], [21, 22, 23, 24],[20, 19, 18, 17], [28, 29, 30, 31], [13, 12, 11, 10], [35, 36, 37, 38], [6, 5, 4, 3], [0, 7, 14, 21], [41, 34, 27, 20],[1, 8, 15, 22], [40, 33, 26, 19], [2, 9, 16, 23], [39, 32, 25, 18], [3, 10, 17, 24], [38, 31, 24, 17], [4, 11, 18, 25],[37, 30, 23, 16], [5, 12, 19, 26], [36, 29, 22, 15], [6, 13, 20, 27], [35, 28, 21, 14], [0, 8, 16, 24], [41, 33, 25, 17],[7, 15, 23, 31], [34, 26, 18, 10], [14, 22, 30, 38], [27, 19, 11, 3], [35, 29, 23, 17], [6, 12, 18, 24], [28, 22, 16, 10],[13, 19, 25, 31], [21, 15, 9, 3], [20, 26, 32, 38], [36, 30, 24, 18], [5, 11, 17, 23], [37, 31, 25, 19], [4, 10, 16, 22],[2, 10, 18, 26], [39, 31, 23, 15], [1, 9, 17, 25], [40, 32, 24, 16], [9, 7, 25, 33], [8, 16, 24, 32], [11, 7, 23, 29], [12, 18, 24, 30], [1, 2, 3, 4], [5, 4, 3, 2], [8, 9, 10, 11], [12, 11, 10, 9], [15, 16, 17, 18], [19, 18, 17, 16], [22, 23, 24, 25], [26, 25, 24, 23], [29, 30, 31, 2], [33, 32, 31, 30], [36, 37, 38, 39], [40, 39, 38, 37], [7, 14, 21, 28], [8, 15, 22, 29], [9, 16, 23, 30], [10, 17, 24, 31], [11, 18, 25, 32], [12, 19, 26, 33], [13, 20, 27, 34]
        ]
        //take the 4 chips in the winning array and plug into slots
        for (let z=0; z<winningCombo.length; z++) {
            const chip1 = slots[winningCombo[z][0]]
            const chip2 = slots[winningCombo[z][1]]
            const chip3 = slots[winningCombo[z][2]]
            const chip4 = slots[winningCombo[z][3]]

            //check arrays to see if they have class of player-one
            if(chip1.classList.contains('player-one') &&
            chip2.classList.contains('player-one') &&
            chip3.classList.contains('player-one') &&
            chip4.classList.contains('player-one')) {
                result.innerHTML='Player 1 Wins'
            }
            else if(chip1.classList.contains('player-two') &&
            chip2.classList.contains('player-two') &&
            chip3.classList.contains('player-two') &&
            chip4.classList.contains('player-two')) {
                result.innerHTML='Player 2 Wins'
            }
        } 
    } slots.forEach(chip => chip.addEventListener('click', checkWinner))
})

// make it stop switching colors on click
// end game when winner is established
//reset game when winner is established
// add scoreboard