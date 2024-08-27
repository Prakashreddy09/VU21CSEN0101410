

    import express from 'express';


    const app = express();
    PORT = process.env.PORT || 3000

    app.listen(PORT, () =>[
        console.log("The server is up and running.")
    ])
