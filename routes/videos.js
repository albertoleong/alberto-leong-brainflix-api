import express from 'express'
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

const router = express.Router()

const getVideos = () => {
    return JSON.parse(fs.readFileSync('./data/videos.json'))
}

const postVideo = (videoArray) => {
    fs.writeFileSync('./data/videos.json', JSON.stringify(videoArray))
}

router.route('/videos')
.get((req, res) => {
    const allVideos = getVideos()
    const simpleVideos = allVideos.map(obj => {
        return {
           title: obj.title,
           image: obj.image,
           channel: obj.channel,
           id: obj.id 
        }
    })
    res.status(200).json(simpleVideos)
})
.post((req, res) => {
    const {title, description} = req.body
    if(!title || !description) return res.status(400).json([{
        message:"Please include a title and description"
    }])
    const videos = getVideos()
    const id = uuidv4()
    const newVideo = {
        title,
        description,
        channel: "New User",
        image: "http://localhost:8080/image9.jpg",
        views: 0,
        likes: 0,
        duration: "5:32",
        timestamp: Date.now(),
        comments: [],
        id
    }
    videos.push(newVideo)
    postVideo(videos)
    res.status(200).json(videos)
})

router.get('/videos/:videoId', (req, res) => {
    const { videoId } = req.params;
    let videos = getVideos();
    const video = videos.find(video => video.id === videoId)
    if(!video) return res.status(404).json([{message: "no matches"}])
    res.status(200).json(video);
  })

export {router as videoRoutes}