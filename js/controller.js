angular.module('ticTacToeApp')
    .controller('ticTacToeCtrl', function () {
        var emptyCell = '-';
        var vm = this;
        vm.board = [
          [{
                value: emptyCell
          }, {
                value: emptyCell
          }, {
                value: emptyCell
          }],
          [{
                value: emptyCell
          }, {
                value: emptyCell
          }, {
                value: emptyCell
          }],
          [{
                value: emptyCell
          }, {
                value: emptyCell
          }, {
                value: emptyCell
          }]
        ];
        vm.isTaken = function (cell) {
            return cell.value !== emptyCell;
        };
        vm.clearBoard = function () {
            vm.board.forEach(function (row) {
                row.forEach(function (cell) {
                    cell.value = emptyCell;
                });
            });
        };
        vm.newGame = function () {
            vm.currentPlayer = 'X';
            vm.winner = false;
            vm.tie = false;
            vm.clearBoard();
        };
        vm.isBoardFull = function () {
            for (var row = 0; row < 2; row++) {
                for (var col = 0; col <= 2; col++) {
                    if (vm.board[row][col].value === emptyCell) {
                        return false;
                    }
                }
            }
            return true;
        };
        vm.checkForEndOfGame = function () {
            var checkInRows = checkForMatch(vm.board[0][0], vm.board[0][1], vm.board[0][2]) ||
                checkForMatch(vm.board[1][0], vm.board[1][1], vm.board[1][2]) ||
                checkForMatch(vm.board[2][0], vm.board[2][1], vm.board[2][2]);
            var checkInCols = checkForMatch(vm.board[0][0], vm.board[1][0], vm.board[2][0]) ||
                checkForMatch(vm.board[0][1], vm.board[1][1], vm.board[2][1]) ||
                checkForMatch(vm.board[0][2], vm.board[1][2], vm.board[2][2]);
            var checkDiagonal = checkForMatch(vm.board[0][0], vm.board[1][1], vm.board[2][2]) ||
                checkForMatch(vm.board[0][2], vm.board[1][1], vm.board[2][0]);
            vm.winner = checkInRows || checkInCols || checkDiagonal;
            vm.tie = !vm.winner && vm.isBoardFull();
            return vm.winner || vm.tie;
        }
        vm.play = function (cell) {
            cell.value = vm.currentPlayer;

            if (vm.checkForEndOfGame() === false) {
                vm.currentPlayer = vm.currentPlayer === 'X' ? 'O' : 'X';
            }
        };
        vm.newGame();
    
        function checkForMatch(cell1, cell2, cell3) {
                return cell1.value === cell2.value &&
                    cell1.value === cell3.value &&
                    cell1.value !== emptyCell;
            }
    });