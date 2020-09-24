import React, { Component } from 'react';

const all = ['DEL', '/', 7, 8, 9, '*', 4, 5, 6, '+', 1, 2, 3, '-', '.', 0];
const ids = {
  7: 'seven',
  8: 'eight',
  9: 'nine',
  4: 'four',
  5: 'five',
  6: 'six',
  1: 'one',
  2: 'two',
  3: 'three',
  0: 'zero',
  '/': 'divide',
  '*': 'multiply',
  '-': 'subtract',
  '+': 'add',
  '.': 'decimal',
  'DEL': 'delete'
}
const nums = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
const ops = ['/', '*', '-', '+', 'AC', 'DEL', '.'];

export class Calculator extends Component {
  state = {
    lastPressed: undefined,
    calc: '0',
    operation: undefined
  }

  handleClick = (e) => {
    const { calc, lastPressed } = this.state;
    const { innerText } = e.target;

    switch (innerText) {

      case 'AC': {
        this.setState({
          calc: '0'
        });
        break;
      }

      case 'DEL': {
        if (calc !== '0') {
          const d = calc.toString().slice(0, calc.length - 1)
          this.setState({
            calc: d === '' ? '0' : d
          });
        }
        break;
      }

      case '=': {
        const evaluated = eval(calc);
        this.setState({
          calc: evaluated
        });
        break;
      }

      case '.': {
        const splitted = calc.split(/[\+\-\*\/]/);
        const last = splitted.slice(-1)[0];

        if (!last.includes('.')) {
          this.setState({
            calc: calc + '.'
          });
        }
        break;
      }

      default: {
        let e = undefined;
        if (ops.includes(innerText)) {
          if (ops.includes(lastPressed) && innerText !== '-') {
            const lastNumberIdx = calc.split('').reverse()
              .findIndex(char => char !== ' ' && nums.includes(+char));
            e = calc.slice(0, calc.length - lastNumberIdx) + ` ${innerText} `;
          } else {
            e = `${calc} ${innerText} `;
          }
        } else {
          e = calc === '0' ? innerText : (calc + innerText);
        }

        this.setState({
          calc: e,
        });
      }
    }

    this.setState({
      lastPressed: innerText
    });
  }

  render() {
    const { calc } = this.state

    return (
      <div className="calculator-grid">
        <div id="display" className="display">
          <div className="calc" >{calc}</div>
        </div>

        <button id="clear" className="span-two" onClick={this.handleClick}>AC</button>

        {all.map(item => (
          <button
            key={item}
            onClick={this.handleClick}
            id={ids[item]}
          >
            {item}
          </button>
        ))}

        <button id="equals" className="span-two" onClick={this.handleClick}>=</button>
      </div>
    )
  }
}

export default Calculator;
