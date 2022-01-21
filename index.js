const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const fileUpload = require('express-fileupload');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json())

app.use(fileUpload())

let courses = [
    {
        id: "1",
        name: "Learn Reactjs",
        price: 1000
    },
    {
        id: "2",
        name: "Learn Nextjs",
        price: 1000
    },
    {
        id: "3",
        name: "Learn Nodejs",
        price: 1000
    }
]

app.get('/', (req, res) =>{
    res.send("<h1>hello </h1>")
});

app.get('/api/v1/apidocs', (req, res) =>{
    res.send("<h1>hello apidocs</h1>");
});

app.get('/api/v1/someobject', (req, res) =>{
    res.status(200).json({ id: "01",name: "Learn Backend",price: "1000" });
});

app.get('/api/v1/courses', (req, res) =>{
    res.send(courses);
});

app.get('/api/v1/mycourse/:courseId', (req, res) =>{
    const myCourse = courses.find(course=>course.id === req.params.courseId)
    res.send(myCourse);
})

app.post('/api/v1/addcourse',(req,res)=>{
    courses.push(req.body)
    res.send(true)
})

app.post('/api/v1/courseupload',(req,res)=>{
    console.log(req.headers)
    const file = req.files.file
    let path = __dirname + "/images/" + Date.now() + ".jpg"
    file.mv(path,(err)=>{
        if(err) res.status(404);
        else res.send(true)
    }) 
})

app.get('/api/v1/coursequery', (req, res) =>{
    let location = req.query.location;
    let device = req.query.device;
    res.send({location,device});

})

app.listen(port, () => console.log(`Apidocs app listening on port ${port}!`));
