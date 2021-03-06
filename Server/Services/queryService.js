function parsefilter(filter){
 let marray = filter.split(",").map(function(item) {
    return item.split("|").map(function(_item) {
        return _item.trim();
      });
  });
  let wh = {};
  marray.forEach(el => {
    console.log(el[1]);
      wh[el[0]] = eval(el[1]);
  });
  if(Object.keys(wh).length) return wh;
  return {};
}
function parseinclude(include){
    let marray = eval(include);
    marray.forEach(function (element,indx) {
        if(Array.isArray(element)){
            marray[indx] = { include: parseinclude(element)}
        }
    });
     if(marray.length) return marray;
     return null;
}
exports.setQuery = async (req, res, next) => {
    let query = req.query;
    try {
        let q = {where:{},include:[]};
        if(query.filter) q.where = parsefilter(query.filter);
        if(query.include) q.include = parseinclude(query.include);
        req.query = q;
        next();
    } catch (err) {
      res.status(500).send({
        message: `Error setting query`
      });
    }
  };
