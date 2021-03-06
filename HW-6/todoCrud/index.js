import express from 'express'
import { JSON_PATH } from "./constants.js";
import fs from 'fs/promises'
import path from 'path';
import Joi from 'joi'
import { v4 as uuidv4 } from 'uuid';
import { remaind } from './remainder.js';
import cors from 'cors'
import { clearTimeout } from 'timers';
// Creating application
const app = express();
app.use(express.json()); 
app.use(cors({origin: '*'}));
// get 
// get all
app.get('/todos', (req, res, next) => {
    fs.readFile(path.resolve(JSON_PATH), 'utf-8')
    .then(data => {
        if (!data)
            throw(`There is no todo list...`)
        res.send(JSON.parse(data))
    })
    .catch(err => next(err))
})
// get by id
app.get('/todos/:id', (req, res, next) => {
    fs.readFile(path.resolve(JSON_PATH), 'utf-8')
    .then(data => {
        if (!data)
            throw(`There is not todo with id: ${req.params.id}`)
        let jsonData = JSON.parse(data);
        const filtered = jsonData.filter(el => el.id === req.params.id)
        if (!filtered.length)
            throw(`There is not todo with id: ${req.params.id}`)
        res.send(filtered);
    })
    .catch(err => next(err))
})

// Create method
app.post('/todos', (req, res, next) => {
    // Validation pat will be in front (so here we can be shure that the todo task is valid)
    const schema = Joi.object().keys({ 
        description: Joi.string().min(3).max(150).required(),
        remaindAt: Joi.string().min(29).max(30).required(), 
        status: Joi.required()
      }); 
    const result = schema.validate(req.body);
    if (result.error || typeof(Date.parse(req.body.remaindAt)) != 'number')
        throw ("The information is not valide, check your input !");
    const id = uuidv4();
    fs.readFile(path.resolve(JSON_PATH), 'utf-8')
    .then(data => {
        let jsonData;
        if (!data)
            jsonData = [];
        else {
            jsonData = JSON.parse(data);
        }
        const newData = req.body;
        newData['id'] = id;
        newData['createdAT'] = new Date().toUTCString();
        newData['updateedAt'] = new Date().toUTCString();
        if ( newData['status'] === 'done')
            newData['done'] = true;
        else
            newData['done'] = false;

        const timeInterval = Date.parse(req.body.remaindAt) - Date.parse(newData['createdAT']) - 120000;
        if (typeof(timeInterval) != 'number')
            throw ("Something get wrong...");
        if (timeInterval > 0){
            const timeId = setTimeout(() => {
                if (newData['done'] != true)
                    remaind(newData);
            }, timeInterval);
            newData["timerId"] = Number(timeId);
        } else {
            newData["timerId"] = undefined;
            newData['status'] = 'done';
            newData['done'] = true;
        }
        jsonData.push(newData);
        fs.writeFile(JSON_PATH, JSON.stringify(jsonData, null, 2))
        .then(res.send(`The remainder successfully created with id: ${id}`))
        .catch(error => next(error))
    })
    .catch(error => next(error))
});

// Delete method
app.delete('/todos', (req, res, next) => {
    fs.readFile(path.resolve(JSON_PATH), 'utf-8')
    .then(data => {
        if (!data)
            throw(`There is no todo list...`)
        let jsonData = JSON.parse(data); 
        let filteredIndex;
        jsonData.forEach((element, index) => {
            if (element.id === req.body.id){
                filteredIndex = index;
            }
        });
        if (filteredIndex === undefined)
            throw(`Something went wrong, There is not remainder with id: ${req.body.id}`);
        if(jsonData[filteredIndex].timerId != undefined)
            clearTimeout(jsonData[filteredIndex].timerId);
        jsonData.splice(filteredIndex, 1);
        fs.writeFile(JSON_PATH, JSON.stringify(jsonData, null, 2))
        .then(res.send(`The remainder successfully deleted with id: ${req.body.id}`))
        .catch(error => next(error))
    })
    .catch(err => next(err))
});

// update method
app.put('/todos', (req, res, next) => {
    fs.readFile(path.resolve(JSON_PATH), 'utf-8')
    .then(data => {
        const schema = Joi.object().keys({ 
            id: Joi.string().required(),
            description: Joi.string().min(3).max(150).required(),
            remaindAt: Joi.string().min(29).max(30).required(), 
            status: Joi.required()
          }); 

        const result = schema.validate(req.body);
        if (result.error || typeof(Date.parse(req.body.remaindAt)) != 'number')
            throw ("The information is not valide, check your input !");
        if (!data)
            throw(`There is no todo list...`)
        let jsonData = JSON.parse(data); 
        let filteredIndex;
        jsonData.forEach((element, index) => {
            if (element.id === req.body.id){
                filteredIndex = index;
            }
        });
        if (filteredIndex === undefined)
            throw(`Something went wrong, There is not remainder with id: ${req.body.id}`);
        if (!jsonData[filteredIndex].done && jsonData[filteredIndex].timerId != undefined){
            clearTimeout(jsonData[filteredIndex].timerId);
        }
        jsonData[filteredIndex].updateedAt = new Date().toUTCString();
        if (req.body.status === 'done')
            jsonData[filteredIndex].done  = true;
        else
            jsonData[filteredIndex].done  = false;
        const timeInterval = Date.parse(req.body.remaindAt) - Date.parse(jsonData[filteredIndex].updateedAt) - 120000;
        if (typeof(timeInterval) != 'number')
            throw ("Something get wrong...");
        if (timeInterval > 0){
            jsonData[filteredIndex].status = req.body.status;
            const timeId = setTimeout(() => {
                if (jsonData[filteredIndex].done != true)
                    remaind(newData);
            }, timeInterval);
            jsonData[filteredIndex].timerId = Number(timeId);
        } else {
            console.log(timeInterval)
            jsonData[filteredIndex].timerId = undefined;
            jsonData[filteredIndex].status = 'done';
            jsonData[filteredIndex].done = true;
        }
        
        jsonData[filteredIndex].description = req.body.description;
        jsonData[filteredIndex].remaindAt = req.body.remaindAt;
       
        fs.writeFile(JSON_PATH, JSON.stringify(jsonData, null, 2))
        .then(res.send(`The remainder successfully updated with id: ${req.body.id}`))
        .catch(error => next(error))
    })
    .catch(err => next(err))
});

app.use((req, res) => {
    res.status(404).send("Not found"); // html not found
})

app.use((err, req, res, next) => {
    console.log(err);
    res.send(err);
})


// Listening to the port 
app.listen(process.env.PORT || 5000, function() {
    console.log(`Server started on port: ${this.address().port}...`)
})


