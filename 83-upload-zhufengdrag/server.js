let koaStatic = require('koa-static');
let path = require('path');
let koaBody = require('koa-body');
let fs = require('fs');
let Koa = require('koa');
let app = new Koa();

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Accept');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});

app.use(koaBody({
    formidable: { uploadDir: path.resolve(__dirname, './uploads') },
    multipart: true
}));

app.use(koaStatic(
    path.resolve(__dirname, './uploads')
));

app.use(async (ctx, next) => {
    if (ctx.url === '/upload') {
        let file = ctx.request.files.file;
        console.log('---------', file)
        let filename = path.basename(file.path) + path.extname(file.name);
        fs.renameSync(file.path, path.join(path.dirname(file.path), filename));
        ctx.body = { url: "http://localhost:8080/" + filename };
    } else {
        await next();
    }
});

app.listen(8080, () => {
    console.log('服务器成功在8080端口上启动!');
});
