
// express 모듈을 사용하기위한 초기설정
var express=require('express')
var app=express()
//file system을 사용하기 위함
var fs = require('fs')

//jade파일의 줄바꿈을 위함
app.locals.pretty=true

//post를 사용하기 위한 middleware setting
var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:false}))

//정적인 파일을들을 public폴더에서 관리
app.use(express.static('public'))

//jade와 express를 연결해줌
app.set('view engine','jade')
app.set('views','./views')

//앱의 포트를 지정해준다
var port=5000
app.listen(port,()=>{
    console.log(`app listening at http://localhost:${port} :)`)    
})

var mysql= require('mysql')
var conn= mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'123456',
    database:'o2'
})
conn.connect()

//새로운 내용추가
app.get('/new',function(req,res){
    res.render('add_new')
})
//id title description author(id는 자동인덱싱)
//메인 화면(main.jade로 rendering)
app.get(['/','/:id'],function(req,res){
    var sql='select id,title from topic'
    conn.query(sql,function(err,topics,fields){
        var id=req.params.id
        if(id){
            var sql = 'select * from topic where id=?'
            conn.query(sql,id,function(err,topic,fields){
                if(err){
                    console.log(err)
                }
                else{
                    res.render('main',{topics:topics,topic:topic[0]})
                }
            })
        }
        else{
            res.render('main',{topics:topics})
        }
    })
})

app.get('/:id/edit',function(req,res){
    var id=req.params.id
    var sql='select * from topic where id=?'
    conn.query(sql,id,function(err,topic,fields){
        if(err){
            console.log(err)
        }
        else{
            res.render('edit',{topic:topic[0]})
        }
    })
})
//post형식으로 입력받은 데이터를 data폴더에 제목은 title,내용은 description으로 저장하고,
//성공시 main화면으로 돌아가는 버튼을 만들어준다
app.post('/new',function(req,res){
    var title=req.body.title
    var description=req.body.description
    var author=req.body.author
    console.log(title,description,author)
    var sql='INSERT INTO topic (title,description,author) values(?,?,?)'
    conn.query(sql,[title,description,author],function(err,result,fields){
        if(err){
            res.status(500).send('Internal server erswror')
        }
        else{
            res.redirect('/'+result.insertId)
        }

    })
    })
    app.get('/:id/delete',function(req,res){
        var id=req.params.id
        var sql='delete from topic where id=?'
        conn.query(sql,id,function(err,topic,fields){
            if(err){
                console.log(err)
            }
            else{
                
                res.redirect('/')
            }
        })
    })
    app.post('/:id/delete',function(req,res){
        var id=req.params.id
        var sql='delete from topic where id=?'
        conn.query(sql,id,function(err,topic,fields){
            if(err){
                console.log(err)
            }
            else{
                res.send('a')
            }
        })
    })
    app.post('/:id/edit',function(req,res){
        var title=req.body.title
        var description=req.body.description
        var author=req.body.author
        var sql='update topic set title=?, description=?, author=? where id=?'
        var id =req.params.id
        conn.query(sql,[title,description,author,id],function(err,topic,fields){
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/'+id)
            }
        })
    })






