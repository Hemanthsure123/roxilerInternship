const express = require("express")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sqlite3 = require("sqlite3")
const { open } = require("sqlite")
const cors = require('cors');

const app = express()
app.use(express.json())

app.use(cors());






const salt = 10

const dbPath = path.join(__dirname, "users.db")

let db = null
console.log(dbPath)

const initializeDBAndServer = async() => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database,
        });
        app.listen(3000, () => {
            console.log("Server Running at http://localhost:3000/");
        });
    } catch (e) {
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
};

initializeDBAndServer();

/*app.post("/register", async(req, res) => {
    const { id, name, email, address, password, role } = req.body;
    try {
        const [rows] = await db.get('SELECT * FROM users WHERE email = ?', [email])
        if (rows.length > 0) {
            return res.status(409).json({ message: "user already existed" })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await db.run("INSERT INTO user (id,name,email,address,password,role) VALUES (?, ?, ?, ?, ?, ?)", [id, name, email, address, hashPassword, role])

        return res.status(201).json({ message: "user created successfully" })
    } catch (err) {
        return res.status(500).json(err.message)
    }
    console.log(req.body)
})
*/



/*register for the webappp*/

app.post("/register", async(request, response) => {

    const selectUserQuery = `SELECT * FROM user WHERE email = '${request.body.email}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser !== undefined) {
        response.status(400)
        response.send({ Error: "Email already exists" })
    }
    const hashedPassword = await bcrypt.hash(request.body.password, salt)
    const sql = `INSERT INTO user (name,email,password,address,role)
    VALUES(
        '${request.body.name}',
        '${request.body.email}',
        '${hashedPassword}',
        '${request.body.address}',
        '${request.body.role}'
    );

    `;

    db.run(sql)
    response.send({ Status: "Success" })
    console.log(request.body)
});



/*app.post("/register", async(request, response) => {
    response.set('content-type', 'application/json');

    const [rows] = db.get('SELECT * FROM user where email=? ', [request.body.email])
    if (rows.length > 0) {
        response.json("Email Already existed")
    }
    const hashPassword = await bcrypt.hash(request.body.password, 10)
    await db.run("INSERT INTO user (id,name,email,address,password,role) VALUES (?, ?, ?, ?, ?, ?)", [request.body.id, request.body.name, request.body.email, hashPassword, request.body.address, request.body.role])

    console.log(request.body)
})*/


/*app.post("/login", async(request, response) => {
    response.set('content-type', 'application/json');
    const { email, password, role } = request.body;
    if (!email || !password || !role) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const logindata = `SELECT * FROM user WHERE user.email='${email}'`;
    const realData = await db.get(logindata)
    if (realData) {
        const comparePassword = bcrypt.compare(password, realData[0].password)
        if (comparePassword) {
            if (request.body.role === realData[0].role) {
                response.send({ Status: "Success" })
                response.status(200)
            } else {
                response.send({ error: "No user existed with that role" })
            }
        } else {
            response.send({ error: "Password didn't matched" })
        }
    } else {
        response.send({ error: "email doesn't exist" })
    }
    console.log(request.body)
})*/

/*login to web app*/

app.post("/login", async(request, response) => {
    const { email, password, role } = request.body;
    const selectUserQuery = `SELECT * FROM user WHERE email = '${email}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        response.status(400);
        response.send("Invalid User");
    } else {
        const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
        if (isPasswordMatched === true) {
            if (role === dbUser.role) {
                response.status(200)
                const payload = {
                    email: email,
                };
                const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN");
                response.send({ jwtToken });
            } else {
                response.status(400)
                response.send("Login details doesn't match with role")
            }
        } else {
            response.status(400);
            response.send("Invalid Password");
        }
    }

    console.log(request.body)
});

/*update password*/

app.put("/update", async(request, response) => {
    const { email, password, oldpassword } = request.body;
    const newHashedPassword = await bcrypt.hash(password, salt)
    const selectUserQuery = `SELECT * FROM user WHERE email = '${email}'`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        response.status(400);
        response.send("Invalid User");
    }
    const oldPasswordStatus = await bcrypt.compare(oldpassword, dbUser.password)
    if (!oldPasswordStatus) {
        response.status(400)
        response.send("Entered wrong previous password")
    }
    const updatePasswordQuery = `
      UPDATE
        user
      SET
        password='${newHashedPassword}'
      WHERE
        email = '${email}';`;
    await db.run(updatePasswordQuery);
    response.send({ Status: "Success" });
    console.log("password succesfully updated")
});

/*post store information */
app.post("/post", (request, response) => {
    const sqlStore = `INSERT INTO store (name,image,address,description)
    VALUES(
        '${request.body.name}',
        '${request.body.image}'
        '${request.body.address}',
        '${request.body.description}',
    );

    `;

    db.run(sqlStore)
    response.send({ Status: "Success" })
});

/* get all stores*/

app.get("/store", async(request, response) => {
    const getQuery = `
        SELECT name,image,address,description FROM store;
    `;
    const getData = await db.all(getQuery)
    response.send({ getData })
})


/* get all users*/

app.get("/usercard", async(request, response) => {
    response.set('content-type', 'application/json');

    const allNameQuery = `
        SELECT name,email,address,role FROM user;
    `;
    const allNameArray = await db.all(allNameQuery);
    response.send(allNameArray)
})


/*app.get('/average-rating',async (request,response)=>{
    const averageRatingQuery=`
        SELECT AVG(rating)
        FROM rating INNER JOIN store
        ON rating.name=store.name
        GROUP BY store.name
        WHERE 
    `
})*/




/*app.get("/storecard", async(request, response) => {
    const nameQuery = `
        SELECT *
        FROM store
    `
    const nameArray = await db.all(nameQuery);
    response.send(nameArray)

})

app.post("/post", async(request, response) => {
    response.set('content-type', 'application/json');
    const sql = 'INSERT INTO store(name,image,email,address,password) VALUES (?,?,?,?,?)';
    db.run(sql, [request.body.name, request.body.image, request.body.email, request.body.address, request.body.password], );
    console.log(request.body)
});


app.post("/postuser", async(request, response) => {
    response.set('content-type', 'application/json');
    const sql = 'INSERT INTO user(name,email,address,password) VALUES (?,?,?,?)';
    db.run(sql, [request.body.name, request.body.email, request.body.address, request.body.password], );
    console.log(request.body)
});

app.get("/getuser", async(request, response) => {
    const nameQuery = `
        SELECT *
        FROM user
    `
    const nameArray = await db.all(nameQuery);
    response.send(nameArray)

})


app.put("/user/:userId/", async(request, response) => {
    const { userId } = request.params;
    const userDetails = request.body;
    const {
        updatedPassword
    } = userDetails;
    const updateUserQuery = `
      UPDATE
        user
      SET
        password='${updatedPassword}',
      WHERE
        user_id = ${userId};`;
    await db.run(updateUserQuery);
    response.send("User Password Updated Successfully");
});*/