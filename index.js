class SudokuSolver {
  constructor() {
    this.initilaizeArr();
    const solverButton = document.getElementById("solveButton");
    solverButton.onclick = this.solveSudoku.bind(this);
    const resetButton = document.getElementById("resetButton");
    resetButton.onclick = () => {
      this.removeError();
      this.initilaizeArr();
      this.renderSudoku();
    };
  }

  initilaizeArr() {
    this.sudokuArr = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
  }

  checkifSafe(grid, i, j, num) {
    //checkRow
    //checkCol
    for (let x = 0; x < grid.length; x++) {
      if (grid[i][x] === num || grid[x][j] === num) {
        return false;
      }
    }
    //checkSubGrid

    let subGridSize = Math.sqrt(grid.length);
    let subGridStartRow = i - (i % subGridSize);
    let subGridStartCol = j - (j % subGridSize);

    for (let r = subGridStartRow; r < subGridStartRow + subGridSize; r++) {
      for (let d = subGridStartCol; d < subGridStartCol + subGridSize; d++) {
        if (grid[r][d] == num) {
          return false;
        }
      }
    }

    return true;
  }

  getUserInpuMatrix() {
    for (let i = 0; i < this.sudokuArr.length; i++) {
      for (let j = 0; j < this.sudokuArr.length; j++) {
        const val = document?.getElementById(`${i}${j}`)?.value;
        if (Number(val)) {
          this.sudokuArr[i][j] = Number(val);
        } else {
          this.sudokuArr[i][j] = 0;
        }
      }
    }
  }

  sudokuSolverRec(grid) {
    console.log(grid);
    let i,
      j,
      isBreak = false;
    for (i = 0; i < grid.length; i++) {
      for (j = 0; j < grid.length; j++) {
        if (grid[i][j] === 0) {
          isBreak = true;
          break;
        }
      }
      if (isBreak) {
        break;
      }
    }

    if (i === grid.length && j === grid.length) {
      return true;
    }
    for (let num = 1; num <= grid.length; num++) {
      if (this.checkifSafe(grid, i, j, num)) {
        grid[i][j] = num;
        if (this.sudokuSolverRec(grid)) {
          return true;
        }
        grid[i][j] = 0;
      }
    }

    return false;
  }

  removeError() {
    if (this.errorHeading) {
      const section = document.getElementById("sudokuSection");
      section.removeChild(this.errorHeading);
      this.errorHeading = null;
    }
  }

  renderError() {
    const section = document.getElementById("sudokuSection");
    this.removeError();

    const errorHeading = document.createElement("h2");
    errorHeading.classList.add("errorHeading");
    errorHeading.innerHTML =
      "No possible solution exists for the provided input";
    section.appendChild(errorHeading);
    this.errorHeading = errorHeading;
  }

  solveSudoku() {
    this.removeError();
    this.getUserInpuMatrix();

    if (this.validateUserInputMatrix()) {
      if (this.sudokuSolverRec(this.sudokuArr)) {
        this.renderSudoku();
      } else {
        this.renderError();
      }
    } else {
      this.renderError();
    }
  }

  validateInput(event) {
    if (event.keyCode === 8 || event.keyCode === 46) {
      event.target.value = "";
      return;
    }
    if (!(event.keyCode >= 48 && event.keyCode <= 57)) {
      return false;
    }
  }

  renderSudoku() {
    const sudokuConatiner = document.getElementById("sudokuContainer");
    sudokuConatiner.innerHTML = "";

    for (let i = 0; i < this.sudokuArr.length; i++) {
      const row = document.createElement("div");
      if ((i + 1) % 3 === 0) {
        row.classList.add("marginBottom");
      }
      for (let j = 0; j < this.sudokuArr.length; j++) {
        const box = document.createElement("input");
        box.classList.add("sudokuInput");
        if ((j + 1) % 3 === 0) {
          box.classList.add("marginRight");
        }
        box.setAttribute("maxlength", 1);
        box.value = this.sudokuArr[i][j] !== 0 ? this.sudokuArr[i][j] : "";
        box.setAttribute("id", `${i}${j}`);
        box.setAttribute("autocomplete", "off");
        box.onkeydown = this.validateInput;
        row.appendChild(box);
      }

      sudokuConatiner.appendChild(row);
    }
  }

  validateUserInputMatrix() {
    for (let i = 0; i < this.sudokuArr.length; i++) {
      for (let j = 0; j < this.sudokuArr.length; j++) {
        if (this.sudokuArr[i][j] !== 0) {
          let num = this.sudokuArr[i][j];
          this.sudokuArr[i][j] = 0;
          if (!this.checkifSafe(this.sudokuArr, i, j, num)) {
            return false;
          }
          this.sudokuArr[i][j] = num;
        }
      }
    }
    return true;
  }
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOM fully loaded and parsed");
  const theSudokuSolver = new SudokuSolver();
  theSudokuSolver.renderSudoku();
});
