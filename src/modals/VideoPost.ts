import { RedditPostType } from './RedditPostType';
import AbstractPost from './AbstractPost';

export default class VideoPost extends AbstractPost {
    private videoUrl: string;
    public embedUrl: string;

    constructor(title: string, author: string, upvotes: number, link: string, id: string, videoUrl: string) {
        super(title, author, upvotes, link, id, RedditPostType.Video);
        this.videoUrl = videoUrl;
        this.embedUrl = this.getEmbedUrl();

        super.validate();
    }

    private getYoutubeUrl(url: string) {
        const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??(v=)?([^#&?]*).*/;
        const match = url.match(regExp);
        const videoId = (match && match[8].length == 11) ? match[8] : '';

        return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    }

    private getGfycatUrl(url: string) {
        const regExp1 = /gfycat.com\/(.+)$/
        let match = url.match(regExp1);
        let videoId = (match && match[1]) ? match[1] : '';

        if(!videoId) {
            const regExp2 = /gfycat.com\/ifr\/(.+)$/;
            match = url.match(regExp2);
            videoId = (match && match[1]) ? match[1] : '';
        }

        return videoId ? `https://gfycat.com/ifr/${videoId}?controls=0&autoplay=0` : '';
    }

    private getEmbedUrl() {
        const youtube = this.getYoutubeUrl(this.videoUrl);
        if (youtube) return youtube;

        const gfycat = this.getGfycatUrl(this.videoUrl);
        if(gfycat) return gfycat;
        return '';
    }

    validatePost(): boolean {
        return this.embedUrl && this.videoUrl ? true : false;
    }
}