const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', (req, res) => {
    console.log('rhino', req.params.id);
    const queryText = `select wishlist.wishlist_id, wishlist.title, wishlist.total from wishlist where person_id = $1`;
    pool.query( queryText, [req.params.id] )
        .then((result) => {
            console.log('Successfully got wishlists', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error getting wishlists', error);
            res.sendStatus(500);
        })
});

router.get('/items/:id', (req, res) => {
    console.log('items', req.params.id);
    const queryText = `select item.item_id, item.name, item.price, item.link, item.wishlist_id from item where wishlist_id = $1`;
    pool.query( queryText, [req.params.id] )
        .then((result) => {
            console.log('Successfully got items', result.rows);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log('Error getting items', error);
            res.sendStatus(500);
        })
});

router.post('/:id', (req, res) => {
    console.log('post wishlists');
    const queryText = `insert into wishlist (person_id, title) values ($1, $2);`;
    pool.query( queryText, [req.params.id, req.body.wishlistTitle])
        .then((result) => {
            console.log(result);
            console.log('Successfully posted new wishlist');
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});

router.post('/items/:id', (req, res) => {
    console.log('post Item');
    console.log(req.params.id, req.body.item.name, req.body.item.price, req.body.item.link);
    const queryText = `insert into item (wishlist_id, name, price, link) values ($1, $2, $3, $4);`;
    pool.query( queryText, [req.params.id, req.body.item.name, req.body.item.price, req.body.item.link])
        .then((result) => {
            console.log('Successfully posted new item');
            res.sendStatus(201);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});

router.put('/:wishlistId', (req, res) => {
    console.log('edit Tab');
    console.log(req.params.wishlistId, req.body.newTitle);
    const queryText = `update wishlist set title=$2 where wishlist_id=$1;`;
    pool.query( queryText, [req.params.wishlistId, req.body.newTitle])
        .then((result) => {
            console.log('Successfully edited tab');
            res.sendStatus(202);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

router.put('/items/:itemId', (req, res) => {
    console.log('edit Item');
    console.log(req.params.itemId, req.body.item);
    const queryText = `update item set name=$2, price=$3, link=$4 where item_id=$1;`;
    pool.query( queryText, [req.params.itemId, req.body.item.name, req.body.item.price, req.body.item.link])
        .then((result) => {
            console.log('Successfully edited Item');
            res.sendStatus(202);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

router.delete('/:wishlistId', (req, res) => {
    console.log('delete tab');
    console.log(req.params.wishlistId);
    const queryText = `delete from wishlist where wishlist_id=$1;`;
    pool.query( queryText, [req.params.wishlistId])
        .then((result) => {
            console.log('Successfully deleted tab');
            res.sendStatus(202);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
});

router.delete('/items/:itemId', (req, res) => {
    console.log('delete tab');
    const queryText = `delete from item where item_id=$1;`;
    pool.query( queryText, [req.params.itemId])
        .then((result) => {
            console.log('Successfully delete item');
            res.sendStatus(202);
        })
        .catch((error) => {
            res.sendStatus(500);
        })
})

module.exports = router;
