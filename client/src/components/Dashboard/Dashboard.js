import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import './Dashboard.css';
import NavBar from '../NavBar/NavBar';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    // If shouldRedirect is true, then the user will be redirected
    // to the login page. This shouldRedirect wil be true when the 
    // user token is not present i.e when user is not logged in or
    // a user is not signed up.
    let shouldRedirect = false;
    if (localStorage.getItem('userTokenTime')) {
      // Check if user holds token which is valid in accordance to time
      const data = JSON.parse(localStorage.getItem('userTokenTime'));
      if (new Date().getTime() - data.time > (1 * 60 * 60 * 1000)) {
        // It's been more than hour since you have visited dashboard
        localStorage.removeItem('userTokenTime');
        shouldRedirect = true;
      }
    } else {
      shouldRedirect = true;
    }

    this.state = {
      redirect: shouldRedirect,
      videoList: []
    }
  }

  componentDidMount() {
    if (localStorage.getItem('userTokenTime')) {
      axios.get('http://127.0.0.1:5000/api/videolist', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userTokenTime')).token
        }
      }).then(res => {
        this.setState({
          videoList: res.data
        });
      });
    }
  }

  render() {
    if (this.state.redirect) return <Redirect to="/signIn" />

    const videos = this.state.videoList.map(video => {
      return (
        <div className="video col-xs-12 col-sm-12 col-md-3 col-lg-4" key={video._id}>
          <Link to={'/video/' + video.upload_title}>
            <div className="video-thumbnail">
              <img src={video.thumbnail_path} alt="video thubmnail" />
            </div>
          </Link>
          <span className="username">
            <Link to={'/api/videos/' + video.upload_title}>
              {video.uploader_name}
            </Link>
          </span>
          <span className="video-title">{video.upload_title.replace(/_/g, ' ')}</span>
        </div>
      );
    });

    return (
      <React.Fragment>
        <NavBar />
        <div className="container mt-5">
          <h2>Videos</h2>
          <div className="streams row">
            {videos}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;