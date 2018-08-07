import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './ProjectDetail.scss';
import axios from 'axios';
import ProjectStatus from '../ProjectStatus/ProjectStatus';
import DifficultyPips from '../DifficultyPips/DifficultyPips';
import TeamListing from '../TeamListing/TeamListing';

class ProjectDetail extends Component {
    state = {
        project: null
      };

    componentDidMount() {
    }

    getProject = async (project_id) => {
        const res = await axios.get(`/projects/${project_id}`)
        return res.data;
    }

    async componentDidMount() {
        const { project_id } = this.props.match.params;
        const project = await this.getProject(project_id);
        this.setState({ project });
    }

    render () {
        const { project } = this.state;

        if (!this.state.project) return <div className="loading">Loading</div>;

        return (
            <div className="project-box">
                <div className="project-details">
                    <h3>{project.title}</h3>
                    <ProjectStatus status={project.status} />
                    <DifficultyPips difficulty={project.difficulty} />
                    <p>{project.description}</p>
                    <TeamListing teamMembers={project.agents} />
                </div>
            </div>
        )
    }
}

export default ProjectDetail;
