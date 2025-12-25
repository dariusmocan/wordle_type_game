// word to be guessed
let word = "caine";

// stores letter appearances of the original word
const letterCounts = {};
for (const letter of word){
    letterCounts[letter] = (letterCounts[letter] || 0) + 1;
}

const table = document.getElementById("table");
const rows = 6;
const cols = word.length;
let game_over = false;

// initiating table with 6 tries of word.length cols
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

let currentRow = 0,
  currentCol = 0,
  currentWord = "";

// keydown - typing letter for guesses
document.addEventListener("keydown", (e) => {
  // if game over - no other modifications
  if (game_over){
    return;
  }
  
  if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
    // cell gets the key value if not out of cols
    if (currentCol < cols) {
      const cell = table.children[currentRow].children[currentCol];
      cell.textContent = e.key.toUpperCase();
      currentCol++;

      currentWord += e.key;
    }
    // delete cell value if we have anything
  } else if (e.key === "Backspace") {
    if (currentCol > 0) {
      currentCol--;
      const cell = table.children[currentRow].children[currentCol];
      cell.textContent = "";

      currentWord.slice(0, currentCol);
    }
    // on enter check the letters
  } else if (e.key === "Enter") {
    // if not enough letters => alert
    if (currentWord.length < word.length) {
      alert("incorrect length");
    } else {
      const rowCells = table.children[currentRow].children;    
    
      if (isRight(currentWord)) {
        for (const c of rowCells){
            c.classList.add('true_word');
        }
        // game over!
        setTimeout(() =>{
            alert('you won!');
        }, 900);
        game_over = true;
      } else {
        // copy letter appearances of original word
        const letterCount = {...letterCounts};

        // perfect guesses have priority
        for (let i = 0; i < cols; i++){
            const guessedLetter = rowCells[i].textContent.toLowerCase(); 
            if ( guessedLetter === word[i]){
                rowCells[i].classList.add('true_word');
                // decrease letter apprearances
                letterCount[guessedLetter]--;
            }
        }

        // for partial guesses we check if there are any other appearances before
        for (let i = 0; i < cols; i ++){
            const guessedLetter = rowCells[i].textContent.toLowerCase(); 
            if (guessedLetter === word[i]){
                continue;
            } else if (word.includes(guessedLetter) && letterCount[guessedLetter] > 0){
                rowCells[i].classList.add('semi_true_word');
                letterCount[guessedLetter]--;
            } else {
                rowCells[i].classList.add('wrong_word');
            }

        }

        setTimeout(() => {
            currentRow++;
            currentCol = 0;
            currentWord = '';

            if (currentRow >= rows) {
                game_over = true;

                setTimeout( () => {
                    alert('better luck next time.. :((');
                }, 500);
              }
        },400);

        //console.log('current word : ' + currentWord + ' ; current row : ' + currentRow);
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
