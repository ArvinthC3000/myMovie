const express = require('express')
const Joi = require('joi')
const app = express()

app.use(express.json())

const genres = [
    { id: 1, genre: 'Comedy' },
    { id: 2, genre: 'Horror' },
    { id: 3, genre: 'Sci-Fi' },
]

app.get('/', (req, res) => {
    res.send('Welcome to My Movies')
})

app.get('/api/genres', (req, res) => {
    res.send(genres)
})

app.get('/api/genres/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('Not Found')
    res.send(genre)
})

app.post('/api/genres', (req, res) => {

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre)
    res.send(genre)
})

app.put('/api/genres/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('Not Found')

    const { error } = validateCourse(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    genre.genre = req.body.genre
    res.send(genres)
})

app.delete('/api/genres/:id', (req, res) => {
    const genre = genres.find(item => item.id === parseInt(req.params.id))
    if (!genre) return res.status(404).send('Not Found')

    const index = genres.indexOf(genre)
    genres.splice(index, 1)
    res.send(genres)
})

// Validation comes through this function
function validateCourse(course) {
    const schema = {
        genre: Joi.string().min(3).required()
    }
    return Joi.validate(course, schema);
}

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log("App is listening at port ", PORT))