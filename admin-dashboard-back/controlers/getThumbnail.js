const getThumbnailAndFileRouter = require('express').Router();
const { Dropbox } = require('dropbox');
const dbx = new Dropbox ({ accessToken: process.env.DROPBOX_ACCESS_TOKEN  })



getThumbnailAndFileRouter.get('/', async (req, res, next) => {
    
    const thumbnails = []
     const files =  await dbx.filesListFolder({
        path: '/ToBeConfirmed/6035aae20e19db0004f64ea3'
      }).then((res) =>{
        return res.result.entries
      })
      
     for(let i = 0; i<files.length; i++){
         const thumbnail = await  dbx.filesGetThumbnailBatch({
            entries: [{
              path: `/ToBeConfirmed/6035aae20e19db0004f64ea3/${files[i].name}`,
              // preferred size for a thumbnail
              size: 'w64h64'
            }]
          }).then((res)=>{
              thumbnails.push({fileName: files[i].name , thumbnail: res.result.entries[0].thumbnail})
          })
          const link  = await dbx.filesGetTemporaryLink({
            path:`/ToBeConfirmed/6035aae20e19db0004f64ea3/${files[i].name}`
          }).then((res)=>{
            thumbnails.push(res.result.link)
          })
     }
      res.json(thumbnails)
})



module.exports = getThumbnailAndFileRouter