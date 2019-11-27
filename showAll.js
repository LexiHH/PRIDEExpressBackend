var express=require("express")
var app=express()
var MYSQL=require('./PRIDEdbConnection')
var con=MYSQL()
var cors=require('cors')
var bodyparser=require('body-parser')

var app=express()
app.set('view engine','ejs')
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))

app.get('/findAllCardsThisMonth',function(req,res){
	var query=`Select * from Cards where month(senddate) = month(now())`
	con.query(query,function(err,result){
		console.log(result)
		if(err){
			console.log(err)
		}
		else{
			res.send(result)
		}
	})
})

app.get('/findAllCardsThisEmployee/:n',function(req,res){
	var rempno= req.params.n
	var query=`Select * from Cards where rempno='${rempno}'`
	con.query(query,function(err,result){
		console.log(result)
		if(err){
			console.log(err)
		}
		else{
			res.send(result)
		}
	})
})

app.post('/newCard',function(req,res){
	var rempno=req.body.rempno
	var rname=req.body.rname
	var rmempno=req.body.rmempno
	var sempno=req.body.sempno
	var sname=req.body.sname
	var category=req.body.category
	var senddate=req.body.senddate
	var message=req.body.message
	var picurl=req.body.picurl
	var query=`insert into Cards values('${rempno}','${rname}','${rmempno}','${sempno}','${sname}','${category}','${senddate}','${message}','${picurl}')`
	con.query(query,function(err,result){
		if(err){
			console.log(err)
		}
	})
})


app.listen(8000)