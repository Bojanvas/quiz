var express = require('express');

var handlebars = require('handlebars');
var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');
var sm = require('sitemap')
var sitemap = sm.createSitemap({
    hostname: 'funquiz.xyz',
    cacheTime: 600000, // keep 24 hours sitemap
    url: [
        { url: '/quizzes/' },
        { url: '/games/' },
        { url: '/parts/quizzes/geo.html' }
    ]
})
var xml = sitemap.toString();
var router = express.Router();

mongoose.connect('mongodb://bojan:bojan.1987@ds145039.mlab.com:45039/games');


var gameSchema = mongoose.Schema({
    href: String,
    tags: String,
    img: String,
    title: String,
    text: String
}, { collection: "game" })
gameSchema.plugin(mongoosePaginate);

var quizzesSchema = mongoose.Schema({
    href: String,
    tags: String,
    img: String,
    title: String,
    text: String
}, { collection: "quizzes" })
quizzesSchema.plugin(mongoosePaginate);


var Game = mongoose.model('Game', gameSchema);
var Quizzes = mongoose.model('Quizzes', quizzesSchema);



router.get('/games', function(req, res, next) {
    var query = { tags: 'games' };
    var options = {
        sort: { _id: -1 },
        limit: 4,
        page: req.query.page
    }
    Game.paginate(query, options).then(function(result) {

        res.render('partials/page', {
            games: result.docs

        })
    }, function(err) { res.sendStatus(400) });



});
router.get('/quizzes', function(req, res, next) {
    var query = { tags: 'quizzes' };
    var options = {
        sort: { _id: -1 },
        limit: 4,
        page: req.query.page
    }
    Game.paginate(query, options).then(function(results) {
        res.render('partials/quizzes', {
            quizzes: results.docs
        })
    }, function(err) { res.sendStatus(400) })
})



router.use(function timeLog(req, res, next) {
        console.log('Time', Date.now);
        next();
    })
    // define the home page route
router.get('/', function(req, res) {
    var query = {};
    var options = {
        sort: { _id: -1 },
        limit: 4,
        page: req.query.page
    }
    Game.paginate(query, options).then(function(results) {
        res.render('partials/quizzes', {
            quizzes: results.docs
        })
    }, function(err) { res.sendStatus(400) })
})

router.get('/page:id', function(req, res) {
    var id = req.params.id;
    res.render('partials/page' + id, {
        class: 'active'
    });
    console.log('page1');
})
router.get('/page:id/active', function(req, res) {
    var id = req.params.id;
    res.send(id);


})
router.get('/sitemap.xml', function(req, res) {
    generate(res);

})
router.get('/BingSiteAuth.xml', function(req, res) {
    res.sendFile(__dirname + '/BingSiteAuth.xml');
})

function generate(res) {
    var urls = ['/quizzes', '/games', "/parts/quizzes/geo.html", "/parts/quizzes/ancinet.html", "/parts/quizzes/geography.html", "/parts/games/gods.html", "/parts/games/politic.html", "/parts/games/past.html", "/parts/games/football.html", "/parts/games/centry.html", "/parts/games/empire.html", "/parts/games/rule.html", "/parts/games/ideology.html"];
    var root_path = 'http://www.funquiz.xyz';
    var priority = 0.5;
    var freq = 'monthly';
    var xml = '<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    for (i in urls) {
        xml += '<url>';
        xml += '<loc>' + root_path + urls[i] + '</loc>';
        xml += '<changefreq>' + freq + '</changefreq>';
        xml += '<priority>' + priority + '</priority>';
        xml += '</url>';

        i++
    }
    xml += "</urlset>";

    res.header('Content-Type', "text/xml");
    res.send(xml);
}
module.exports = router;