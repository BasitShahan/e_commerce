const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const nodemailer=require('nodemailer')
const jwt = require('jsonwebtoken')
const Register=require('./schema/schema')

const stripe = require('stripe')('sk_test_51NjEEMKXgDwKPURwSYM6rh3rFVEU80cHZbgiKhXlK2jQoVTau5VasFsOUnNw6rKuvGGwYYOqlON3fBj0eeLtYTRz003n3SXOOK');
const cors = require('cors');
const dotenv=require('dotenv');
dotenv.config({path:'./dotenv/.env'})
console.log(process.env.CONN)

const conn=require('./conn/conn');
const path = require('path');


// Middlewares
app.use(cors({
    origin: process.env.BASE_URL,
    credentials: true
}));



app.use(express.json());

app.use(express.static(path.join(__dirname, '../client/dist/')));



app.get('*',function(_,res){
    res.sendFile(path.join(__dirname, '../client/dist/assets/index-24cb299f.js'), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
    
})


// Routes



app.post('/register', async (req, res) => {
    console.log(req.body);
const { email, password } = req.body;

try {
    // Check if the email is already registered
    const existingUser = await Register.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json('Email is already registered');
    }

    // Create a new user in the database
    const newUser = new Register(req.body)
                                    

    await newUser.save();

    return res.status(200).json('Registration successful');
} catch (error) {
    console.error(error);
    return res.status(500).json('An error occurred during registration');
}
});


app.post('/login',async (req,res)=>{
console.log(req.body);
try {
    if(req.body){
        const  validEmail=await Register.findOne({email:req.body.email})
        if (validEmail) {
             return res.status(200).json("valid user")
        }
        else {
        return res.status(400).json('invalid user')
        }
    }
} catch (error) {
     console.log(error)
     return res.status(400).json(error)
}
})




app.post('/forget-password', async (req, res) => {
    const { email } = req.body;
    console.log(email)
    if (email) {
        try {
            const foundUser = await Register.findOne({ email: email });
            if (!foundUser) {
                return res.status(201).json('User does not exist');
            } else {
                const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY, { expiresIn: '1d' });
                     
                 
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'alibasit123789@gmail.com',
                        pass: 'ntekkcxjasdytzzy'
                    }
                });

                const mailOptions = {
                    from: email,
                    to: 'alibasit123789@gmail.com',
                    subject: 'Reset your password',
                    text: `${process.env.BASE_URL}/reset-password/${foundUser._id}/${token}`
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                        return res.status(500).json('Error sending email');
                    } else {
                        console.log('Email sent: ' + info.response);
                        return res.status(200).json('Success');
                    }
                });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json('Error processing request');
        }
    } else {
        return res.status(400).json('Invalid request');
    }
});

app.post('/update/:id', async (req, res) => {
    
  const {id} =req.params; 
  try {
        if (req.body) {
            
            const updatedPassword = await Register.findByIdAndUpdate({_id:id}, {
                

                $set: {
                    password: req.body.password,
                    cpassword: req.body.cpassword
                }
            }, { new: true });

            if (updatedPassword) {
                console.log(`password updated successfully ${updatedPassword}`)
                return res.status(200).json({ message: 'password updated successfully' });
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'An error occurred' });
    }
});




app.post('/api/create-checkout-session', async (req, res) => {
    const { product } = req.body;
    
  console.log(product)
const  lineitem=product.map((value)=>({
    
    price_data:{
       currency:'pkr',
       product_data:{
        name:value.dish
       },
       unit_amount:value.price*100
     },
     quantity:value.qnty,
}))

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineitem,
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/succes`,
            cancel_url: `${process.env.BASE_URL}/fail`,
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while creating the payment session.' });
    }
});

app.listen(port, () => {
    console.log(`Server is listening at ${port}`);
});


