import React from 'react';
import ReactDOM from 'react-dom';
import '../dist/icons.common';

let Icons = {};

Object.keys(icons).forEach((iconPath) => {
  let Icon = require('../dist/' + iconPath +'.js').default;
  const iconSize = iconPath.split('/')[0];
  const iconName = iconPath.split('/')[1];
  if (!Icons.hasOwnProperty(iconSize)) Icons[iconSize] = {};
  Icons[iconSize][iconName] = Icon;
});

const example =
`import @vkontakte/icons; 
import Icon24Cancel from '@vkontakte/icons/dist/24/cancel'; 

<Icon24Cancel />`;

class Docs extends React.PureComponent {

  state = {
    currentColor: '#71757A'
  };

  onCurrentColorChange = e => this.setState({ currentColor: e.target.value });

  render () {

    return (
      <div className="root">
        <h1>VK Icons</h1>
        <p>Набор иконок, представленный в виде React компонентов.</p>
        <h2>Установка</h2>
        <pre>npm i @vkonktate/icons</pre>
        <h2>Пример</h2>
        <p>
          Под капотом используется <a target="_blank" href="https://github.com/kisenka/svg-sprite-loader">svg-sprite-loader</a>, и так как каждая иконка – это отдельный js файл, общий код
          был вынесен в <code>icons.common.js</code>, который нужно импортировать до импорта самих иконок. Пример:
        </p>
        <pre>{example}</pre>
        <h2>Стилизация</h2>
        <p>
          Иконки можно красить. Для к элементу <code>svg</code> применено правило <code>fill: currentColor</code>.
          Иными словами, цвет иконки соответствует текущему свойству <code>color</code>.
        </p>
        <label>
          Текущий currentColor:&nbsp;&nbsp;<input type="text" onChange={this.onCurrentColorChange} value={this.state.currentColor}/>
        </label>

        {Object.keys(Icons).map((size) => (
          <div key={size} className="size">
            <h2>{size}</h2>
            <div className="icons">
              {Object.keys(Icons[size]).map((iconName) => {
                const Icon = Icons[size][iconName];
                return (
                  <div
                    className="icon"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      color: this.state.currentColor
                    }}
                    key={iconName}
                  >
                    <Icon />
                    <div className="icon-name">
                      {iconName}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

ReactDOM.render(<Docs />, document.getElementById('root'));
