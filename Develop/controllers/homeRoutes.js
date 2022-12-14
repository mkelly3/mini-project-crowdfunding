const router = require('express').Router();
const {Project} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const projectData = await Project.findAll({
            include: {model: user}
        });
        const projects = projectData.map((project) => project.get({ plain:true}));
        res.render('homepage', {
            projects,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }
    res.render('login');
});