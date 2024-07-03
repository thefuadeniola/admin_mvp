import axios from "axios"

export default async function handler(req, res) {
try{
    const data = await axios.post('https://cargo-run-backend.onrender.com/api/v1/order/dashboard/analysis' ,headers)
    res.status(200).json(data)
    } catch (error) {
    console.error(error)
    return res.status(error.status || 500).end(error.message)
    }
}