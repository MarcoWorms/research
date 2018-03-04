import React, { Component } from 'react'
import game from './game'

const Field = props =>
  <div style={{
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    maxWidth: '70vw',
  }}>
    {
      props.field.shape.map((row, y) =>
        <div style={{ display: 'flex' }} key={'row' + y}>
          {
            row.map((tile, x) =>
              <div key={'tile' + x} style={{
                width: 'calc(80vh / 11)',
                height: 'calc(80vh / 11)',
                maxWidth: 'calc(70vw / 16)',
                maxHeight: 'calc(70vw / 16)',
                backgroundColor:
                  props.player.x === x && props.player.y === y
                  ? 'green'
                  : tile.name === 'wall'
                  ? 'black'
                  : '#444444',
                border: 'solid 1px rgba(255, 255, 255, 0.1)',
                boxSizing: 'border-box',
              }}>
              </div>
            )
          }
        </div>
      )
    }
  </div>

const Button = props =>
  <div
    onMouseDown={props.onMouseDown}
    style={{
      backgroundColor: props.selected ? 'yellow' : '#444444',
      height: props.big ? '40vh' : '20vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'solid 2px #111',
      borderRadius: '5px',
      boxSizing: 'border-box',
      width: '100%',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  >
    <div style={{
      fontSize: props.big ? 'calc(5vw + 5vh)' : 'calc(2vw + 2vh)',
      color: !props.selected ? 'yellow' : '#444444',
    }}>
      {props.children}
    </div>
  </div>

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      ...game.newGameState(),
      action: 'move',
      direction: null,
      fullscreen: false,
    }
  }
  move = direction => {
    this.setState({
      ...game.movePlayer(this.state, direction),
      direction,
      action: 'move',
    })
  }
  attack = direction => {
    this.setState({
      // ...game.movePlayer(this.state, direction),
      direction,
      action: 'attack',
    })
  }
  handleKeyPress = event => {
    const key = event.key
    if (['W', 'w'].includes(key)) {
      this.move('up')
    }
    if (['A', 'a'].includes(key)) {
      this.move('left')
    }
    if (['S', 's'].includes(key)) {
      this.move('down')
    }
    if (['D', 'd'].includes(key)) {
      this.move('right')
    }
    if (['ArrowUp'].includes(key)) {
      this.attack('up')
    }
    if (['ArrowLeft'].includes(key)) {
      this.attack('left')
    }
    if (['ArrowDown'].includes(key)) {
      this.attack('down')
    }
    if (['ArrowRight'].includes(key)) {
      this.attack('right')
    }
  }
  handleKeyRelease = event => {
   this.setState({ direction: null })
  }
  componentDidMount () {
    window.onkeydown = this.handleKeyPress
    window.onkeyup = this.handleKeyRelease
    window.ontouchend = this.handleKeyRelease
    window.onmouseup = this.handleKeyRelease
  }
  handleFullscreenToggle = () => {
    if (!this.state.fullscreen) {
      const { documentElement } = document;
      if (documentElement.requestFullscreen) {
        documentElement.requestFullscreen();
      }
      else if (documentElement.mozRequestFullScreen) {
        documentElement.mozRequestFullScreen();
      }
      else if (documentElement.webkitRequestFullScreen) {
        documentElement.webkitRequestFullScreen();
      }
      else if (documentElement.msRequestFullscreen) {
        documentElement.msRequestFullscreen();
      }
      try {
        window.screen.orientation.lock('landscape')
        console.log('Orientantion locked to landscape')
      }
      catch (err) {
        console.log('Orientantion lock not avaiable')
      }
      this.setState({ fullscreen: true })
      return
    }
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    this.setState({ fullscreen: false })
  }
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <a
          href="#"
          style={{ position: 'absolute', color: '#eeeeee', width: '100%', textAlign: 'center' }}
          onClick={this.handleFullscreenToggle}
        >
          Fullscreen
        </a>
        <div style={{ width: '100%' }}>
          <Button big
            selected={this.state.direction === 'up'}
            onMouseDown={() => this.state.action === 'move' ? this.move('up') : this.attack('up')}
          >
            ▲
          </Button>
          <Button big
            selected={this.state.direction === 'left'}
            onMouseDown={() => this.state.action === 'move' ? this.move('left') : this.attack('left')}
          >
            ◀
          </Button>
          <Button small
            selected={this.state.action === 'move'}
            onMouseDown={() => this.setState({ action: 'move' })}
          >
            Move
          </Button>
        </div>
        <div>
          <Field {...this.state} />
        </div>
        <div style={{ width: '100%' }}>
          <Button big
            selected={this.state.direction === 'down'}
            onMouseDown={() => this.state.action === 'move' ? this.move('down') : this.attack('down')}
          >
            ▼
          </Button>
          <Button big
            selected={this.state.direction === 'right'}
            onMouseDown={() => this.state.action === 'move' ? this.move('right') : this.attack('right')}
          >
            ▶
          </Button>
          <Button small
            selected={this.state.action === 'attack'}
            onMouseDown={() => this.setState({ action: 'attack' })}
          >
            Attack
          </Button>
        </div>
      </div>
    )
  }
}

export default App;
