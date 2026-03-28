import express from 'express';

const router = new express.Router();

router.get('/', (req, res) => {
    res.send('Hello from GET');
});

router.post('/', (req, res) => {
    res.send('Hello from POST');
});

router.put('/', (req, res) => {
    res.send('Hello from PUT');
});

router.delete('/', (req, res) => {
    res.send('Hello from DELETE');
});


export default router;