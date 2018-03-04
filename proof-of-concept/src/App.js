import {
	omit,
} from 'ramda'
import React, { Component } from 'react'
import game from './game'

const enemyAt = ({ x, y, enemies }) =>
	enemies.find(enemy => enemy.x === x && enemy.y === y)

const Field = props =>
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
  }}>
    <div style={{
			minHeight: '50vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			flexDirection: 'column',
		}}>{
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
                  : enemyAt({ x, y, enemies: props.enemies })
                  ? 'red'
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
    }</div>
    <div style={{
      width: '100%',
      flex: '1 1 auto',
      display: 'flex',
    }}>
      <div style={{
        border: 'solid 5px red',
        boxSizing: 'border-box',
        width: '20vw',
        borderRadius: '5px',
        color: 'red',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(2vw + 2vh)',
      }}>
        {props.player.hp}/{props.player.maxHp}
      </div>
      <div style={{
        border: 'solid 5px yellow',
        boxSizing: 'border-box',
        width: '24vw',
        borderRadius: '5px',
        fontSize: 'calc(1.5vw + 1.5vh)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
				flexWrap: 'wrap',
        color: 'yellow',
      }}>
				<div style={{
					width: '24vw',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-around',
					flexWrap: 'wrap',
					textAlign: 'center',
				}}>
					<span>{props.player.deck[0].name}</span>
					<div style={{ display: 'flex', flexDirection: 'column' }}>
						{props.player.deck[0].shape.map((row, y) =>
						<div style={{ display: 'flex' }}>
							{row.map((tile, x) =>
								<div style={{
									width: '2.5vh',
									height: '2.5vh',
									boxSizing: 'border-box',
									border: 'solid 1px black',
									backgroundColor:
									tile === 0 ? 'black'
									: tile === 1 ? 'green'
									: tile === 2 ? 'yellow'
									: null
								}}>
								</div>
							)}
						</div>
						)}
					</div>
				</div>
        <span style={{ fontSize: '3vh', color: 'white' }}>
					Shuffle in: {props.player.deck.length}
				</span>
        <span style={{ fontSize: '3vh', color: 'yellow' }}>
					DMG: {props.player.deck[0].damage}
				</span>
      </div>
      <div style={{
        borderTop: 'solid 9vh black',
        borderBottom: 'solid 9vh black',
        boxSizing: 'border-box',
        width: '2vw',
        backgroundColor: 'yellow',
      }}>

      </div>
      <div style={{
        border: 'solid 5px yellow',
        boxSizing: 'border-box',
        width: '24vw',
        display: 'flex',
        borderRadius: '5px',
      }}>
        {Array.from({ length: props.player.deck[0].cost}).map((_, i) =>
          <div style={{
            border: 'solid 1px yellow',
            boxSizing: 'border-box',
            width: `${100/props.player.deck[0].cost}%`,
            backgroundColor: i < props.player.energy ? 'yellow' : 'transparent'
          }}>

          </div>
        )}
      </div>
    </div>
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
      border: 'solid 1px #111',
      borderRadius: '5px',
      boxSizing: 'border-box',
      width: '100%',
      cursor: 'pointer',
      userSelect: 'none',
    }}
  >
    <div style={{
      fontSize: props.big ? 'calc(5vw)' : 'calc(4vw)',
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
    console.log(this.state)
  }
  attack = direction => {
		const attack = game.attack(this.state, direction)
		if (!attack.success) {
			this.setState({
				action: 'move',
			})
			return
		}
		window.setTimeout(() => this.setState({ action: 'move' }), 100)
    this.setState({
      ...omit(['success'], attack),
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
