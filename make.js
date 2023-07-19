const connection=mysql.createConnection(
    {
        host:"localhost",
        user:"root",
        password:""


    }
)
connection.connect((err)=>{
    if(err) throw new Error(err);
    console.log("connected")
    connection.query('CREATE DATABASE IF NOT EXISTS chedi',(err)=>{
        if(err) throw new Error(err);
        console.log('database created/exists');
        connection.changeUser({database:'chedi'},(err)=>{
            if(err) throw new Error(err);
            createTable();
        })


    })

})
function createTable(){
    connection.query(`CREATE TABLE IF NOT EXISTS users(
        id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
        username VARCHAR(120),
        email VARCHAR(40),
        number INT(14),
        password VARCHAR(25)
    )`,(err)=>{
        if(err) throw new Error(err);
        console.log('Table created/exists');
    })

}
