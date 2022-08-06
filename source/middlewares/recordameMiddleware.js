const recordameMiddleware = (req, res, next) => {
   next();

   if (req.cookie.recordame != undefined && req.session.user == undefined) {
      
   }

   //en proceso