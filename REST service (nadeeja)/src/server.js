const express = require('express');
const mongoDB = require('mongodb');


const app = express();

const running_port = 3030;
const dbUrl ="mongodb://localhost:27017";

app.listen(running_port,()=>console.log("server is running on port 3030"));

app.get('/', (req, res) => {
    res.send({work:"done"});
});

// app.get('/topping', (req, res) => {
//     res.send("There are no toppings yet!");
// });

//  app.get('/do', (req,res) => {
//     res.send(req.query.id);
//  });

//  app.get('/nadeeja', (req,res) => {
//     res.send(req.query.param3);
//  });

//  app.post('/banana', (req,res) => {
//     res.send(req.query.name);
//  }) 

 app.post('/insertFros', (req, res) =>{

    var item = {
        fros_no: req.query.id,
        fros_name: req.query.name,
        a_choco: req.query.choco,
        a_van: req.query.van,
        a_redv: req.query.redv,
        fros_price: req.query.price,
        fros_pic: req.query.url,
        fros_des: req.query.des
    }

    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        client.db("cakeDB").collection("cr_frosting").insertOne(item, () => {
            res.send(req.query);
        });
        console.log(item);
    })
});

app.post('/insertTop', (req, res) =>{

    var item = {
        top_no: req.query.id,
        top_name: req.query.name,
        a_choco: req.query.choco,
        a_van: req.query.van,
        a_redv: req.query.redv,
        top_price: req.query.price,
        top_pic: req.query.url,
        top_des: req.query.des
    }

    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        client.db("cakeDB").collection("cr_topping").insertOne(item, () => {
            res.send(req.query);
        });
    })
});


app.post('/insertCalssicCake', (req, res) =>{

    var item = {
        size: req.query.size,
        shape: req.query.shape,
        flavour: req.query.flavour,
        frosting: req.query.frosting,
        topping: req.query.topping,
        pic: req.query.pic,
        price: req.query.price
    }

    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        client.db("cakeDB").collection("classic_cakes").insertOne(item, () => {
            res.send(req.query);
        });
    })
});

app.delete('/deleteTop', (req,res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        client.db("cakeDB").collection("cr_topping").remove({"top_no": null}) 
    })
});

app.get('/getFrosting', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_frosting").find().forEach( (data) => {
            arr.push(data.fros_name);
        }, () => {
            res.send(arr);
        });
    })
}); 

app.get('/getTopping', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_topping").find().forEach( (data) => {
            arr.push(data.top_name);
        }, () => {
            res.send(arr);
        });
    })
}); 

app.get('/getClassicCake', (req, res) => {

    var item = {
        size: req.query.size,
        shape: req.query.shape,
        flavour: req.query.flavour,
        frosting: req.query.frosting,
        topping: req.query.topping
    }
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("classic_cakes").find({"size":item.size, "shape":item.shape, "flavour":item.flavour, "frosting":item.frosting, "topping":item.topping}).forEach( (data) => {
            arr.push(data);
        }, () => {
            res.send(arr);
        });
    })
});

app.get('/getFrosChoco', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_frosting").find({"a_choco":"True"}).forEach( (data) => {
            arr.push(data);
        }, () => {
            res.send(arr);
        });
    })
});

app.get('/getFrosVan', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_frosting").find({"a_van":"True"}).forEach( (data) => {
            arr.push(data);
        }, () => {
            res.send(arr);
        });
    })
});

app.get('/getFrosRedv', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_frosting").find({"a_redv":"True"}).forEach( (data) => {
            arr.push(data);
        }, () => {
            res.send(arr);
        });
    })
});

app.get('/getTopChoco', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_topping").find({"a_choco":"True"}).forEach( (data) => {
            arr.push(data);
        }, () => {
            res.send(arr);
        });
    })
});

app.get('/getTopVan', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_topping").find({"a_van":"True"}).forEach( (data) => {
            arr.push(data);
        }, () => {
            res.send(arr);
        });
    })
});

app.get('/getTopRedv', (req, res) => {
    mongoDB.connect(dbUrl,{ useNewUrlParser: true }, (err, client) => {
        arr = [];
        client.db("cakeDB").collection("cr_topping").find({"a_redv":"True"}).forEach( (data) => {
            arr.push(data);
        }, () => {
            res.send(arr);
        });
    })
});
