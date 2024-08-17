import {Component} from 'react'
import Loader from 'react-loader-spinner'
import '../App.css'

class Details extends Component {
  state = {isLoading: true, courses: {}, error: false, retry: false}

  componentDidMount() {
    this.getData()
  }

  handleRetry = () => {
    this.setState({retry: true}, () => {
      this.getData()
    })
  }

  getData = async () => {
    const {match} = this.props
    const {id} = match.params

    const resp = await fetch(`https://apis.ccbp.in/te/courses/${id}`)
    const data = await resp.json()
    if (resp.ok) {
      this.setState({
        isLoading: false,
        courses: data.course_details,
        retry: false,
      })
    } else {
      this.setState({
        isLoading: false,
        courses: {},
        error: true,
        retry: false,
      })
    }
  }

  render() {
    const {isLoading, courses, error, retry} = this.state
    console.log(retry)
    return (
      <div>
        <h1>Courses</h1>

        {isLoading ? (
          <div data-testid="loader">
            <Loader type="ThreeDots" width={200} height={50} />
          </div>
        ) : (
          <ul>
            <li key={courses.id}>
              <img src={courses.image_url} alt={courses.name} />
              <div>
                <h1>{courses.name}</h1>
                <p className="description">{courses.description}</p>
              </div>
            </li>
          </ul>
        )}

        {error && (
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
              alt="failure view"
            />
            <h1>Oops! Something Went Wrong</h1>
            <p>We cannot seem to find the page you are looking for.</p>
            <button onClick={this.handleRetry} type="button">
              Retry
            </button>
          </div>
        )}
      </div>
    )
  }
}

export default Details
