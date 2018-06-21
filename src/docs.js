import React from 'react';
import ReactDOM from 'react-dom';
import changes from './changes';

let Icons = {};

Object.keys(icons).forEach((iconPath) => {
  let Icon = require('../dist/' + iconPath +'.js').default;
  const iconSize = iconPath.split('/')[0];
  const iconName = iconPath.split('/')[1];
  if (!Icons.hasOwnProperty(iconSize)) Icons[iconSize] = {};
  Icons[iconSize][iconName] = Icon;
});

const example =
`import Icon24Cancel from '@vkontakte/icons/dist/24/cancel';

<Icon24Cancel />`;

function dashToCamel (dash) {
  const dashSplited = dash.split('_');
  return dashSplited.reduce((res, piece) => {
    piece = piece.charAt(0).toUpperCase() + piece.slice(1);
    return res + piece;
  }, '')
}

class Docs extends React.PureComponent {

  constructor (props) {
    super(props);
    const [anchorSize, anchorName] = window.location.hash.replace('#', '').split('/');
    this.state = {
      currentColor: '#71757A',
      selectedIcon: '',
      copied: false,
      anchorSize,
      anchorName
    };
  }

  onCurrentColorChange = e => this.setState({ currentColor: e.target.value });

  onTextareaChange = () => this.setState({ selectedIcon: null });

  onIconClick = (e) => {
    const { name, size } = e.currentTarget.dataset;
    this.setState({
      selectedIcon: `import Icon${size}${dashToCamel(name)} from '@vkontakte/icons/dist/${size}/${name}';`,
      anchorSize: size,
      anchorName: name
    }, () => {
      this.textareaEl.select();
      document.execCommand('copy');
      this.setState({ copied: true }, () => {
        this.copiedEl.addEventListener('animationend', () => {
          this.setState({ copied: false });
        });
      });
    });
  };

  getTextareaEl = el => this.textareaEl = el;

  getCopiedEl = el => this.copiedEl = el;

  isAnchor (size, name) {
    return size === this.state.anchorSize && name === this.state.anchorName
  }

  isChanged (size, name) {
    const key = `${size}/${name}`;
    switch (changes[key]) {
      case null:
        return 'Удалена';
      case undefined:
        return false;
      default:
        return `Переименована: ${changes[key]}`;
    }
  }

  render () {

    return (
      <div className="root">
        <h1>VK Icons</h1>
        <p>Набор SVG иконок, представленный в виде React компонентов.</p>
        <h2>Установка</h2>
        <pre>npm i @vkontakte/icons</pre>
        <h2>Пример</h2>
        <pre>{example}</pre>
        <h2>Стилизация</h2>
        <p>
          Иконки можно красить. Для этого к элементу <code>svg</code> применено правило <code>fill: currentColor</code>.
          Иными словами, цвет иконки соответствует текущему значению свойства <code>color</code>.
        </p>
        <label>
          currentColor:&nbsp;&nbsp;<input type="text" onChange={this.onCurrentColorChange} value={this.state.currentColor}/>
        </label>

        {Object.keys(Icons).map((size) => (
          <div key={size} className="size">
            <h2>{size}</h2>
            <div className="icons">
              {Object.keys(Icons[size]).map((iconName) => {
                const Icon = Icons[size][iconName];
                const isChanged = this.isChanged(size, iconName);
                return (
                  <a
                    href={`#${size}/${iconName}`}
                    className={`icon ${this.isAnchor(size, iconName) ? 'icon--anchor' : ''} ${ isChanged ? 'icon--changed' : ''}`}
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      color: this.state.currentColor
                    }}
                    key={iconName}
                    onClick={this.onIconClick}
                    data-name={iconName}
                    data-size={size}
                  >
                    <Icon />
                    <div className="icon-name">
                      {iconName}
                    </div>
                    {isChanged && <div className="icon-badge" title={isChanged} />}
                  </a>
                )
              })}
            </div>
          </div>
        ))}
        <textarea ref={this.getTextareaEl} value={this.state.selectedIcon} onChange={this.onTextareaChange} />
        {this.state.copied &&
        <div className="copied" ref={this.getCopiedEl}>
          copied
        </div>
        }
      </div>
    )
  }
}

ReactDOM.render(<Docs />, document.getElementById('root'));
