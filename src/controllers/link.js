const express = require('express');

const { Link } = require('../models');

const router = express.Router();

router.get('/', async (req, res) => {
    const { accountId } = req;
    const link = await Link.findAll({ where: { accountId } });

    return res.jsonOK(link);
});

router.get('/:id', async (req, res) => {
    const { accountId } = req;
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId } });

    if (!link) return res.jsonNotFound();
    return res.jsonOK(link);
})

router.post('/', async (req, res) => {
    const { accountId, body } = req;

    const { label, url, isSocial } = body;

    const image = 'https://images.unsplash.com/photo-1531001142232-7d7aac16a63e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80';

    const link = await Link.create({ label, url, isSocial, image, accountId });

    return res.jsonOK(link);
});

router.put('/:id', async (req, res) => {
    const { accountId, body } = req;
    const { id } = req.params;
    const fields = ['label', 'url', 'isSocial'];

    const link = await Link.findOne({ where: { id: id, accountId: accountId }});

    if (!link) return res.jsonNotFound();

    fields.map(fieldName => {
        const newValue = body[fieldName];
        if(newValue != undefined) link[fieldName] = newValue;
    });

    await link.save();

    return res.jsonOK(link);


})

router.delete('/:id', async (req, res) => {
    const { accountId } = req;
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId } });
    if (!link) return res.jsonNotFound();
    await link.destroy();
    return res.jsonOK();
})

module.exports = router;