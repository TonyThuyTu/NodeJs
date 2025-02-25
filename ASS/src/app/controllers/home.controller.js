class HomeController {
    index(req, res) {
        res.render('home', { title: 'Home' });
    }
    about(req, res) {
        res.render('about', { title: 'About Us' });
    }
}

module.exports = new HomeController();