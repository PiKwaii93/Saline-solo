router.get("/test", (req, res) => {
  res.send({ express: 'Renvois le TEST' });
});


router.get("/database", testDatabase); 

 router.get("/database", (req, res) => {
  res.send({ express: 'Renvois la DATABASE' });
});

app.use('/foo', router)


router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});
