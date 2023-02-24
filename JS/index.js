const playerName = document.getElementById('playerName');
const playGame = document.getElementById('play');
const gameWinner = document.getElementById('gameResult');
const resetButton = document.getElementById('restart');
const text = document.createElement('p');
const inputs = document.querySelectorAll('.ttt-field input');

let players = [];
let currentPlayer = 0;
let moveCount = 0;
let gameWon = false;

// cadastrar jogadores
function playerRegister() {
	const player1Name = document.getElementById('player1').value;
	const player1Key = 'O';
	const player2Name = document.getElementById('player2').value;
	const player2Key = 'X';

	const newPlayer1 = {
		name: player1Name,
		key: player1Key,
	};
	const newPlayer2 = {
		name: player2Name,
		key: player2Key,
	};

	players.push(newPlayer1, newPlayer2);

	text.innerText = `\n${players[currentPlayer].name}`;
	playerName.append(text);

	resetInputs();
	playGame.style.display = 'none';
}

// reiniciar os inputs
function resetInputs() {
	inputs.forEach((input) => {
		input.value = '';
		inputSwitcher(false);
		input.classList.remove('winner', 'player1', 'player2');
		moveCount = 0;
		gameWon = false;
		gameWinner.innerText = '';
	});
}

// ativar e desativar os inputs
function inputSwitcher(choice) {
	inputs.forEach((inputs) => {
		inputs.disabled = choice;
		return;
	});
}

// reiniciar o jogo
function resetGame() {
	resetInputs();

	document.getElementById('player1').value = '';
	document.getElementById('player2').value = '';
	document.getElementById('playerName').value = '';
	playGame.style.display = 'block';

	gameWinner.innerText = '';
	currentPlayer = 0;
	moveCount = 0;
	text.innerText = '';
	gameWon = false;
	players = [];

	inputSwitcher(false);
}

// verificar qual jogador ganhou
function checkWin() {
	const winsPossibilities = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < winsPossibilities.length; i++) {
		const [a, b, c] = winsPossibilities[i];
		if (
			inputs[a].value !== '' &&
			inputs[a].value === inputs[b].value &&
			inputs[b].value === inputs[c].value
		) {
			inputs[a].classList.add('winner');
			inputs[b].classList.add('winner');
			inputs[c].classList.add('winner');
			return players[currentPlayer];
		}
	}

	return null;
}

// registar as jogadas de cada jogador
inputs.forEach((input) => {
	input.addEventListener('click', () => {
		if (input.value !== '') {
			return;
		}

		input.classList.toggle('player1', currentPlayer === 0);
		input.classList.toggle('player2', currentPlayer === 1);
		input.value = players[currentPlayer].key;
		input.disabled = true;
		moveCount++;

		//verificar se o jogo foi ganho ou empatou
		const winner = checkWin();
		if (winner) {
			alert(`Parabéns, ${winner.name} Ganhou!`);
			gameWinner.innerText = `Vencedor: ${winner.name}`;
			gameWon = true;
		} else if (checkTie()) {
			alert('Empate');
			gameWinner.innerText = 'Empate!!';
			resetInputs();
			currentPlayer = 1;
		}

		// quando o jogo terminar, desabilita todos os inputs
		if (gameWon) {
			inputSwitcher(true);
		}

		// alternar entre os jogadores
		currentPlayer = currentPlayer === 0 ? 1 : 0;
		text.innerText = `\n${players[currentPlayer].name}`;
	});

	// previnir que os jogadores não digitem nos campos
	input.addEventListener('keydown', (event) => {
		event.preventDefault();
	});
});

function checkTie() {
	return moveCount === inputs.length;
}

playGame.addEventListener('click', playerRegister);
resetButton.addEventListener('click', resetGame);

document.re;
