import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Search from '../Search/Search';
// import axios from 'axios';
// import './Artists.scss';

// import { formatYear } from '../../helpers';

class ProjectListing extends Component {

  async componentDidMount() {
    this.props.refreshProjects();
  }

  renderProjectDifficulty = (difficulty) => {
    const pips = [];

    for(let i = 0; i < difficulty; i++) {
    const pip = (<div className='pip'></div>);
      pips.push(pip);
    }

    return pips;
  }

  render () {
    return (
      <div className="projects-root">
        <h2>Projects</h2>
        {/* <Search onSearchChange={(e) => this.props.onSearchChange(e)} placeholder="Search for an artist"/> */}
        <div className="projects-container">
          {this.props.projects.map(project => {
            return (
            //   <Link to={`/projects/${project._id}`}>
                <div className="project-box">
                  <div className="project-details">
                    <h3>{project.title}</h3>
                    <div className="project-difficulty">
                      {this.renderProjectDifficulty(project.difficulty)}
                    </div>
                    <p>{project.description}</p>
                  </div>
                </div>
            //   </Link>
              
      
            );
          })}
        </div>
      </div>
    )
  }
}

export default ProjectListing;