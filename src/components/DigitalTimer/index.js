import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isRunning: false,
      timerLimit: 25,
      timeElapsedInSeconds: 0,
    }
  }

  componentDidMount() {
    // Add any initial setup here
  }

  componentWillUnmount() {
    // Clear the timer if it exists when the component unmounts
    clearInterval(this.intervalId)
  }

  onStartOrPauseTimer = () => {
    const {isRunning} = this.state

    if (isRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({isRunning: !prevState.isRunning}))
  }

  incrementTimeElapsedInSeconds = () => {
    const {timerLimit, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timerLimit * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isRunning: false,
      timeElapsedInSeconds: 0,
      timerLimit: 25,
    })
  }

  onIncrementTimerLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
    }))
  }

  onDecrementTimerLimit = () => {
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit - 1,
    }))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timerLimit, timeElapsedInSeconds} = this.state
    const totalRemainingSeconds = timerLimit * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = totalRemainingSeconds % 60

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isRunning, timerLimit} = this.state
    // const isTimerCompleted = timeElapsedInSeconds === timerLimit * 60
    const startOrPauseButtonText = isRunning ? 'Pause' : 'Start'
    const startOrPauseButtonIcon = isRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const timerStatus = isRunning ? 'Running' : 'Paused'

    return (
      <div className="clock-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timer-and-controller-container">
          <div className="timer">
            <div className="text-container">
              <h1 className="displayed-time">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="status">{timerStatus}</p>
            </div>
          </div>
        </div>
        <div className="controller">
          <div className="buttonControls">
            <button
              type="button"
              className="start-or-pause"
              onClick={this.onStartOrPauseTimer}
            >
              <img
                className="button-icon"
                src={startOrPauseButtonIcon}
                alt={
                  startOrPauseButtonText === 'Start'
                    ? 'play icon'
                    : 'pause icon'
                }
              />
              <h1 className="button-name">{startOrPauseButtonText}</h1>
            </button>
            <button
              type="button"
              className="start-or-pause"
              onClick={this.onResetTimer}
            >
              <img
                className="button-icon"
                src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                alt="reset icon"
              />
              <h1 className="button-name">Reset</h1>
            </button>
          </div>
          <p className="instruction-style">Set Timer limit</p>
          <div className="modifier-container">
            <button
              type="button"
              className="increase-button"
              onClick={this.onDecrementTimerLimit}
              disabled={isRunning || timerLimit === 1}
            >
              -
            </button>
            <p className="minute-count">{timerLimit}</p>
            <button
              type="button"
              className="increase-button"
              onClick={this.onIncrementTimerLimit}
              disabled={isRunning}
            >
              +
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
