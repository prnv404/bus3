import app from './app'

(async function start() {
    

    try {

        app.listen(3000, () => {

            console.log("App is Listening on port 3000")

        })

        
    } catch (error) {

        console.log(error)
        
    }

})()

