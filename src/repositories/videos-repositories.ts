import { videos } from "../constants/constVideos"
export const videoRepository = {
    findVideo (id: number) {
        let video = videos.find(p => p.id === id)
        return video
    },
    createVideo (title: string, author:string, availableResolutions: string) {
        let newVideo = {
            id : +(new Date()),	
            title : title,
            author : author,
            canBeDownloaded : false,
            minAgeRestriction : null,
            createdAt :	(new Date().toISOString()),
            publicationDate	: (new Date(new Date().setDate(new Date().getDate() + 1)).toISOString()),
            availableResolutions : availableResolutions
        }
        
    }
}   