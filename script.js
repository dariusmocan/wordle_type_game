let word = "vagabond";

const table = document.getElementById("table");
const rows = 6;
const cols = word.length;

for (let i = 0; i < 6; i++) {
  const row = document.createElement("div");
  row.className = "row";

  for (let j = 0; j < cols; j++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    row.appendChild(cell);
  }
  table.appendChild(row);
}

let currenRow = 0,
  currentCol = 0,
  currentWord = "";

document.addEventListener("keydown", (e) => {
  if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
    if (currentCol < cols) {
      const cell = table.children[currenRow].children[currentCol];
      cell.textContent = e.key.toUpperCase();
      currentCol++;

      currentWord += e.key;
    }
  } else if (e.key === "Backspace") {
    if (currentCol > 0) {
      currentCol--;
      const cell = table.children[currenRow].children[currentCol];
      cell.textContent = "";

      currentWord.slice(0, currentCol);
    }
  } else if (e.key === "Enter") {
    if (currentWord.length < word.length) {
      alert("incorrect length");
    } else {
      const rowCells = table.children[currenRow].children;    

      if (isRight(currentWord)) {
        for (const c of rowCells){
            c.classList.add('true_word');
        }

      } else {
        for (const c of rowCells){
            c.classList.add('wrong_word');
        }

        setTimeout(() => {
            currenRow++;
            currentCol = 0;
        },400);

        console.log(currentWord);

        currentWord = currentWord.slice(0,0);
      }
    }
  }
});

function isRight(currWord) {
  if (currWord === word) {
    return true;
  } else {
    return false;
  }
}
