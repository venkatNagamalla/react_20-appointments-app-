// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4 as uuidv4} from 'uuid'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {title: '', date: '', appointmentsList: [], isFilterActive: false}

  getTitle = event => {
    this.setState({title: event.target.value})
  }

  starredAppointments = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(eachApp => eachApp.isLiked === true)
    }
    return appointmentsList
  }

  isStatedAppointment = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachApp => {
        if (id === eachApp.id) {
          return {...eachApp, isLiked: !eachApp.isLiked}
        }
        return eachApp
      }),
    }))
  }

  getDate = event => {
    this.setState({date: event.target.value})
  }

  onFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  addAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const titleInput = title === '' ? 'Title' : title
    const formatDate = date ? format(new Date(date), 'dd MMMM yyyy, EEEE') : ''
    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: formatDate,
      isLiked: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  addingNewAppointment = filteredAppList =>
    filteredAppList.map(eachAppointment => (
      <AppointmentItem
        key={eachAppointment.id}
        eachAppointment={eachAppointment}
        isStatedAppointment={this.isStatedAppointment}
      />
    ))

  render() {
    const {title, date, isFilterActive} = this.state
    const btnStatus = isFilterActive
      ? 'filled starred-btn'
      : 'starred-btn not-filled'

    const filteredAppList = this.starredAppointments()

    return (
      <div className="bg-container">
        <div className="card-container">
          <div className="inner-container">
            <h1 className="main-heading">Add Appointment</h1>
            <div className="form-img-container">
              <form className="form-container">
                <label htmlFor="title" className="label-item">
                  TITLE
                </label>
                <input
                  id="title"
                  value={title}
                  onChange={this.getTitle}
                  className="text-input"
                  type="text"
                  placeholder="Title"
                />
                <label htmlFor="date" className="label-item">
                  DATE
                </label>
                <input
                  id="date"
                  value={date}
                  onChange={this.getDate}
                  className="text-input"
                  type="date"
                />
                <button
                  onClick={this.addAppointment}
                  type="submit"
                  className="submit-btn"
                >
                  Add
                </button>
              </form>
              <div className="image-container">
                <img
                  className="appointments-img"
                  src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                  alt="appointments"
                />
              </div>
            </div>
            <hr />
            <div className="appointments-container">
              <h1 className="appointments-side-heading">Appointments</h1>
              <button
                onClick={this.onFilter}
                type="button"
                className={btnStatus}
              >
                Starred
              </button>
            </div>
            <ul className="list-container">
              {this.addingNewAppointment(filteredAppList)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
