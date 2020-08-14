
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


//메인 화면(main.jade로 rendering)
app.get('/',function(req,res){
    fs.readdir('data',function(err,files){
        if(err){
            console.log(err)
            res.status(500).send('Internal Server Error')
        }
        res.render('main', {topics:files})
    })
})
//메인화면에서 add클릭 시 입력 form(add_new.jade)로 rendering
app.get('/new',function(req,res){
    res.render('add_new')
})


//입력받은 title, 해당 title을 통해 읽은 파일들을 data에 담아 file목록이 담긴 topics와 함께
//main.jade에 전달한다
app.get('/:id',function(req,res){
    var id= req.params.id
    fs.readdir('data',function(err,files){
        if(err){
            console.log('error')
        }
    fs.readFile('data/'+id,'utf8',function(err,data){
        if(err){
            console.log(err)
        }
        res.render('main',{description:data,topics:files,title:id})
    })
})

})

//post형식으로 입력받은 데이터를 data폴더에 제목은 title,내용은 description으로 저장하고,
//성공시 main화면으로 돌아가는 버튼을 만들어준다
app.post('/',function(req,res){
    var title=req.body.title
    var description=req.body.description
    fs.writeFile('data/'+title,description,(err)=>{
        if(err) {
            console.log('error !!')
            res.status(500).send('server error')
        }
        res.send(`save success!!<br><br>
        <a href='/'><b>go to main<b></a>`)
    })
    
})






