require('dotenv').config();
const express=require('express');
const app=express();

const db=require('./config/db');

const libraryModel=require('./models/libraryDetails');


// const bodyParser=require('body-parser');
app.use(express.json());//stores the data in req.body
app.use(express.urlencoded({extended: true}));

// Set EJS as view engine
app.set('view engine', 'ejs');

// Home route
app.get('/', (req, res) => {
    res.render('index');
});

// View all books
app.get('/books', async (req, res) => {
    try {
        const books = await libraryModel.find();
        res.render('view', { books });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error fetching books");
    }
});

// Add book routes
app.get('/books/add', (req, res) => {
    res.render('add');
});

app.post('/books/add', async (req, res) => {
    try {
        const data = req.body;
        const mainLibrary = new libraryModel(data);
        await mainLibrary.save();
        console.log('Book saved in db');
        res.redirect('/books');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error saving book");
    }
});

// Update book routes
app.get('/books/update', async (req, res) => {
    try {
        const books = await libraryModel.find();
        res.render('update', { books });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading update page");
    }
});

app.get('/books/update/:id', async (req, res) => {
    try {
        const book = await libraryModel.findById(req.params.id);
        res.render('update', { book });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading book to update");
    }
});

app.post('/books/update', async (req, res) => {
    try {
        const { id, name, author, category, price, quantity } = req.body;
        await libraryModel.findByIdAndUpdate(id, {
            name,
            author,
            category,
            price: Number(price),
            quantity: Number(quantity)
        });
        console.log('Book updated in db');
        res.redirect('/books');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error updating book");
    }
});

// Delete book routes
app.get('/books/delete', async (req, res) => {
    try {
        const books = await libraryModel.find();
        res.render('delete', { books });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error loading delete page");
    }
});

app.post('/books/delete', async (req, res) => {
    try {
        const { id, name } = req.body;
        if (id) {
            await libraryModel.findByIdAndDelete(id);
            console.log('Book deleted by ID');
        } else if (name) {
            await libraryModel.deleteMany({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
            console.log('Book(s) deleted by Name');
        }
        res.redirect('/books');
    } catch (err) {
        console.log(err);
        res.status(500).send("Error deleting book");
    }
});

// Search book routes
app.get('/books/search', async (req, res) => {
    try {
        const query = req.query.query;
        if (query) {
            const regex = new RegExp(query, 'i');
            const results = await libraryModel.find({
                $or: [
                    { name: regex },
                    { author: regex },
                    { category: regex }
                ]
            });
            res.render('search', { results, query });
        } else {
            res.render('search');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error searching books");
    }
});


// Legacy API endpoints (kept for backward compatibility)
app.post('/lib', async (req,res)=>{
    try{
        const data=req.body;
        const mainLibrary=new libraryModel(data);
        const response= await mainLibrary.save();

        console.log('data saved in db');
        res.status(200).json(response);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"error in internal server"});
    }
});

app.get('/lib',async (req,res)=>{
    try{
        const data= await libraryModel.find();
        console.log("data fetched");
        res.status(200).json(data);

    }catch(err){
        console.log(err);
        res.status(500).json({error:"internal server error"});
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


