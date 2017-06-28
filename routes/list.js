var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('contactDatabase', ['list']);

//get all items of the list
router.get('/list', function(req, res, next){
   console.log('get all list items is working');
    db.list.find(function(err, list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
});

//get one item from the list
router.get('/list/:id', function(req, res, next){
   console.log('get one list item is working');
    db.list.findOne({_id: mongojs.ObjectId(req.params.id)},function(err, list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
});
    

//save list item
router.post('/list', function(req, res, next){
    console.log('save is working');
    var list = req.body;
    if(!list.name || !list.email || !list.pnumber){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.list.save(list, function(err, list){
            if(err){
                res.send(err);
            }
            res.json(list)
        });
    }
})


//delete list
router.delete('/dellistItem/:id', function(req, res, next){
   console.log('delete is working');
    db.list.remove({_id: mongojs.ObjectId(req.params.id)},function(err, list){
        if(err){
            res.send(err);
        }
        res.json(list);
    });
});

//update a perticular item. 

router.put('/updateItem/:id', function(req, res, next){
    console.log('update is working is working');
    var list = req.body;
    var uplist = {};
    
    if(list.name){
        uplist.name = list.name;
    }
    if(list.email){
        uplist.email = list.email;
    }
    if(list.pnumber){
        uplist.pnumber = list.pnumber;//database = angular
    }
    
    if(!uplist){
        res.status(400);
        res.json({"error":"Bad Data"});
    }else{
        db.list.update({_id: mongojs.ObjectId(req.params.id)}, uplist,  function(err, list){
        if(err){
            res.send(err);
        }
            res.json(list)
        });
    }
    
    });



module.exports = router;