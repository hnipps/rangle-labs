const business = require('business');
const Tech = business.models.technology;

const technologies = [];

// TECH
const react = new Tech({
    name: 'React',
});

const redux = new Tech({
    name: 'Redux',
});

const node = new Tech({
    name: 'Node',
});

const angular = new Tech({
    name: 'Angular',
});

const vue = new Tech({
    name: 'Vue',
});

const vuex = new Tech({
    name: 'Vuex',
});

const express = new Tech({
    name: 'Express',
});

const docker = new Tech({
    name: 'Docker',
});

technologies.push(react, redux, node, angular, vue, vuex, express, docker);

module.exports = technologies;
