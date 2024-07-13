<template>
  <div class="container mt-4">
    <div class="text-center mb-4">
      <button class="btn btn-primary" @click="generateBoard">Nowa gra</button>
    </div>
    <div v-if="board.length" class="sudoku-board mx-auto">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="sudoku-row">
        <input
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          type="number"
          class="sudoku-cell"
          min="1"
          max="9"
          :value="cell === 0 ? '' : cell"
          @input="updateCell($event, rowIndex, colIndex)"
          :disabled="cell !== 0"
        />
      </div>
    </div>
    <p v-if="resultMessage" class="text-center mt-4">{{ resultMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      board: [],
      resultMessage: ''
    };
  },
  methods: {
    async generateBoard() {
      try {
        const response = await axios.post('https://localhost:7013/generate');
        this.board = response.data;
        this.resultMessage = 'Powodzenia byku';
      } catch (error) {
        console.error('Błąd generowania gry:', error);
      }
    },
    async updateCell(event, rowIndex, colIndex) {
      const value = parseInt(event.target.value, 10);

      console.log('value', value, 'row', rowIndex, 'col', colIndex);

      if (value >= 1 && value <= 9) {
        try {
          const response = await axios.post('https://localhost:7013/check', {
            row: rowIndex,
            col: colIndex,
            number: value
          });
          if (!response.data.isCorrect) {
            alert('Niepoprawna cyfra');
            event.target.value = '';
          }
          if (response.data.isGameFinished) {
            this.resultMessage = 'Zwyciestwo!';
          }
        } catch (error) {
          console.error('Błąd:', error);
        }
      } else {
        event.target.value = '';
      }
    }
  }
};
</script>

<style>
.sudoku-board {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: 0.1rem;
  width: fit-content;
  margin: 0 auto;
}
.sudoku-row {
  display: contents;
}
.sudoku-cell {
  width: 2.5rem;
  height: 2.5rem;
  text-align: center;
  border: 1px solid #ddd;
  font-size: 1.2rem;
  -moz-appearance: textfield; 
}
.sudoku-cell:disabled {
  background-color: #f8f9fa;
}
.sudoku-cell:nth-child(3n) {
  border-right: 2px solid #333;
}
.sudoku-row:nth-child(3n) .sudoku-cell {
  border-bottom: 2px solid #333;
}

.sudoku-cell::-webkit-outer-spin-button,
.sudoku-cell::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.sudoku-cell {
  -moz-appearance: textfield;
}
</style>
