console.log("hello")

fetch("http://localhost:3000/api/users/profile",{
    method:"GET",
   
    headers:{
        "authorization":`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImpvZSIsInVzZXJJZCI6MSwiaWF0IjoxNjg1MTIyMzk4LCJleHAiOjE2ODUxMjk1OTh9.N8a8O4TvG_u_B-6rHaG4s3k-RGz2lNyUxkKqKQjBHEw`
    }
}).then(res=>res.json()).then(data=>{
    console.log(data)
}).catch(err=>{
    console.log(err)
})