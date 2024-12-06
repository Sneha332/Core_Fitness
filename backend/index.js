const express=require("express")
const cors=require("cors");
const {connection}=require("./config/db")
const { trainerRouter } = require("./Routes/trainer.route")
const {bookingRoutes}=require("./Routes/bookingRoutes")
const {signupRoute}=require("./Routes/signupRoute")

require("dotenv").config()
function showForm(planType) {
    document.getElementById('trial-form').style.display = 'block';
    document.getElementById('membership').value = planType;
}

document.getElementById('free-trial-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    document.getElementById('free-trial-form').style.display = 'none'; // Hide the form
    document.getElementById('success-message').style.display = 'Registration Successful'; // Show success message
})



const app=express()
app.use(cors({
    origin:"*"
}))
app.use(express.json())

app.use("/user",signupRoute)
app.use("/trainer",trainerRouter)
app.use("/booking",bookingRoutes)


app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${process.env.port}`)
})

