function ensureAuth(req,res,next){
    if(req.isAuthenticated())
        {return next()

        }
    else{
         return res.json({redirect:true})
    }
}
export default ensureAuth