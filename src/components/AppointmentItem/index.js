import './index.css'

const AppointmentItem = props => {
  const {eachAppointment, isStatedAppointment} = props
  const {id, title, date, isLiked} = eachAppointment

  const startUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onStarted = () => {
    isStatedAppointment(id)
  }

  return (
    <li className="list-element">
      <div className="app-title-container">
        <p className="app-title">{title}</p>
        <button
          data-testid="star"
          onClick={onStarted}
          className="star-btn"
          type="button"
        >
          <img src={startUrl} alt="star" />
        </button>
      </div>

      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
