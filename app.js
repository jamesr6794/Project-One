$(document).ready(function() {
    const connect4 = new Connect4('#connect4')
  
    connect4.onMove = function() {
      $('#player').text(connect4.player);
    }
    
    $('#restart').click(function() {
      connect4.restart();
    })
  });

class Connect4 {
    constructor(selector) {   
      this.rows = 6;
      this.columns = 7;
      this.player = 'red';
      this.selector = selector;
      this.finishGame = false;   
      this.onMove = function() {};
      this.createBoard();
      this.addEventListener();
    }
  
    createBoard() {
      const $board = $(this.selector);
      $board.empty();
      this.finishGame = false;
      this.player = 'red';
      for (let row = 0; row < this.rows; row++) {
        const $row = $('<div>')
          .addClass('row');
        for (let col = 0; col < this.columns; col++) {
          const $col = $('<div>')
            .addClass('col empty')
            .attr('data-col', col)
            .attr('data-row', row);
          $row.append($col);
        }
        $board.append($row);
      }
    }
  
    addEventListener() {
      const $board = $(this.selector);
      const that = this;
  
      function findLastEmptyCell(col) {
        const slots = $(`.col[data-col='${col}']`);
        for (let i = slots.length - 1; i >= 0; i--) {
          const $slot = $(slots[i]);
          if ($slot.hasClass('empty')) {
            return $slot;
          }
        }
        return null;
      }
  
      $board.on('mouseenter', '.col.empty', function() {
        if (that.finishGame) return;
        const col = $(this).data('col');
        const $lastEmptySlot = findLastEmptyCell(col);
        $lastEmptySlot.addClass(`next-${that.player}`);
      });
  
      $board.on('mouseleave', '.col', function() {
        $('.col').removeClass(`next-${that.player}`);
      });
  
      $board.on('click', '.col.empty', function() {
        if (that.finishGame) return;
        const col = $(this).data('col');
        const $lastEmptySlot = findLastEmptyCell(col);
        $lastEmptySlot.removeClass(`empty next-${that.player}`);
        $lastEmptySlot.addClass(that.player);
        $lastEmptySlot.data('player', that.player);
  
        const winner = that.checkForWinner(
          $lastEmptySlot.data('row'), 
          $lastEmptySlot.data('col')
        )
        if (winner) {
          that.finishGame = true;
          alert(`That's game. Player ${that.player} wins`);
          $('.col.empty').removeClass('empty');
          return;
        }
  
        that.player = (that.player === 'red') ? 'black' : 'red';
        that.onMove();
        $(this).trigger('mouseenter');
      });
    } 
  
    checkForWinner(row, col) {
      const that = this;
  
      function $getSlot(i, j) {
        return $(`.col[data-row='${i}'][data-col='${j}']`);
      }
  
      function checkDirection(direction) {
        let total = 0;
        let i = row + direction.i;
        let j = col + direction.j;
        let $nextMove = $getSlot(i, j);
        while (i >= 0 &&
          i < that.rows &&
          j >= 0 &&
          j < that.columns && 
          $nextMove.data('player') === that.player
        ) {
          total++;
          i += direction.i;
          j += direction.j;
          $nextMove = $getSlot(i, j);
        }
        return total;
      }
  
      function checkWin(directionA, directionB) {
        const total = 1 +
          checkDirection(directionA) +
          checkDirection(directionB);
        if (total >= 4) {
          return that.player;
        } else {
          return null;
        }
      }
  
      function checkDiagonalRtoL() {
        return checkWin({i: 1, j: -1}, {i: 1, j: 1});
      }
  
      function checkDiagonalLtoR() {
        return checkWin({i: 1, j: 1}, {i: -1, j: -1});
      }
  
      function checkVertical() {
        return checkWin({i: -1, j: 0}, {i: 1, j: 0});
      }
  
      function checkHorizontal() {
        return checkWin({i: 0, j: -1}, {i: 0, j: 1});
      }
  
      return checkVertical() || 
        checkHorizontal() || 
        checkDiagonalLtoR() ||
        checkDiagonalRtoL();
    }
  
    restart () {
      this.createBoard();
      this.onMove();
    }
  }