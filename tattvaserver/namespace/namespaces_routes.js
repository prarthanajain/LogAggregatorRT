var namespace_router = require('express').Router();
var Namespace = require('./namespaces.js');

namespace_router.get('/', function(req, res){
  Namespace.find({},{name:1, dataSchema:1}, function(err, namespaceListData){
    if(err){
      console.log("Error occurred in getting namespaces ", err);
      return res.status(400).json({error:"Internal error occurred..!"});
    } else{
      return res.status(200).json(namespaceListData);
    }
  });
});

namespace_router.post('/:namespaceName', function (req, res) {
  var namespace1 = new Namespace(req.body);
  namespace1.save(function(err, savedNamespaceData){
    if(err){
      console.log("Error occurred in saving namesapce ", err);
      return res.status(500).json({error:"Internal error in completing the operation..!"});
    } else{
      return res.status(200).json(savedNamespaceData);
    }
  });
});

namespace_router.put('/:namespaceName',  function (req, res) {
  Namespace.update({_id:req.body._id}, req.body, {}, function(err, updatedNamespaceData){
    if(err){
      console.log("Error occurred in saving namesapce ", err);
      return res.status(500).json({error:"Internal error in completing the operation..!"});
    } else{
      return res.status(200).json(updatedNamespaceData);
    }
  });
});

namespace_router.get('/:namespaceName', function(req, res){

  Namespace.findOne({name:req.params.namespaceName}, function(err, namespaceData){
    if(err){
      // console.log("Error in getting namespace ", req.params.namespaceName, " error: ", err);
      //   return res.status(500).json({error:"Intentional error for testing erro scenario"});
      return res.status(500).json(err);
    } else{
      return res.status(200).json(namespaceData);
    }
  });
});

module.exports = namespace_router;
