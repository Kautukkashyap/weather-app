console.log('Client side javascript file is loaded')

async function main(){
    console.log('Client side javascript file is loaded')
    const weatherForm = document.querySelector('form') //it will look for form tag in index.hbs
    const serach = document.querySelector('input')
    const messageOne = document.querySelector('#message-1')
    const messageTwo =document.querySelector('#message-2')

    

    weatherForm.addEventListener('submit',async(e)=>{ //it will listen to submit event 
        e.preventDefault()
        const location = serach.value 

        messageOne.textContent = 'Loading....'
        messageTwo.textContent = ''
        
        let response =await fetch('/weather?address='+location)
        let data =await response.json()
        if (data.error){
          messageTwo.textContent = data.error
         //return console.log(data.error)
         }else{

            messageOne.textContent = data.location,
            messageTwo.textContent = data.forecast

         }
    
         
    })

}


main()