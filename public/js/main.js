


const weatherForm = document.querySelector("form");
const searchQuery = document.querySelector("input");

const weatherContent= document.querySelector(".weather-content");
const weatherMsgOne = document.querySelector("#w-msg-one");
const weatherMsgTwo = document.querySelector("#w-msg-two");


weatherForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    weatherMsgOne.textContent = "Loading"
    weatherMsgTwo.textContent = " "

    weatherContent.classList.remove("showing")
    weatherContent.classList.remove("error")




    fetch(`/weather?address=${searchQuery.value}`).then((res)=>{
        res.json().then((data)=>{
            if (data.error){
                weatherContent.classList.toggle("error")
                weatherContent.classList.toggle("showing")

                weatherMsgOne.textContent = data.error
            }else{
                weatherContent.classList.toggle("showing");
                weatherMsgOne.textContent = data.place_name
                weatherMsgTwo.textContent = data.forecast

            }
        })
    })
})